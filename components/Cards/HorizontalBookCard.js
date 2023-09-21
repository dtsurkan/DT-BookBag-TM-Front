import { useState } from "react";
import { useRouter } from "next/router";
import { useShowConfigModal } from "hooks";
import { Card, Checkbox, Col, Row, Space, Tooltip } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import BookSettingsDropdown from "components/Dropdowns/BookSettingsDropdown";
import InformModal from "components/Modals/InformModal";
import ConfigBookModal from "components/Modals/ConfigBookModal";
import { getStrapiMedia } from "lib/strapi/shared/media";
import classes from "styles/scss/components/buttons.module.scss";

const HorizontalBookCard = ({
  book = {},
  hasBookAdditionalSettings = false,
}) => {
  const router = useRouter();
  const [
    isConfigBookModal,
    showConfigBookModal,
    handleCancelConfigBookModal,
  ] = useShowConfigModal();
  const [isSuccessfulConfigBook, setIsSuccessfulConfigBook] = useState(false);
  return (
    <>
      <Card
        className={classes.card}
        hoverable
        bodyStyle={{ padding: "10px" }}
        cover={
          <div style={{ position: "relative" }}>
            {hasBookAdditionalSettings ? (
              <BookSettingsDropdown
                showConfigBookModal={showConfigBookModal}
                showInformModal={() => setIsSuccessfulConfigBook(true)}
                book={book}
              />
            ) : (
              <div
                onClick={(event) => event.stopPropagation()}
                className={classes.dropdownBtn}
              >
                <Checkbox
                  onChange={(e) =>
                    console.log(`e.target.checked`, e.target.checked)
                  }
                />
              </div>
            )}
            <img
              style={{ width: "100%", height: "200px" }}
              src={getStrapiMedia(book?.photos[0].url)}
              alt={book.photos[0]?.name}
            />
          </div>
        }
        onClick={() => router.push(`/books/${book?.slug}`)}
      >
        <Row>
          <Col xs={24}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Title
                ellipsis={{
                  rows: 2,
                  tooltip: <Tooltip>{book?.book_name}</Tooltip>,
                }}
                level={4}
              >
                {book?.book_name}
              </Title>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Язык: </Text>
                <Text>{book?.language}</Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text>Автор: </Text>
                <Text>{book?.author}</Text>
              </div>
              <Title level={3}>{`${book?.price} грн`}</Title>
            </Space>
          </Col>
        </Row>
      </Card>
      <ConfigBookModal
        initialValues={{
          book_name: book.book_name,
          author: book.author,
          language: book.language,
          condition: book.condition,
          price: book.price,
          seller_comment: book.seller_comment,
          seller_city: book.seller_city,
          categories: book.categories[0].id,
          subcategories: book.subcategories.map((item) => item.id),
          upload: book.photos,
        }}
        visible={isConfigBookModal}
        onCancel={handleCancelConfigBookModal}
        title="Изменить книгу"
        btnText="Применить изменения"
        isEditingFinish={true}
        bookId={book.id}
        followingModalTitle="Ваша книга успешно изменена"
      />
      <InformModal
        onOk={() => {
          setIsSuccessfulConfigBook(false);
        }}
        visible={isSuccessfulConfigBook}
        title="Ваша книга успешно удалена"
      />
    </>
  );
};

export default HorizontalBookCard;
