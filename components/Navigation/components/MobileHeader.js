import { useRouter } from 'next/router';
import { useState } from 'react';
import { useShowConfigModal } from 'hooks';
import classNames from 'classnames';
import { Select } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import PageHeaderLogo from 'components/Logo/PageHeaderLogo';
import DebounceSelectSearch from 'components/DataEntry/DebounceSelectSearch';
import MainAutoComplete from 'components/DataEntry/MainAutoComplete';
import ConfigBookModal from 'components/Modals/ConfigBookModal';
import BurgerComponent from './BurgerComponent';
import MobileDrawer from './MobileDrawer';
import { getBooksByAuthorOrBookName } from 'lib/strapi/services/books';
import { LOCALES_LIST } from 'utils/constants';
import classes from 'styles/scss/layout/containers.module.scss';

const MobileHeader = () => {
  const router = useRouter();
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
      <Header className={classNames(classes.container, classes.header)}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BurgerComponent
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
        <DebounceSelectSearch
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
