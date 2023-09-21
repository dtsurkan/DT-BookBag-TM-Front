import { useSelector } from 'react-redux';
import { isEmpty as _isEmpty } from 'lodash';
import { Avatar, Col, Row, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import { ArrowDownOutlined } from '@ant-design/icons';
import { getStrapiMedia } from 'lib/strapi/shared/media';
import { getCustomizedDisplayName, getFirstLetter } from 'utils/functions';

const ProfileAvatar = ({
  sellerProfile = {},
  isChatSellerProfile = false,
  isHasArrow = true,
  isHasCity = false,
  isRotatingIcon = false,
  rowProps = {
    flexDirection: 'row',
  },
  avatarProps = {
    size: 48,
  },
  titleProps = {
    level: 4,
  },
}) => {
  const { profile } = useSelector((state) => state.user);
  const userProfile = isChatSellerProfile ? sellerProfile : profile;
  return (
    <>
      <Row style={{ display: 'inline-flex', alignItems: 'center', ...rowProps }} gutter={[8, 0]}>
        <Col>
          <Space direction="vertical">
            <Title style={{ margin: 0 }} {...titleProps}>
              {!_isEmpty(userProfile) && getCustomizedDisplayName(userProfile.username)}
            </Title>
            {isHasCity && (
              <Space align="start">
                <Title type="secondary" style={{ margin: 0 }} level={5}>
                  {`Город: `}
                </Title>
                <Title style={{ margin: 0 }} level={5}>
                  {userProfile.user_city.value}
                </Title>
              </Space>
            )}
          </Space>
        </Col>
        <Col>
          {!_isEmpty(userProfile?.avatar) ? (
            <Avatar
              style={{ background: '#EDF8F6', color: '#8D9DA4' }}
              src={getStrapiMedia(userProfile?.avatar[0].url)}
              {...avatarProps}
            />
          ) : (
            <Avatar style={{ background: '#EDF8F6', color: '#8D9DA4' }} {...avatarProps}>
              {!_isEmpty(userProfile) && getFirstLetter(userProfile.username)}
            </Avatar>
          )}
          {isHasArrow && (
            <ArrowDownOutlined style={{ marginLeft: '8px' }} rotate={isRotatingIcon ? 180 : 0} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileAvatar;
