// import { useRouter } from 'next/router';
// import useTranslation from 'next-translate/useTranslation';
// import { useSelector } from 'react-redux';
// import { Card, Col, Row, Space, Tooltip } from 'antd';
// import Text from 'antd/lib/typography/Text';
// import Title from 'antd/lib/typography/Title';
// import { DoubleCheckIcon } from 'components/Icons';
// import { getStrapiMedia } from 'lib/strapi/shared/media';
// import { getCapitalizedString } from 'utils/lodash/string';
// import classes from 'styles/scss/components/cards.module.scss';

// const HorizontalBookCard = ({ book = {}, gutter = [8, 0] }) => {
//   const router = useRouter();
//   const { profile } = useSelector((state) => state.user);
//   const { t } = useTranslation();
//   return (
//     <Card
//       bodyStyle={{ padding: '0px' }}
//       hoverable
//       className={classes.horizontalBookCard}
//       onClick={() => router.push(`/books/${book.slug}`)}
//     >
//       <Row className={classes.row}>
//         <Col className={classes.imageBox}>
//           <img src={getStrapiMedia(book?.photos[0]?.url)} alt={book.photos[0]?.name} />
//         </Col>
//         <Col xs={24} lg={12}>
//           <Space direction="vertical" style={{ padding: '16px', width: '100%' }}>
//             <Title
//               level={5}
//               ellipsis={{
//                 rows: 2,
//                 tooltip: <Tooltip>{getCapitalizedString(book?.book_name)}</Tooltip>,
//               }}
//               style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
//             >
//               {book?.book_name}
//             </Title>
//             {book.book_status === 'sold' && book.seller.id !== profile.id ? (
//               <Space>
//                 <DoubleCheckIcon />
//                 <Text style={{ color: '#6bbe9f' }}>{t('components:book.success-bought')}</Text>
//               </Space>
//             ) : book.book_status === 'sold' ? (
//               <Space>
//                 <DoubleCheckIcon />
//                 <Text style={{ color: '#6bbe9f' }}>{t('components:book.success-sold')}</Text>
//               </Space>
//             ) : (
//               <>
//                 <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <Text>{t('components:cards.description.language')}</Text>
//                   <Text>{t(`components:lists.language.${book.language}`)}</Text>
//                 </Space>
//                 <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
//                   <Text>{t('components:cards.description.author')}</Text>
//                   <Text
//                     ellipsis={{
//                       rows: 3,
//                       tooltip: <Tooltip>{getCapitalizedString(book?.author)}</Tooltip>,
//                     }}
//                     style={{ textTransform: 'capitalize' }}
//                   >
//                     {book.author}
//                   </Text>
//                 </Space>
//               </>
//             )}
//             <Title level={3}>
//               {t('components:cards.description.price', { price: book.price })}
//             </Title>
//           </Space>
//         </Col>
//       </Row>
//     </Card>
//   );
// };

// export default HorizontalBookCard;
