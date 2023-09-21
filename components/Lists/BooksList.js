import { Fragment } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSelector } from 'react-redux';
import { isEmpty as _isEmpty } from 'lodash';
import { useShowConfigModal, useTwilioClient } from 'hooks';
import { Button, Card, List, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import { PlusOutlined } from '@ant-design/icons';
import HorizontalBookCard from 'components/Cards/HorizontalBookCard';
import ConfigBookModal from 'components/Modals/ConfigBookModal';
import CustomEmptyComponent from 'components/Empty/CustomEmptyComponent';

const BooksList = ({
  hasAddingBook = false,
  hasLoading = true,
  renderKey,
  addingBookItemSettings = { slug: 'not-a-book' },
  grid = {
    gutter: 16,
    column: 4,
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
  const { t } = useTranslation();
  const {
    isConfigBookModal,
    showConfigBookModal,
    handleCancelConfigBookModal,
  } = useShowConfigModal();
  const { client } = useTwilioClient();
  const { isLoadingUserProfile } = useSelector((state) => state.user);
  const customizedDataSource = hasAddingBook ? [addingBookItemSettings, ...dataSource] : dataSource;
  const isCustomLoadingParams = !_isEmpty(customLoadingParams)
    ? customLoadingParams
    : { size: 'large', spinning: isLoadingUserProfile };
  return (
    <>
      <List
        style={{
          minHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        locale={{ emptyText: <CustomEmptyComponent description="components:empty.no-books" /> }}
        loading={hasLoading ? isCustomLoadingParams : false}
        grid={grid}
        itemLayout={itemLayout}
        dataSource={customizedDataSource}
        pagination={pagination}
        renderItem={(book) => (
          <Fragment key={book.slug}>
            {book.slug !== 'not-a-book' ? (
              <List.Item>
                <HorizontalBookCard renderKey={renderKey} book={book} client={client} />
              </List.Item>
            ) : (
              <List.Item>
                <Card
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '400px',
                  }}
                >
                  <Space direction="vertical" align="center">
                    <Button
                      size="large"
                      type="primary"
                      shape="circle"
                      icon={<PlusOutlined />}
                      onClick={showConfigBookModal}
                    />
                    <Text style={{ fontSize: '16px' }} type="secondary">
                      {t('components:buttons.add-book')}
                    </Text>
                  </Space>
                </Card>
              </List.Item>
            )}
          </Fragment>
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
