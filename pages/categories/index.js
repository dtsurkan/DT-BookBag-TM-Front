import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import useTranslation from 'next-translate/useTranslation';
import { Card, Col, List, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import AppLayout from 'components/Layout/AppLayout';
import MainContent from 'components/Layout/MainContent';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import { getCategories } from 'lib/strapi/services/categories';

const useStyles = createUseStyles((theme) => ({
  subcategoryList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: 6,
  },
  subcategoryListItem: {
    margin: '0 16px',
  },
  subcategoryListItemBtn: {
    whiteSpace: 'break-spaces',
    textAlign: 'start',
    padding: 0,
    height: 'fit-content',
  },
  categoryListItemBtn: {
    color: '#05161d',
    fontSize: '25px',
    minHeight: '60px',
    whiteSpace: 'break-spaces',
    textAlign: 'start',
  },
  [theme.breakpoints.down(theme.breakpoints.xxl)]: {
    subcategoryList: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  [theme.breakpoints.down(theme.breakpoints.lg)]: {
    subcategoryList: {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
}));

const Categories = ({ categories = [] }) => {
  const classes = useStyles();
  console.log(`categories`, categories);
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <AppLayout globalDivStyles={{ background: '#F9FEFD' }}>
      <MainContent>
        <Row gutter={[16, 16]} style={{ padding: '16px 0' }}>
          <Col xs={24} data-aos="fade-right">
            <Title level={1}>{t('components:others.categories-title')}</Title>
          </Col>
          {categories?.map((category) => (
            <Col key={category.id} xs={24} data-aos="zoom-in">
              <Card bodyStyle={{ padding: 0 }} bordered={false} style={{ borderRadius: '10px' }}>
                <PrimaryButton
                  isBlock={false}
                  size="middle"
                  type="link"
                  extraClassNames={classes.categoryListItemBtn}
                  btnText={`components:categories.${category.slug}`}
                  onClick={() => router.push(`categories/${category.slug}`)}
                />
                <ul className={classes.subcategoryList}>
                  {category?.subcategories?.map((subcategory) => (
                    <List.Item className={classes.subcategoryListItem} key={subcategory.id}>
                      <PrimaryButton
                        isBlock={false}
                        size="middle"
                        type="link"
                        extraClassNames={classes.subcategoryListItemBtn}
                        btnText={`components:categories.${subcategory.slug}`}
                        onClick={() =>
                          router.push(`categories/${category.slug}/${subcategory.slug}`)
                        }
                      />
                    </List.Item>
                  ))}
                </ul>
              </Card>
            </Col>
          ))}
        </Row>
      </MainContent>
    </AppLayout>
  );
};

export const getStaticProps = async () => {
  const categories = await getCategories();
  console.log(`categories`, categories);
  if (!categories)
    return {
      props: {
        categories: [],
      },
    };
  // console.log("categories.data", categories.data);
  return { props: { categories: categories.data }, revalidate: 60 * 60 * 24 };
};

export default Categories;
