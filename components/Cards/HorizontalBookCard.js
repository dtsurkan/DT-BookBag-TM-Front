import { Card, Col, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { getStrapiMedia } from "lib/strapi/shared/media";
import { useRouter } from "next/router";

const HorizontalBookCard = ({ book = [] }) => {
  const router = useRouter();
  return (
    <Card
      hoverable
      //   className={classes.bookCard}
      onClick={() => router.push(`/books/${book.slug}`)}
    >
      <Row>
        <Col xs={24}>
          <img
            style={{ width: "100%", height: "200px" }}
            src={getStrapiMedia(book?.photos[0])}
            alt={book.photos[0].name}
          />
        </Col>
        <Col xs={24}>
          <Space direction="vertical" style={{ width: "100%"    }}>
            <Title level={4}>{book?.name}</Title>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Языки: </Text>
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
  );
};

export default HorizontalBookCard;
