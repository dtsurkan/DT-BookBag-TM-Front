import { useState } from 'react';
import { useSession } from 'next-auth/client';
import useCustomSwr from 'hooks/useCustomSwr';
import useBadgeProfileCount from 'hooks/useBadgeProfileCount';
import { Dropdown } from 'antd';
import ProfileAvatar from 'components/Profile/ProfileAvatar';
import MenuItems from '../MenuItems';
import { getUserProcessingBooksSWR } from 'lib/swr/mutate/books';
import { getProfileDropdownList } from 'utils/constants';

const ProfileDropdown = () => {
  const [isVisibleProfileDropdown, setIsVisibleProfileDropdown] = useState(false);
  const [session] = useSession();
  const { response: processing_books } = useCustomSwr({
    url: getUserProcessingBooksSWR(session?.profile?.id, ''),
  });
  const { messagesCount } = useBadgeProfileCount();
  const finalBadgeCount = processing_books.length + messagesCount;

  return (
    <Dropdown
      overlay={
        <MenuItems
          menuList={getProfileDropdownList({
            processingBooksCount: processing_books.length,
            messagesCount,
          })}
        />
      }
      trigger={['click']}
      onVisibleChange={(flag) => setIsVisibleProfileDropdown(flag)}
    >
      {/* Don't remove span */}
      <span>
        <ProfileAvatar
          badgeCount={finalBadgeCount}
          rowProps={{ cursor: 'pointer' }}
          isRotatingIcon={isVisibleProfileDropdown}
        />
      </span>
    </Dropdown>
  );
};

export default ProfileDropdown;
