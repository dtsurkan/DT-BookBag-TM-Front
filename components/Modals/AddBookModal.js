import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { Col, Form, message, Modal, Row, Spin } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import PrimaryButton from "components/Buttons/PrimaryButton";
import PicturesWall from "components/DataEntry/Upload/PicturesWall";
import MainSpinner from "components/Loading/Spinners/MainSpinner";
import InformModal from "./InformModal";
import { getBookInputsList } from "utils/form-configs/add-books";
import { getSlugifyValue } from "utils/slugify";
import { uploadBook, uploadBookImages } from "lib/strapi/services/books";

const AddBookModal = ({
  title = "Добавить новую книгу",
  visible = true,
  onOk = () => {},
  onCancel = () => {},
  categories = [],
}) => {
  const [form] = Form.useForm();
  const { profile } = useSelector((state) => state.user);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [isSuccessfulAddedBook, setIsSuccessfulAddedBook] = useState(false);
  const onFinish = async (values) => {
    const { upload, ...otherValues } = values;
    try {
      setIsAddingBook(true);
      console.log("Success:", values);
      const response = await uploadBookImages(upload);
      console.log("response.data", response.data);
      const imageIDs = response.data.map((image) => image.id);
      console.log("imageIDs", imageIDs);
      const updateFinishValues = {
        ...otherValues,
        seller: profile?.user?.displayName,
        seller_id: profile?.user?.uid,
        photos: imageIDs,
        slug: getSlugifyValue(values.book_name),
      };
      console.log("updateFinishValues", updateFinishValues);
      const uploadedBook = await uploadBook(updateFinishValues);
      console.log("uploadedBook", uploadedBook);
      setIsAddingBook(false);
      setIsSuccessfulAddedBook(true);
    } catch (error) {
      console.log("error", error);
      // console.log("error.response", error.response.data.data.errors.slug[0]);
      message.error(error.response.data.data.errors.slug[0]);
      setIsAddingBook(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        width={1000}
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
          form={form}
          size="large"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col xs={24}>
              <Title level={2}>Загрузите фотографии книги</Title>
              <Paragraph type="secondary">
                До 10 фотографий не более 200Мб. PNG, JPEG
              </Paragraph>
            </Col>
            <Col xs={24}>
              <PicturesWall />
            </Col>
          </Row>
          <div className="">
            <Title level={2}>Общая информация о книге</Title>
            <Paragraph type="secondary">
              Все поля обязательны для заполнения
            </Paragraph>
          </div>
          <Row gutter={[16, 0]}>
            {getBookInputsList(categories).map(
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
                <MainSpinner spinning={isAddingBook}>
                  <PrimaryButton btnText="Опубликовать книгу" />
                </MainSpinner>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <InformModal
        onOk={() => {
          setIsSuccessfulAddedBook(false);
          form.resetFields();
          onCancel();
        }}
        visible={isSuccessfulAddedBook}
        title="Ваша книга успешно опубликована"
      />
      <div className={classNames("backdrop", { ["is-active"]: isAddingBook })}>
        <Spin size="large" />
      </div>
    </>
  );
};

export default AddBookModal;
