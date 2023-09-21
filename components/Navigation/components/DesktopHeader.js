import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { isEmpty as _isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Select } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import PrimaryOutlinedButton from 'components/Buttons/PrimaryOutlinedButton';
import DebounceSelectSearch from 'components/DataEntry/DebounceSelectSearch';
import MainAutoComplete from 'components/DataEntry/MainAutoComplete';
import PageHeaderLogo from 'components/Logo/PageHeaderLogo';
import ProfileDropdown from './ProfileDropdown';
import MenuItems from './MenuItems';
import { getBooksByAuthorOrBookName } from 'lib/strapi/services/books';
import { LOCALES_LIST } from 'utils/constants';
import classes from 'styles/scss/layout/containers.module.scss';

const DesktopHeader = ({ hasLogo = true, hasProfile = true, headerStyles }) => {
  const router = useRouter();
  const { locale } = router;
  const { profile } = useSelector((state) => state.user);
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
    <Header className={classNames(classes.header, classes.container)} style={headerStyles}>
      {hasLogo && <PageHeaderLogo style={{ padding: 0, cursor: 'pointer' }} isClickable={true} />}
      <DebounceSelectSearch
        fetchOptions={onSearchBooks}
        onSelect={onSelectBook}
        dataEntryComponent={MainAutoComplete}
        bordered={false}
        style={{ background: '#EDF8F6' }}
      />
      <MenuItems mode="horizontal" />
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
      {hasProfile && (
        <Fragment>
          {!_isEmpty(profile) ? (
            <ProfileDropdown />
          ) : (
            <PrimaryOutlinedButton onClick={() => router.push('/login')} />
          )}
        </Fragment>
      )}
    </Header>
  );
};

export default DesktopHeader;
