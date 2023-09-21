import { useSelector } from "react-redux";
import { Avatar, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { ArrowDownOutlined } from "@ant-design/icons";
import { getCustomizedDisplayName, getFirstLetter } from "utils/functions";

const ProfileAvatar = ({
  isHasArrow = true,
  isRotatingIcon = false,
  rowProps = {
    flexDirection: "row",
  },
  avatarProps = {
    size: 48,
  },
  titleProps = {
    level: 4,
  },
}) => {
  const { profile } = useSelector((state) => state.user);
  return (
    <>
      <Row
        style={{ display: "inline-flex", alignItems: "center", ...rowProps }}
        gutter={[8, 0]}
      >
        <Col>
          <Title style={{ margin: 0 }} {...titleProps}>
            {getCustomizedDisplayName(profile?.username)}
          </Title>
        </Col>
        <Col>
          {profile?.photoUrl ? (
            <Avatar
              style={{ background: "#EDF8F6", color: "#8D9DA4" }}
              src={profile?.photoUrl}
              {...avatarProps}
            />
          ) : (
            <Avatar
              style={{ background: "#EDF8F6", color: "#8D9DA4" }}
              {...avatarProps}
            >
              {getFirstLetter(profile?.username)}
            </Avatar>
          )}
          {isHasArrow && (
            <ArrowDownOutlined
              style={{ marginLeft: "8px" }}
              rotate={isRotatingIcon ? 180 : 0}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileAvatar;
