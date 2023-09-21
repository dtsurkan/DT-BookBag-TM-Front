import { createUseStyles } from 'react-jss';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/client';
import _isEmpty from 'lodash/isEmpty';
import useTwilioClient from 'hooks/useTwilioClient';
import useShowConfigModal from 'hooks/useShowConfigModal';
import { Card, List, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import { PlusOutlined } from '@ant-design/icons';
import VerticalBookCard from 'components/Book/VerticalBookCard';
import ConfigBookModal from 'components/Modals/ConfigBook';
import CustomEmpty from 'components/Empty/CustomEmpty';
import PrimaryButton from 'components/Buttons/PrimaryButton';

const useStyles = createUseStyles((theme) => ({
  booksList: {
    // minHeight: '75vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  notTheBookCard: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
  },
  [theme.breakpoints.down(theme.breakpoints.md)]: {
    paddings: {
      padding: '0px',
    },
  },
}));

const BooksList = ({
  hasAddingBook = false,
  hasLoading = true,
  renderKey,
  addingBookItemSettings = { slug: 'not-a-book' },
  grid = {
    gutter: 16,
    column: 3,
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 3,
  },
  itemLayout = 'horizontal',
  dataSource = [],
  pagination = {},
  customLoadingParams = {},
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    isConfigBookModal,
    showConfigBookModal,
    handleCancelConfigBookModal,
  } = useShowConfigModal();
  const { client } = useTwilioClient();
  const [session, isLoadingUserProfile] = useSession();
  const customizedDataSource = hasAddingBook ? [addingBookItemSettings, ...dataSource] : dataSource;
  const isCustomLoadingParams = !_isEmpty(customLoadingParams)
    ? customLoadingParams
    : { size: 'large', spinning: isLoadingUserProfile };
  return (
    <>
      <List
        className={classes.bookList}
        locale={{ emptyText: <CustomEmpty description="components:empty.no-books" /> }}
        loading={hasLoading ? isCustomLoadingParams : false}
        grid={grid}
        itemLayout={itemLayout}
        dataSource={customizedDataSource}
        pagination={pagination}
        renderItem={(book) => (
          <div key={book.slug} data-aos="zoom-in">
            {book.slug !== 'not-a-book' ? (
              <List.Item>
                <VerticalBookCard renderKey={renderKey} book={book} client={client} />
              </List.Item>
            ) : (
              <List.Item>
                <Card className={classes.notTheBookCard}>
                  <Space direction="vertical" align="center">
                    <PrimaryButton
                      shape="circle"
                      icon={<PlusOutlined />}
                      onClick={showConfigBookModal}
                      btnText="components:empty.empty-string"
                    />
                    <Title level={3} type="secondary">
                      {t('components:buttons.add-book')}
                    </Title>
                  </Space>
                </Card>
              </List.Item>
            )}
          </div>
        )}
      />
      {isConfigBookModal && (
        <ConfigBookModal
          formName="adding-book"
          visible={isConfigBookModal}
          onCancel={handleCancelConfigBookModal}
        />
      )}
    </>
  );
};

export default BooksList;
