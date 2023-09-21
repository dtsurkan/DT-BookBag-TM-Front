import { useRouter } from 'next/router';
import { useState } from 'react';
import useShowConfigModal from 'hooks/useShowConfigModal';
import classNames from 'classnames';
import { Select } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import PageHeaderLogo from 'components/Layout/PageHeaderLogo';
import DebounceDataEntry from 'components/DataEntries/DebounceDataEntry';
import MainAutoComplete from 'components/DataEntries/Main/MainAutoComplete';
import ConfigBookModal from 'components/Modals/ConfigBook';
import Burger from 'components/Navigation/Burger';
import MobileDrawer from 'components/Navigation/Mobile/MobileDrawer';
import { getBooksByAuthorOrBookName } from 'lib/strapi/services/books';
import { LOCALES_LIST } from 'utils/constants';
import useStyles from 'components/Navigation/Desktop/DesktopHeader/styles';

const MobileHeader = () => {
  const router = useRouter();
  const classes = useStyles();
  const { locale } = router;
  const {
    isConfigBookModal,
    showConfigBookModal,
    handleCancelConfigBookModal,
  } = useShowConfigModal();
  const [isVisibleMenuDrawer, setIsVisibleMenuDrawer] = useState(false);
  const handleTriggerMenuDrawer = () => setIsVisibleMenuDrawer(!isVisibleMenuDrawer);
  const handleCloseMenuDrawer = () => setIsVisibleMenuDrawer(false);
  const onSearchBooks = async (value) => {
    console.log('value', value);
    try {
      if (!value) {
        return [];
      }
      const response = await getBooksByAuthorOrBookName(value);
      return response.data;
    } catch (error) {
      console.log(`error`, error);
    }
  };
  const onSelectBook = (value, instance) => {
    router.push(`/books/${instance.slug}`);
  };
  return (
    <>
      <Header className={classNames(classes.header)} data-aos="fade-down">
        <div className={classes.headerWrapper}>
          <Burger
            isVisible={isVisibleMenuDrawer}
            handleTriggerMenuDrawer={handleTriggerMenuDrawer}
          />
          <PageHeaderLogo style={{ padding: 0, cursor: 'pointer' }} isClickable={true} />
        </div>
        <div>
          <Select
            onSelect={(locale) => {
              console.log(`locale`, locale);
              router.push(router.asPath, router.asPath, { locale });
            }}
            bordered={false}
            defaultValue={locale}
          >
            {LOCALES_LIST.map((locale) => (
              <Select.Option key={locale.value} value={locale.value}>
                {locale.label}
              </Select.Option>
            ))}
          </Select>
        </div>
        <DebounceDataEntry
          fetchOptions={onSearchBooks}
          onSelect={onSelectBook}
          dataEntryComponent={MainAutoComplete}
          bordered={false}
          style={{ background: '#EDF8F6' }}
        />
      </Header>
      <MobileDrawer
        visible={isVisibleMenuDrawer}
        onClose={handleCloseMenuDrawer}
        showAddingBookModal={showConfigBookModal}
      />
      <ConfigBookModal visible={isConfigBookModal} onCancel={handleCancelConfigBookModal} />
    </>
  );
};

export default MobileHeader;
