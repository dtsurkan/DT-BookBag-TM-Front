import { isEmpty as _isEmpty } from 'lodash';
import { Col, Row, Skeleton } from 'antd';
import Title from 'antd/lib/typography/Title';
import DescriptionItem from 'components/Items/DescriptionItem';
import ProfileAvatar from 'components/Items/ProfileAvatar';
import PageHeaderLogo from 'components/Logo/PageHeaderLogo';

const AsideDescription = ({ book = {} }) => {
  return (
    <Col
      xs={24}
      md={6}
      style={{
        minHeight: '100vh',
        background: 'white',
        padding: '30px 16px 30px 0px',
      }}
    >
      <Row gutter={[0, 8]} style={{ height: '90vh' }}>
        <Col flex={0.2}>
          <PageHeaderLogo isBackIcon={true} style={{ padding: 0 }} />
        </Col>
        {_isEmpty(book) ? (
          <Skeleton avatar paragraph={{ rows: 10 }} />
        ) : (
          <>
            <Col flex={2}>
              <Title level={2} type="secondary">
                Продавец:
              </Title>
              <ProfileAvatar
                rowProps={{ flexDirection: 'row-reverse', flexWrap: 'nowrap' }}
                avatarProps={{ size: 64 }}
                isHasArrow={false}
                isHasCity={true}
                isChatSellerProfile={true}
                sellerProfile={book.seller}
              />
            </Col>
            <Col xs={24}>
              <Title level={2} type="secondary">
                Ваш товар:
              </Title>
              <Row justify="space-between">
                <DescriptionItem
                  title="Название:"
                  descriptionLevel={5}
                  description={book.book_name}
                  rowStyle={{ flexDirection: 'column', margin: '5px' }}
                />
                <DescriptionItem
                  title="Языки"
                  description={book.language}
                  descriptionLevel={5}
                  rowStyle={{ flexDirection: 'column', margin: '5px' }}
                />
              </Row>
              <DescriptionItem
                isEllipsis={true}
                title="Категория"
                descriptionLevel={5}
                description={book.categories.map(
                  (category, index) => `${(index ? ', ' : '') + category.name}`
                )}
                rowStyle={{ flexDirection: 'column', margin: '5px' }}
              />
              <DescriptionItem
                isEllipsis={true}
                title="Подкатегория"
                descriptionLevel={5}
                description={book.subcategories.map(
                  (subcategory, index) => `${(index ? ', ' : '') + subcategory.name}`
                )}
                rowStyle={{ flexDirection: 'column', margin: '5px' }}
              />
              <Row justify="space-between">
                <DescriptionItem
                  title="Языки"
                  descriptionLevel={5}
                  description={book.language}
                  rowStyle={{ flexDirection: 'column', margin: '5px' }}
                />
                <DescriptionItem
                  title="Состояние"
                  descriptionLevel={5}
                  description={book.condition}
                  rowStyle={{ flexDirection: 'column', margin: '5px' }}
                />
              </Row>
            </Col>
            <Col xs={24}>
              <Title level={2} style={{ marginBottom: 0 }}>{`Цена: ${book.price} грн`}</Title>
            </Col>
          </>
        )}
      </Row>
    </Col>
  );
};

export default AsideDescription;
