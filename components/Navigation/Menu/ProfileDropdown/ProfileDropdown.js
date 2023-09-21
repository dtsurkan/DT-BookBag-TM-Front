import { useState } from 'react';
import { Dropdown } from 'antd';
import ProfileAvatar from 'components/Profile/ProfileAvatar';
import MenuItems from '../MenuItems';
import { PROFILE_DROPDOWN_LIST } from 'utils/constants';

const ProfileDropdown = () => {
  const [isVisibleProfileDropdown, setIsVisibleProfileDropdown] = useState(false);

  return (
    <Dropdown
      overlay={<MenuItems menuList={PROFILE_DROPDOWN_LIST} />}
      trigger={['click']}
      onVisibleChange={(flag) => setIsVisibleProfileDropdown(flag)}
    >
      {/* Don't remove span */}
      <span>
        <ProfileAvatar rowProps={{ cursor: 'pointer' }} isRotatingIcon={isVisibleProfileDropdown} />
      </span>
    </Dropdown>
  );
};

export default ProfileDropdown;
