import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty as _isEmpty } from 'lodash';
import { Button, Col, message, Row, Skeleton, Space, Switch } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import Title from 'antd/lib/typography/Title';
import DescriptionItem from 'components/Items/DescriptionItem';
import ProfileAvatar from 'components/Items/ProfileAvatar';
import PageHeaderLogo from 'components/Logo/PageHeaderLogo';
import { updateBookStatus, updateBookStatusToSold } from 'state/actions/user/profile';

const AsideDescription = ({ onlineStatus = false, book = {}, buyer = null }) => {
  const router = useRouter();
  const { t } = useTranslation();
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
                {t('components:others.seller')}
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
                {t('components:others.good-item')}
              </Title>
              <Row justify="space-between">
                <DescriptionItem
                  isEllipsis={true}
                  title="components:cards.description.name"
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
                title="components:cards.description.categories"
                descriptionLevel={5}
                description={book.categories.map(
                  (category, index) =>
                    `${(index ? ', ' : '') + t(`components:categories.${category.slug}`)}`
                )}
                rowStyle={{ flexDirection: 'column', margin: '5px' }}
              />
              <DescriptionItem
                isEllipsis={true}
                title="components:cards.description.subcategories"
                descriptionLevel={5}
                description={book.subcategories.map(
                  (subcategory, index) =>
                    `${(index ? ', ' : '') + t(`components:categories.${subcategory.slug}`)}`
                )}
                rowStyle={{ flexDirection: 'column', margin: '5px' }}
              />
              <Row justify="space-between">
                <DescriptionItem
                  title="components:cards.description.language"
                  descriptionLevel={5}
                  description={t(`components:lists.language.${book.language}`)}
                  rowStyle={{ flexDirection: 'column', margin: '5px' }}
                />
                <DescriptionItem
                  title="components:cards.description.condition"
                  descriptionLevel={5}
                  description={t(`components:lists.condition.${book.condition}`)}
                  rowStyle={{ flexDirection: 'column', margin: '5px' }}
                />
              </Row>
            </Col>
            <Col xs={24}>
              <Title level={2} style={{ marginBottom: 0 }}>
                {t('components:cards.description.price', { price: book.price })}
              </Title>
            </Col>
            <Col xs={24}>
              <Title level={5}>
                {book.seller.id === profile.id
                  ? t('components:book.owner-book')
                  : t('components:book.buyer-book')}
                <Switch
                  checkedChildren={
                    book.book_status === 'sold'
                      ? t('components:book.sold')
                      : t('components:book.in-progress')
                  }
                  unCheckedChildren={t('components:book.selling')}
                  onClick={(checked) => {
                    confirm({
                      centered: true,
                      title: checked
                        ? t('components:confirm.confirm-sold-book')
                        : t('components:confirm.confirm-restore-solding-book'),
                      icon: <ExclamationCircleOutlined />,
                      okText: t('components:general.yes'),
                      okType: 'primary',
                      //   because dropdown z-index === 1050
                      zIndex: 1100,
                      cancelText: t('components:general.no'),
                      async onOk() {
                        await dispatch(updateBookStatus(t, profile.id, book, checked, buyer.id));
                        setIsChecked(checked);
                      },
                      onCancel() {
                        message.info('Cancel');
                      },
                    });
                  }}
                  checked={isChecked}
                  disabled={book.seller.id !== profile.id || book.book_status === 'sold'}
                />
              </Title>
            </Col>
            {book.seller.id !== profile.id && book.book_status === 'processing' && (
              <Col xs={24}>
                <Space align="center" style={{ color: 'white' }}>
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      confirm({
                        centered: true,
                        title: t('components:confirm.confirm-reject-buying-book'),
                        icon: <ExclamationCircleOutlined />,
                        okText: t('components:general.yes'),
                        okType: 'primary',
                        //   because dropdown z-index === 1050
                        zIndex: 1100,
                        cancelText: t('components:general.no'),
                        async onOk() {
                          await dispatch(updateBookStatus(t, profile.id, book, false));
                          router.reload();
                        },
                        onCancel() {
                          message.info('Cancel');
                        },
                      });
                    }}
                    type="dashed"
                  >
                    {t('components:buttons.reject')}
                  </Button>

                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      message.success('Yes');
                      confirm({
                        centered: true,
                        title: t('components:confirm.confirm-buying-book'),
                        icon: <ExclamationCircleOutlined />,
                        okText: t('components:general.yes'),
                        okType: 'primary',
                        //   because dropdown z-index === 1050
                        zIndex: 1100,
                        cancelText: t('components:general.no'),
                        async onOk() {
                          await dispatch(updateBookStatusToSold(t, profile.id, book));
                          message.success('Ok');
                          router.reload();
                        },
                        onCancel() {
                          message.info('Cancel');
                        },
                      });
                    }}
                    type="primary"
                  >
                    {t('components:buttons.confirm')}
                  </Button>
                </Space>
              </Col>
            )}
          </>
        )}
      </Row>
    </Col>
  );
};

export default AsideDescription;
