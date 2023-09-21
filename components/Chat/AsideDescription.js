import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty as _isEmpty } from 'lodash';
import { Col, message, Row, Skeleton, Switch } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import Title from 'antd/lib/typography/Title';
import DescriptionItem from 'components/Items/DescriptionItem';
import ProfileAvatar from 'components/Items/ProfileAvatar';
import PageHeaderLogo from 'components/Logo/PageHeaderLogo';
import { updateBookStatusToSold } from 'state/actions/user/profile';

const AsideDescription = ({ onlineStatus = false, book = {}, buyer = null }) => {
  const { profile } = useSelector((state) => state.user);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!_isEmpty(book)) {
      const status = book.book_status === 'sold' ? true : false;
      console.log(`status`, status);
      setIsChecked(status);
    }
  }, [book]);

  return (
    <Col
      xs={24}
      md={5}
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
                onlineStatus={onlineStatus}
                hasOnlineStatus={true}
              />
            </Col>
            <Col xs={24}>
              <Title level={2} type="secondary">
                Ваш товар:
              </Title>
              <Row justify="space-between">
                <DescriptionItem
                  isEllipsis={true}
                  title="Название:"
                  descriptionLevel={5}
                  description={book.book_name}
                  rowStyle={{ flexDirection: 'column', margin: '5px' }}
                  descriptionStyle={{ textTransform: 'uppercase' }}
                />
                <DescriptionItem
                  isEllipsis={true}
                  descriptionLevel={5}
                  description={book.author}
                  rowStyle={{ flexDirection: 'column', margin: '5px' }}
                  descriptionStyle={{ color: '#01504D', textTransform: 'capitalize' }}
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
            <Col xs={24}>
              <Title level={4}>
                {book.seller.id === profile.id
                  ? 'Ви є власником цієї книги. Тут ви можете змінити статус книги на продано.'
                  : 'Ви є потенційним покупцем цієї книги. Тут ви можете переглянути статус книги.'}
              </Title>
              <Switch
                checkedChildren="Продано"
                unCheckedChildren="Продається"
                onClick={(checked) => {
                  confirm({
                    centered: true,
                    title: checked
                      ? 'Ви дійсно хочете продати цю книгу?'
                      : 'Ви дійсно хочете відновити продаж на цю книгу?',
                    icon: <ExclamationCircleOutlined />,
                    okText: 'Да',
                    okType: 'primary',
                    //   because dropdown z-index === 1050
                    zIndex: 1100,
                    cancelText: 'Ні',
                    async onOk() {
                      await dispatch(updateBookStatusToSold(profile.id, book, checked, buyer.id));
                      setIsChecked(checked);
                    },
                    onCancel() {
                      message.info('Cancel');
                    },
                  });
                }}
                checked={isChecked}
                disabled={book.seller.id !== profile.id}
              />
              {/* {!_isEmpty(buyer) && <Title level={5}>{`Куплено: ${buyer.email}`}</Title>} */}
            </Col>
          </>
        )}
      </Row>
    </Col>
  );
};

export default AsideDescription;
