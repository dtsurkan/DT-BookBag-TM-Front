import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { differenceWith as _differenceWith, isEqual as _isEqual } from "lodash";
import useSWR from "swr";
import classNames from "classnames";
import { Col, Form, message, Modal, Row, Spin } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import PrimaryButton from "components/Buttons/PrimaryButton";
import PicturesWall from "components/DataEntry/Upload/PicturesWall";
import MainSpinner from "components/Loading/Spinners/MainSpinner";
import InformModal from "./InformModal";
import { getSlugifyValue } from "lib/slugify";
import { get } from "lib/request";
import { STRAPI_URL } from "lib/constants";
import { updateBook, uploadBook } from "lib/strapi/services/books";
import {
  uploadImagesToStrapi,
  deleteImageFromStrapi,
} from "lib/strapi/services/upload";
import { getBookInputsList } from "utils/form-configs/add-books";

const ConfigBookModal = ({
  title = "Добавить новую книгу",
  btnText = "Опубликовать книгу",
  followingModalTitle = "Ваша книга успешно опубликована",
  visible = true,
  isEditingFinish = false,
  onOk = () => {},
  onCancel = () => {},
  width = 1000,
  zIndex = 1020,
  initialValues = {},
  bookId,
}) => {
  const [form] = Form.useForm();
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isProcessingBook, setIsProcessingBook] = useState(false);
  const [isDisabled, setIsDisabled] = useState(isEditingFinish ? true : false);
  const [isSuccessfulConfigBook, setIsSuccessfulConfigBook] = useState(false);
  const { data: categories, error: errorCategories } = useSWR(
    [STRAPI_URL, "/categories"],
    get,
    {
      revalidateOnFocus: false,
    }
  );
  const onFinish = async (values) => {
    const { upload, ...otherValues } = values;
    // console.log(`values`, values);
    console.log(`upload`, upload);
    console.log(`initialValues.upload`, initialValues.upload);
    console.log(
      `_isEqual(upload, initialValues)`,
      _isEqual(values, initialValues)
    );
    if (isEditingFinish) {
      setIsProcessingBook(true);
      try {
        const newUploadFiles = upload.filter(
          (uploadItem) => !!uploadItem.originFileObj
        );
        const existedUploadFiles = upload
          .filter((uploadItem) => !!uploadItem.provider)
          .map((image) => image.id);
        const differenceUploadFiles = _differenceWith(
          initialValues.upload,
          upload,
          _isEqual
        );
        console.log(`newUploadFiles`, newUploadFiles);
        console.log(`existedUploadFiles`, existedUploadFiles);
        console.log(`_differenceUploadFiles`, differenceUploadFiles);
        if (differenceUploadFiles.length) {
          console.log(`000000`);
          differenceUploadFiles.forEach(async (file) => {
            console.log(`file`, file);
            await deleteImageFromStrapi(file.id);
          });
          console.log(`000111111`);
        }
        if (newUploadFiles.length) {
          console.log("1111111111");
          const newImageIDs = await uploadImagesToStrapi(
            newUploadFiles
          ).then(({ data }) => data.map((image) => image.id));
          console.log(`newImageIDs`, newImageIDs);
          const updateFinishValues = {
            ...otherValues,
            seller: profile?.id,
            photos: [...existedUploadFiles, ...newImageIDs],
            slug: getSlugifyValue(values.book_name),
          };
          const updatedBook = await updateBook(bookId, updateFinishValues);
          console.log("updatedBook", updatedBook);
          setIsProcessingBook(false);
          setIsSuccessfulConfigBook(true);
        } else {
          console.log("22222222");
          const updateFinishValues = {
            ...otherValues,
            seller: profile?.id,
            photos: existedUploadFiles,
            slug: getSlugifyValue(values.book_name),
          };
          console.log(`updateFinishValues`, updateFinishValues);
          const updatedBook = await updateBook(bookId, updateFinishValues);
          console.log("updatedBook", updatedBook.data);
          setIsProcessingBook(false);
          setIsSuccessfulConfigBook(true);
        }
      } catch (error) {
        console.log(`error`, error);
      }
    } else {
      try {
        setIsProcessingBook(true);
        const newImageIDs = await uploadImagesToStrapi(
          upload
        ).then(({ data }) => data.map((image) => image.id));
        console.log(`newImageIDs`, newImageIDs);
        const updateFinishValues = {
          ...otherValues,
          seller: profile?.id,
          photos: newImageIDs,
          slug: getSlugifyValue(values.book_name),
        };
        const uploadedBook = await uploadBook(updateFinishValues);
        console.log("uploadedBook", uploadedBook);
        setIsProcessingBook(false);
        setIsSuccessfulConfigBook(true);
      } catch (error) {
        console.log("error", error);
        // console.log("error.response", error.response.data.data.errors.slug[0]);
        message.error(error.response.data.data.errors.slug[0]);
        setIsProcessingBook(false);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        footer={null}
        destroyOnClose={true}
        maskClosable={false}
      >
        <Form
          initialValues={initialValues}
          form={form}
          size="large"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={(changedValues, allValues) => {
            if (_isEqual(allValues, initialValues)) {
              setIsDisabled(true);
            } else {
              setIsDisabled(false);
            }
          }}
        >
          <Row>
            <Col xs={24}>
              <Title level={2}>Загрузите фотографии книги</Title>
              <Paragraph type="secondary">
                До 10 фотографий не более 200Мб. PNG, JPEG
              </Paragraph>
            </Col>
            <Col xs={24}>
              <PicturesWall form={form} />
            </Col>
          </Row>
          <div className="">
            <Title level={2}>Общая информация о книге</Title>
            <Paragraph type="secondary">
              Все поля обязательны для заполнения
            </Paragraph>
          </div>
          <Row gutter={[16, 0]}>
            {categories &&
              getBookInputsList(categories.data).map(
                ({ id, component: Component, ...props }) => (
                  <Fragment key={id}>
                    <Component {...props} form={form} />
                  </Fragment>
                )
              )}
          </Row>
          <Row justify="end">
            <Col xs={24} lg={8}>
              <Form.Item>
                <MainSpinner spinning={isProcessingBook}>
                  <PrimaryButton btnText={btnText} disabled={isDisabled} />
                </MainSpinner>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <InformModal
        onOk={() => {
          setIsSuccessfulConfigBook(false);
          form.resetFields();
          onCancel();
        }}
        visible={isSuccessfulConfigBook}
        title={followingModalTitle}
      />
      <div
        className={classNames("backdrop", { ["is-active"]: isProcessingBook })}
      >
        <Spin size="large" />
      </div>
    </>
  );
};

export default ConfigBookModal;
