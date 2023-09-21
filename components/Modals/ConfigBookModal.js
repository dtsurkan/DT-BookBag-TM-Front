import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  differenceWith as _differenceWith,
  isEqual as _isEqual,
  isEmpty as _isEmpty,
} from 'lodash';
import useSWR from 'swr';
import classNames from 'classnames';
import { Col, Form, message, Modal, Row, Spin } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import PicturesWall from 'components/DataEntry/Upload/PicturesWall';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';
import InformModal from './InformModal';
import { getSlugifyValue } from 'lib/slugify';
import { get } from 'lib/request';
import { STRAPI_URL } from 'lib/constants';
import { updateBook } from 'lib/strapi/services/books';
import { uploadImagesToStrapi, deleteImageFromStrapi } from 'lib/strapi/services/upload';
import { getBookInputsList } from 'utils/form-configs';
import { getCurrentUserProfile } from 'state/actions/user/profile';
import { uploadBookLogic } from 'state/actions/books';
import { checkErrorCode } from 'lib/strapi/shared/errors';

const ConfigBookModal = ({
  title = 'Добавить новую книгу',
  btnText = 'Опубликовать книгу',
  followingModalTitle = 'Ваша книга успешно опубликована',
  visible = true,
  isEditingFinish = false,
  onOk = () => {},
  onCancel = () => {},
  width = 1000,
  zIndex = 1020,
  initialValues = {},
  formName = 'basic',
  forceRender = true,
  footer = null,
  destroyOnClose = true,
  maskClosable = false,
  bookId,
}) => {
  const [form] = Form.useForm();
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isProcessingBook, setIsProcessingBook] = useState(false);
  const [isSuccessfulConfigBook, setIsSuccessfulConfigBook] = useState(false);
  const [isLoadingInitialValues, setIsLoadingInitialValues] = useState(true);
  const { data: categories, error: errorCategories } = useSWR([STRAPI_URL, '/categories'], get, {
    revalidateOnFocus: false,
  });
  const firstSnapshotValues = form.getFieldsValue();
  initialValues = _isEmpty(initialValues)
    ? {
        ...form.getFieldsValue(),
        seller_city: profile.user_city ? profile.user_city : undefined,
      }
    : initialValues;
  // It's necessary for resetting feature because by default all values are undefined
  useEffect(() => {
    form.setFieldsValue(initialValues);
    setTimeout(() => {
      setIsLoadingInitialValues(false);
    }, 1000);
  }, [form, initialValues]);

  const onFinish = async (values) => {
    const { upload, ...otherValues } = values;
    // console.log(`values`, values);
    console.log(`upload`, upload);
    console.log(`initialValues.upload`, initialValues.upload);
    console.log(`_isEqual(upload, initialValues)`, _isEqual(values, initialValues));
    if (isEditingFinish) {
      // Change this in state
      setIsProcessingBook(true);
      try {
        const newUploadFiles = upload.filter((uploadItem) => !!uploadItem.originFileObj);
        const existedUploadFiles = upload
          .filter((uploadItem) => !!uploadItem.provider)
          .map((image) => image.id);
        const differenceUploadFiles = _differenceWith(initialValues.upload, upload, _isEqual);
        console.log(`newUploadFiles`, newUploadFiles);
        console.log(`existedUploadFiles`, existedUploadFiles);
        console.log(`_differenceUploadFiles`, differenceUploadFiles);
        if (differenceUploadFiles.length) {
          differenceUploadFiles.forEach(async (file) => await deleteImageFromStrapi(file.id));
        }
        if (newUploadFiles.length) {
          const newImagesFromStrapi = await uploadImagesToStrapi(newUploadFiles).then(
            ({ data }) => data
          );
          console.log(`newImagesFromStrapi`, newImagesFromStrapi);
          const replacedImagesAccordingDraggable = upload.map(
            (uploadItem) =>
              newImagesFromStrapi.find((item) => item.name === uploadItem.uid) || uploadItem
          );
          console.log(`replacedImagesAccordingDraggable`, replacedImagesAccordingDraggable);
          const updateFinishValues = {
            ...otherValues,
            seller: profile?.id,
            photos: replacedImagesAccordingDraggable,
            slug: getSlugifyValue(values.book_name),
          };
          const updatedBook = await updateBook(bookId, updateFinishValues);
          console.log('updatedBook', updatedBook);
          setIsProcessingBook(false);
          setIsSuccessfulConfigBook(true);
        } else {
          console.log('22222222');
          const updateFinishValues = {
            ...otherValues,
            seller: profile?.id,
            photos: existedUploadFiles,
            slug: getSlugifyValue(values.book_name),
          };
          console.log(`updateFinishValues`, updateFinishValues);
          const updatedBook = await updateBook(bookId, updateFinishValues);
          console.log('updatedBook', updatedBook.data);
          setIsProcessingBook(false);
          setIsSuccessfulConfigBook(true);
        }
      } catch (error) {
        console.log(`error`, error);
      }
    } else {
      setIsProcessingBook(true);
      const response = await dispatch(uploadBookLogic(profile, values));
      console.log(`response`, response);
      if (response.status === 200) {
        setIsProcessingBook(false);
        setIsSuccessfulConfigBook(true);
      }
      if (checkErrorCode(response.status)) {
        message.error(response.data.data.errors.slug[0]);
        setIsProcessingBook(false);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Modal
        width={width}
        zIndex={zIndex}
        title={title}
        centered
        visible={visible}
        onOk={onOk}
        onCancel={() => {
          form.resetFields();
          onCancel();
        }}
        footer={footer}
        destroyOnClose={destroyOnClose}
        maskClosable={maskClosable}
        // Warning: Instance created by useForm is not connect to any Form element. Forget to pass form prop?
        // Before Modal opens, children elements do not exist in the view. You can set forceRender on Modal to pre-render its children.
        forceRender={forceRender}
      >
        <Spin spinning={categories && isLoadingInitialValues}>
          <Form
            initialValues={initialValues}
            form={form}
            size="large"
            name={formName}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row>
              <Col xs={24}>
                <Title level={2}>Загрузите фотографии книги</Title>
                <Paragraph type="secondary">До 10 фотографий не более 200Мб. PNG, JPEG</Paragraph>
              </Col>
              <Col xs={24}>
                <PicturesWall form={form} />
              </Col>
            </Row>
            <div className="">
              <Title level={2}>Общая информация о книге</Title>
              <Paragraph type="secondary">Все поля обязательны для заполнения</Paragraph>
            </div>
            <Row gutter={[16, 0]}>
              {getBookInputsList(profile, categories?.data?.length ? categories.data : []).map(
                ({ id, component: Component, ...props }) => (
                  <Fragment key={id}>
                    <Component {...props} form={form} />
                  </Fragment>
                )
              )}
            </Row>
            <Row>
              <Col xs={24}>
                <Form.Item shouldUpdate>
                  {({ getFieldsValue }) => {
                    const values = getFieldsValue();
                    return (
                      <Form.Item>
                        <Row justify="space-between">
                          <Col xs={24} lg={8}>
                            <PrimaryButton
                              type="default"
                              htmlType="button"
                              btnText="Сбросить"
                              disabled={_isEqual(values, firstSnapshotValues)}
                              onClick={() => form.resetFields()}
                            />
                          </Col>
                          <Col xs={24} lg={8}>
                            <MainSpinner spinning={isProcessingBook}>
                              <PrimaryButton
                                disabled={_isEqual(values, firstSnapshotValues)}
                                btnText={btnText}
                              />
                            </MainSpinner>
                          </Col>
                        </Row>
                      </Form.Item>
                    );
                  }}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
      <InformModal
        onOk={() => {
          form.resetFields();
          dispatch(getCurrentUserProfile(profile?.id));
          setIsSuccessfulConfigBook(false);
          onCancel();
        }}
        visible={isSuccessfulConfigBook}
        title={followingModalTitle}
      />
      <div className={classNames('backdrop', { ['is-active']: isProcessingBook })}>
        <Spin size="large" />
      </div>
    </>
  );
};

export default ConfigBookModal;
