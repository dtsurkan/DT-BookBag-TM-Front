import { List } from "antd";
import HorizontalBookCard from "components/Cards/HorizontalBookCard";

const BooksList = ({
  grid = {
    gutter: 16,
    column: 4,
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 3,
  },
  itemLayout = "horizontal",
  dataSource = [],
  pagination = {
    onChange: (page) => {
      console.log(page);
    },
    pageSize: 10,
    hideOnSinglePage: true,
    // simple: true,
    // responsive: true,
  },
}) => {
  return (
    <List
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      grid={grid}
      itemLayout={itemLayout}
      dataSource={dataSource}
      pagination={pagination}
      renderItem={(book) => (
        <List.Item key={book.slug}>
          <HorizontalBookCard book={book} />
        </List.Item>
      )}
    />
  );
};

export default BooksList;
