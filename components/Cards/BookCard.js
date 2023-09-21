import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Space, Tooltip } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import { DoubleCheckIcon } from 'components/Icons';
import { getStrapiMedia } from 'lib/strapi/shared/media';
import { getCapitalizedString } from 'utils/lodash/string';
import classes from 'styles/scss/components/cards.module.scss';

const BookCard = ({ book = {}, gutter = [8, 0] }) => {
  const router = useRouter();
  const { profile } = useSelector((state) => state.user);
  const { t } = useTranslation();
  return (
    <Card hoverable className={classes.bookCard} onClick={() => router.push(`/books/${book.slug}`)}>
      <Row gutter={gutter} className={classes.row}>
        <Col>
          <img src={getStrapiMedia(book?.photos[0]?.url)} alt={book.photos[0]?.name} />
        </Col>
        <Col>
          <Space direction="vertical">
            <Title level={5} style={{ textTransform: 'uppercase' }}>
              {book?.book_name}
            </Title>
            {book.book_status === 'sold' && book.seller.id !== profile.id ? (
              <Space>
                <DoubleCheckIcon />
                <Text style={{ color: '#6bbe9f' }}>{t('components:book.success-bought')}</Text>
              </Space>
            ) : book.book_status === 'sold' ? (
              <Space>
                <DoubleCheckIcon />
                <Text style={{ color: '#6bbe9f' }}>{t('components:book.success-sold')}</Text>
              </Space>
            ) : (
              <>
                <Text type="secondary">
                  {t('components:cards.description.language')}{' '}
                  {t(`components:lists.language.${book.language}`)}
                </Text>
                <Text
                  type="secondary"
                  ellipsis={{ tooltip: <Tooltip>{getCapitalizedString(book?.author)}</Tooltip> }}
                  style={{ textTransform: 'capitalize' }}
                >
                  {t('components:cards.description.author-with-name', { author: book.author })}
                </Text>
              </>
            )}
            <Title level={3}>
              {t('components:cards.description.price', { price: book.price })}
            </Title>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default BookCard;
