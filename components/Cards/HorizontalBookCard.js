import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useShowConfigModal } from 'hooks';
import { Button, Card, Col, Row, Space, Tooltip } from 'antd';
import { CloseOutlined, LikeOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import BookSettingsDropdown from 'components/Dropdowns/BookSettingsDropdown';
import InformModal from 'components/Modals/InformModal';
import ConfigBookModal from 'components/Modals/ConfigBookModal';
import { DoubleCheckIcon } from 'components/Icons';
import {
  deleteBookFromLikedBooks,
  getCurrentUserProfile,
  toggleBookToLikedBooks,
} from 'state/actions/user/profile';
import { getStrapiMedia } from 'lib/strapi/shared/media';
import classes from 'styles/scss/components/buttons.module.scss';

const HorizontalBookCard = ({ book = {}, renderKey = '' }) => {
  const router = useRouter();
  const [
    isConfigBookModal,
    showConfigBookModal,
    handleCancelConfigBookModal,
  ] = useShowConfigModal();
  const [isSuccessfulConfigBook, setIsSuccessfulConfigBook] = useState(false);
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(
    book.liked_by_users.some((user) => user.id === profile.id)
  );

  const getProperlyBookRender = (renderKey) => {
    switch (renderKey) {
      case 'additional-settings':
        return (
          <BookSettingsDropdown
            showConfigBookModal={showConfigBookModal}
            showInformModal={() => setIsSuccessfulConfigBook(true)}
            book={book}
          />
        );
      case 'sold':
        return null;
      case 'liked':
        return (
          <div
            className={classes.likedBooksCardHover}
            onClick={async (event) => {
              event.stopPropagation();
              await dispatch(deleteBookFromLikedBooks(profile.id, book));
            }}
            onKeyDown={async (event) => {
              event.stopPropagation();
              await dispatch(deleteBookFromLikedBooks(profile.id, book));
            }}
            role="button"
            tabIndex="0"
          >
            <Space direction="vertical" align="center" style={{ color: 'white' }}>
              <CloseOutlined />
              <Text style={{ color: 'white', fontWeight: 700 }}>Удалить</Text>
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
              onClick={async (e) => {
                setIsChecked(!isChecked);
                await dispatch(toggleBookToLikedBooks(e.target.checked, profile.id, book));
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
              src={getStrapiMedia(book?.photos[0].url)}
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
                  rows: 2,
                  tooltip: <Tooltip>{book?.book_name}</Tooltip>,
                }}
                level={4}
              >
                {book?.book_name}
              </Title>
              {renderKey === 'sold' ? (
                <Space>
                  <DoubleCheckIcon />
                  <Text style={{ color: '#6bbe9f' }}>Успешно продано</Text>
                </Space>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>Язык: </Text>
                    <Text>{book?.language}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>Автор: </Text>
                    <Text>{book?.author}</Text>
                  </div>
                </>
              )}
              <Title level={3}>{`${book?.price} грн`}</Title>
            </Space>
          </Col>
        </Row>
      </Card>
      {isConfigBookModal && (
        <ConfigBookModal
          formName={book.slug}
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
      )}
      {isSuccessfulConfigBook && (
        <InformModal
          onOk={() => {
            dispatch(getCurrentUserProfile(profile?.id));
            setIsSuccessfulConfigBook(false);
          }}
          visible={isSuccessfulConfigBook}
          title="Ваша книга успешно удалена"
        />
      )}
    </>
  );
};

export default HorizontalBookCard;
