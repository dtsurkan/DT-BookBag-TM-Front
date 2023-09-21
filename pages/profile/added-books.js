import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Col, Row, Select, Skeleton } from "antd";
import ProfileAsideMenu from "components/Navigation/ProfileAsideMenu";
import { Header } from "antd/lib/layout/layout";
import DebounceSelectSearch from "components/DataEntry/DebounceSelectSearch";
import MainAutoComplete from "components/DataEntry/MainAutoComplete";
import BooksList from "components/Lists/BooksList";
import Title from "antd/lib/typography/Title";
import AppLayout from "components/AppLayout/AppLayout";
import { useMediaQuery } from "react-responsive";
import MenuItems from "components/Navigation/components/MenuItems";
import { getBooksByAuthorOrBookName } from "lib/strapi/services/books";

const AddedBooks = () => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1200 });
  const { profile, addedBooks, isLoadingAddedBooks } = useSelector(
    (state) => state.user
  );
  const router = useRouter();
  console.log(`router`, router);
  console.log(`addedBooks`, addedBooks);
  const onSearchBooks = async (value) => {
    console.log("value", value);
    try {
      if (!value) {
        return [];
      }
      const response = await getBooksByAuthorOrBookName(value);
      return response.data.map((book) => {
        const { book_name, ...other } = book;
        return { value: book_name, ...other };
      });
    } catch (error) {
      console.log(`error`, error);
    }
  };
  const onSelectBook = (value, instance) => {
    router.push(`/books/${instance.slug}`);
  };

  if (!profile) {
    router.push("/login");
    return null;
  }
  return (
    <AppLayout isHasNavigation={false} isHasFooter={false}>
      <Row justify="center">
        <ProfileAsideMenu />
        <Col
          xs={24}
          md={18}
          style={{
            minHeight: "100vh",
            background: "#F9FEFD",
            padding: "30px",
          }}
        >
          {isTabletOrMobile ? null : (
            <Header
              style={{
                padding: "0px 0px",
                background: "none",
                position: "relative",
                width: "100%",
              }}
            >
              <Row gutter={[8, 0]} align="middle">
                <Col>
                  <DebounceSelectSearch
                    fetchOptions={onSearchBooks}
                    onSelect={onSelectBook}
                    dataEntryComponent={MainAutoComplete}
                  />
                </Col>
                <Col flex={2}>
                  <Row justify="space-between">
                    <Col>
                      <MenuItems mode="horizontal" />
                    </Col>
                    <Col>
                      <Select bordered={false} defaultValue="ukr">
                        <Select.Option value="ukr">Ukr</Select.Option>
                        <Select.Option value="rus">Rus</Select.Option>
                      </Select>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Header>
          )}
          <Row style={{ marginTop: "25px" }}>
            <Col xs={24}>
              <Title level={2} type="secondary">
                {`Мои книги (${addedBooks ? addedBooks.length : 0})`}
              </Title>
            </Col>
            <Col xs={24}>
              {isLoadingAddedBooks ? (
                <Skeleton active avatar paragraph={{ rows: 16 }} />
              ) : (
                <BooksList
                  hasAddingBook={true}
                  hasBookAdditionalSettings={true}
                  dataSource={addedBooks ? addedBooks : []}
                  pagination={{ pageSize: 8 }}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default AddedBooks;
