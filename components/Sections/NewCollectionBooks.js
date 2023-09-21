import { Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import BookCard from 'components/Cards/BookCard';
import BooksSlider from 'components/Sliders/Slick/BooksSlider';
import Link from 'antd/lib/typography/Link';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import classes from 'styles/scss/pages/home.module.scss';

const NewCollectionBooks = ({
  books = [],
  isAdditionalParagraph = true,
  title = 'Новые пополнения книг',
  suptitle = 'Новинки',
  showModal = () => {},
}) => {
  const screens = useBreakpoint();
  const MAX_COUNT_BOOKS = !screens.md ? 6 : 9;

  return (
    <section className={classes.newCollectionBooks}>
      <Space direction="vertical" className={classes.newCollectionBooks__heading}>
        <Text style={{ color: '#01504D' }}>{suptitle}</Text>

        <Title>{title}</Title>
      </Space>

      <BooksSlider>
        {books.length &&
          books.slice(0, MAX_COUNT_BOOKS).map((book) => (
            <div key={book.id}>
              <BookCard book={book} />
            </div>
          ))}
      </BooksSlider>

      {isAdditionalParagraph && (
        <div className="" style={{ textAlign: 'center', margin: ' 60px 0' }}>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Хотите чтобы ваша книга тоже была здесь? Тогда нажмите{' '}
            <Link style={{ color: '#01504D' }} onClick={showModal}>
              добавить свою книгу
            </Link>
          </Text>
        </div>
      )}
    </section>
  );
};

export default NewCollectionBooks;
