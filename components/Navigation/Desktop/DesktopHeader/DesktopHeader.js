import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { Select } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import DebounceDataEntry from 'components/DataEntries/DebounceDataEntry';
import MainAutoComplete from 'components/DataEntries/Main/MainAutoComplete';
import PageHeaderLogo from 'components/Layout/PageHeaderLogo';
import ProfileDropdown from 'components/Navigation/Menu/ProfileDropdown';
import MenuItems from 'components/Navigation/Menu/MenuItems';
import { getBooksByAuthorOrBookName } from 'lib/strapi/services/books';
import { LOCALES_LIST } from 'utils/constants';
import useStyles from './styles';

const DesktopHeader = ({ hasLogo = true, hasProfile = true, headerStyles }) => {
  const router = useRouter();
  const [session] = useSession();
  const classes = useStyles();
  const { locale } = router;
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
    <Header className={classes.header} style={headerStyles} data-aos="fade-down">
      {hasLogo && <PageHeaderLogo style={{ padding: 0, cursor: 'pointer' }} isClickable={true} />}
      <DebounceDataEntry
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
          {session ? (
            <ProfileDropdown />
          ) : (
            <PrimaryButton
              isBlock={false}
              type="text"
              btnText="components:buttons.join"
              onClick={() => router.push('/auth/login')}
            />
          )}
        </Fragment>
      )}
    </Header>
  );
};

export default DesktopHeader;
