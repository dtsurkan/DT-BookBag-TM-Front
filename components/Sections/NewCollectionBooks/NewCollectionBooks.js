import { Space } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { createUseStyles } from 'react-jss';
import Trans from 'next-translate/Trans';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import Link from 'antd/lib/typography/Link';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import CustomEmpty from 'components/Empty/CustomEmpty';
import VerticalBookCard from 'components/Book/VerticalBookCard';
import BooksSlider from 'components/Sliders/ReactSlick/SіmpleSlider';

const useStyles = createUseStyles((theme) => ({
  newCollectionBooks: {
    margin: '100px 0',
  },
  newCollectionBooksHeading: {},
  additionalParagraph: {
    textAlign: 'center',
    margin: ' 60px 0',
  },
  [theme.breakpoints.down(theme.breakpoints.md)]: {
    newCollectionBooksHeading: {
      marginBottom: '50px',
    },
  },
}));

const NewCollectionBooks = ({
  client,
  books = [],
  isAdditionalParagraph = true,
  title = 'components:newCollectionBooks.title',
  suptitle = 'components:newCollectionBooks.suptitle',
  emptyText = 'components:empty.no-books',
  subtitle = 'components:empty.empty-string',
  hasSuptitle = true,
  hasSubtitle = false,
  route,
  showModal = () => {},
}) => {
  const classes = useStyles();
  const screens = useBreakpoint();
  const MAX_COUNT_BOOKS = !screens.md ? 6 : 9;
  const { t } = useTranslation();

  return (
    <section className={classes.newCollectionBooks} data-aos="zoom-in">
      <Space direction="vertical" className={classes.newCollectionBooksHeading}>
        {hasSuptitle && <Text style={{ color: '#01504D' }}>{t(suptitle)}</Text>}
        <Title>{t(title)}</Title>
        {hasSubtitle && <Text>{t(subtitle)}</Text>}
      </Space>

      {books.length ? (
        <BooksSlider route={route}>
          {books?.slice(0, MAX_COUNT_BOOKS)?.map((book, index) => (
            <div
              data-aos="fade-right"
              data-aos-duration={parseInt(`${index}00`) + 900}
              key={book.id}
            >
              <VerticalBookCard client={client} book={book} />
            </div>
          ))}
        </BooksSlider>
      ) : (
        <CustomEmpty description={emptyText} />
      )}

      {isAdditionalParagraph && (
        <div className={classes.additionalParagraph} data-aos="fade-up">
          <Trans
            i18nKey="components:newCollectionBooks.text"
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
