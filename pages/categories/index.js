import { useRouter } from 'next/router';
import { Button, Card, Col, List, Row } from 'antd';
import ContentComponent from 'components/AppLayout/ContentComponent';
import Title from 'antd/lib/typography/Title';
import AppLayout from 'components/AppLayout/AppLayout';
import { getCategories } from 'lib/strapi/services/categories';
import classes from 'styles/scss/pages/categories.module.scss';
const Categories = ({ categories = [] }) => {
  console.log('categories', categories);
  const router = useRouter();
  return (
    <AppLayout globalDivStyles={{ background: '#F9FEFD' }}>
      <ContentComponent>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Title level={1}>Категории книг</Title>
          </Col>
          {categories.map((category) => (
            <Col key={category.id} xs={24}>
              <Card bodyStyle={{ padding: 8 }} bordered={false} style={{ borderRadius: '10px' }}>
                <Button
                  onClick={() => router.push(`categories/${category.slug}`)}
                  type="text"
                  style={{ fontSize: '25px', height: '60px' }}
                >
                  {category.name}
                </Button>
                <ul className={classes.categoryList}>
                  {category.subcategories.map((subcategory) => (
                    <List.Item
                      style={{
                        // padding: "10px 0",
                        margin: '0 16px',
                      }}
                      key={subcategory.id}
                    >
                      {/* <Text
                          ellipsis={{
                            tooltip: (
                              <Tooltip placement="bottom">
                                {subcategory.name}
                              </Tooltip>
                            ),
                          }}
                        > */}
                      <Button
                        // block
                        type="link"
                        onClick={() =>
                          router.push(`categories/${category.slug}/${subcategory.slug}`)
                        }
                      >
                        {subcategory.name}
                      </Button>
                      {/* </Text> */}
                    </List.Item>
                  ))}
                </ul>
              </Card>
            </Col>
          ))}
        </Row>
      </ContentComponent>
    </AppLayout>
  );
};

export const getStaticProps = async () => {
  const categories = await getCategories();
  if (!categories)
    return {
      props: {
        categories: [],
      },
    };
  // console.log("categories.data", categories.data);
  return { props: { categories: categories.data }, revalidate: 1 };
};

export default Categories;
