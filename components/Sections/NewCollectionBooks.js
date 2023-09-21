import { Space } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import Link from 'antd/lib/typography/Link';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import CustomEmptyComponent from 'components/Empty/CustomEmptyComponent';
import BookCard from 'components/Cards/BookCard';
import BooksSlider from 'components/Sliders/Slick/BooksSlider';
import classes from 'styles/scss/pages/home.module.scss';

const NewCollectionBooks = ({
  books = [],
  isAdditionalParagraph = true,
  title = 'index:newCollectionBooks.title',
  suptitle = 'index:newCollectionBooks.suptitle',
  emptyText = 'components:empty.no-books',
  showModal = () => {},
}) => {
  const screens = useBreakpoint();
  const MAX_COUNT_BOOKS = !screens.md ? 6 : 9;
  const { t } = useTranslation();

  return (
    <section className={classes.newCollectionBooks}>
      <Space direction="vertical" className={classes.newCollectionBooks__heading}>
        <Text style={{ color: '#01504D' }}>{t(suptitle)}</Text>
        <Title>{t(title)}</Title>
      </Space>

      {books.length ? (
        <BooksSlider>
          {books.slice(0, MAX_COUNT_BOOKS).map((book) => (
            <div key={book.id}>
              <BookCard book={book} />
            </div>
          ))}
        </BooksSlider>
      ) : (
        <CustomEmptyComponent description={emptyText} />
      )}

      {isAdditionalParagraph && (
        <div style={{ textAlign: 'center', margin: ' 60px 0' }}>
          <Trans
            i18nKey="index:newCollectionBooks.text"
            components={[
              <Text key="0" type="secondary" style={{ fontSize: '16px' }} />,
              <Link key="1" style={{ color: '#01504D' }} onClick={showModal} />,
            ]}
          />
        </div>
      )}
    </section>
  );
};

export default NewCollectionBooks;
