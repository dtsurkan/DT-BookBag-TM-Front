import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import { useShowConfigModal } from 'hooks';
import { Button, Card, Col, message, Row, Space, Tooltip } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  LikeOutlined,
} from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import BookSettingsDropdown from 'components/Dropdowns/BookSettingsDropdown';
import InformModal from 'components/Modals/InformModal';
import ConfigBookModal from 'components/Modals/ConfigBookModal';
import { DoubleCheckIcon } from 'components/Icons';
import CheckUserModal from 'components/Modals/CheckUserModal';
import {
  deleteBookFromLikedBooks,
  getCurrentUserProfile,
  toggleBookToLikedBooks,
  updateBookStatus,
  updateBookStatusToSold,
} from 'state/actions/user/profile';
import { getStrapiMedia } from 'lib/strapi/shared/media';
import { getCapitalizedString } from 'utils/lodash/string';
import classes from 'styles/scss/components/buttons.module.scss';

const HorizontalBookCard = ({ book = {}, renderKey = '', client }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    isConfigBookModal,
    showConfigBookModal,
    handleCancelConfigBookModal,
  } = useShowConfigModal();
  const {
    isConfigBookModal: isCheckingUserModal,
    showConfigBookModal: showCheckingUserModal,
    handleCancelConfigBookModal: handleCancelCheckingUserModal,
  } = useShowConfigModal();
  const [isSuccessfulConfigBook, setIsSuccessfulConfigBook] = useState(false);
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(
    book.liked_by_users.some((user) => user.id === profile.id)
  );
  // NOTE! Processing key helps better render case when book doesn't sell but in progress
  const isProcessingBook = book.book_status === 'processing' && book?.seller.id !== profile.id;
  if (isProcessingBook) {
    renderKey = 'processing';
  }
  const getProperlyBookRender = (renderKey) => {
    switch (renderKey) {
      case 'additional-settings':
        return (
          <BookSettingsDropdown
            client={client}
            showConfigBookModal={showConfigBookModal}
            showInformModal={() => setIsSuccessfulConfigBook(true)}
            book={book}
            showCheckingUserModal={showCheckingUserModal}
          />
        );
      case 'bought':
        break;

      case 'processing':
        return (
          <div className={classes.likedBooksCardHover}>
            <Space align="center" style={{ color: 'white' }}>
              <Tooltip title={t('components:book.reject-purchase')}>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    message.error('No');
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
                        message.success('Ok');
                      },
                      onCancel() {
                        message.info('Cancel');
                      },
                    });
                  }}
                  type="primary"
                  shape="circle"
                  icon={<CloseOutlined />}
                />
              </Tooltip>
              <Tooltip title={t('components:book.confirm-purchase')}>
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
                      },
                      onCancel() {
                        message.info('Cancel');
                      },
                    });
                  }}
                  type="primary"
                  shape="circle"
                  icon={<CheckOutlined />}
                />
              </Tooltip>
            </Space>
          </div>
        );
      case 'sold':
        if (book.book_status === 'processing') {
          return (
            <div
              className={classes.likedBooksCardHover}
              onClick={async (event) => {
                event.stopPropagation();
                await dispatch(updateBookStatus(t, profile.id, book, false));
              }}
              onKeyDown={async (event) => {
                event.stopPropagation();
                await dispatch(updateBookStatus(t, profile.id, book, false));
              }}
              role="button"
              tabIndex="0"
            >
              <Space direction="vertical" align="center" style={{ color: 'white' }}>
                <CloseOutlined />
                <Text style={{ color: 'white', fontWeight: 700 }}>
                  {t('components:buttons.return-to-selling')}
                </Text>
              </Space>
            </div>
          );
        } else {
          return;
        }
      case 'liked':
        return (
          <div
            className={classes.likedBooksCardHover}
            onClick={async (event) => {
              event.stopPropagation();
              await dispatch(deleteBookFromLikedBooks(profile.id, book, t));
            }}
            onKeyDown={async (event) => {
              event.stopPropagation();
              await dispatch(deleteBookFromLikedBooks(profile.id, book, t));
            }}
            role="button"
            tabIndex="0"
          >
            <Space direction="vertical" align="center" style={{ color: 'white' }}>
              <CloseOutlined />
              <Text style={{ color: 'white', fontWeight: 700 }}>
                {t('components:buttons.delete')}
              </Text>
            </Space>
          </div>
        );
      default:
        return (
          <div
            role="button"
            tabIndex="0"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
            className={classes.dropdownBtn}
          >
            <Button
              type={isChecked ? 'primary' : 'default'}
              shape="circle"
              icon={<LikeOutlined />}
              onClick={async () => {
                setIsChecked(!isChecked);
                const response = await dispatch(
                  toggleBookToLikedBooks(!isChecked, profile.id, book)
                );
                if (response.status === 200) {
                  message.success(
                    t(
                      !isChecked
                        ? 'components:auth.success-add-to-liked-books-title'
                        : 'components:auth.success-remove-from-liked-books-title'
                    )
                  );
                }
              }}
            />
          </div>
        );
    }
  };
  return (
    <>
      <Card
        className={classes.card}
        hoverable
        bodyStyle={{ padding: '10px' }}
        cover={
          <div style={{ position: 'relative' }}>
            {getProperlyBookRender(renderKey)}
            <img
              style={{ width: '100%', height: '200px' }}
              src={getStrapiMedia(book?.photos[0]?.url)}
              alt={book.photos[0]?.name}
            />
          </div>
        }
        onClick={() => router.push(`/books/${book?.slug}`)}
      >
        <Row>
          <Col xs={24}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title
                ellipsis={{
                  rows: 1,
                  tooltip: <Tooltip>{book?.book_name.toUpperCase()}</Tooltip>,
                }}
                style={{ textTransform: 'uppercase', fontWeight: 700 }}
                level={5}
              >
                {book?.book_name}
              </Title>
              {renderKey === 'bought' ? (
                <Space>
                  <DoubleCheckIcon />
                  <Text style={{ color: '#6bbe9f' }}>{t('components:book.success-bought')}</Text>
                </Space>
              ) : renderKey === 'sold' && book.book_status === 'sold' ? (
                <Space>
                  <DoubleCheckIcon />
                  <Text style={{ color: '#6bbe9f' }}>{t('components:book.success-sold')}</Text>
                </Space>
              ) : renderKey === 'sold' && book.book_status === 'processing' ? (
                <Space>
                  <InfoCircleOutlined style={{ color: '#F37800' }} />
                  <Text style={{ color: '#F37800' }}>
                    {t('components:book.waiting-for-buy-sell')}
                  </Text>
                </Space>
              ) : renderKey === 'processing' && book?.seller.id !== profile.id ? (
                <Space>
                  <InfoCircleOutlined style={{ color: '#F37800' }} />
                  <Text style={{ color: '#F37800' }}>
                    {t('components:book.accept-reject-purchase')}
                  </Text>
                </Space>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>{t('components:cards.description.language')} </Text>
                    <Text>{t(`components:lists.language.${book.language}`)}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>{t('components:cards.description.author')}</Text>
                    <Text
                      ellipsis={{
                        tooltip: <Tooltip>{getCapitalizedString(book?.author)}</Tooltip>,
                      }}
                      style={{ textTransform: 'capitalize', textAlign: 'end', marginLeft: '5px' }}
                    >
                      {book?.author}
                    </Text>
                  </div>
                </>
              )}
              <Title level={3}>
                {t('components:cards.description.price', { price: book.price })}
              </Title>
            </Space>
          </Col>
        </Row>
      </Card>
      {isConfigBookModal && (
        <ConfigBookModal
          formName={book.slug}
          initialValues={{
            book_name: book.book_name.toUpperCase(),
            author: getCapitalizedString(book.author),
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
          title="components:others.edit-book-title"
          btnText="components:buttons.save-changes"
          isEditingFinish={true}
          bookId={book.id}
          followingModalTitle="components:others.success-edit-book-title"
        />
      )}
      {isSuccessfulConfigBook && (
        <InformModal
          onOk={() => {
            dispatch(getCurrentUserProfile(profile?.id));
            setIsSuccessfulConfigBook(false);
          }}
          visible={isSuccessfulConfigBook}
          title="components:others.success-delete-book-title"
        />
      )}
      {isCheckingUserModal && (
        <CheckUserModal
          visible={isCheckingUserModal}
          onCancel={handleCancelCheckingUserModal}
          width={500}
          book={book}
        />
      )}
    </>
  );
};

export default HorizontalBookCard;
