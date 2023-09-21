import classNames from 'classnames';
import { Avatar, Col, Space } from 'antd';
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import { AlinaSignIcon } from 'components/Icons';
import classes from 'styles/scss/pages/about.module.scss';

const FounderCard = ({
  xs = 24,
  lg = 12,
  xl = 12,
  xxl = 8,
  avatar = '/assets/alina_kulpinska.png',
  founderName = 'Алина Кульпинская',
  founderJob = 'Крутой менеджер',
  founderSign = <AlinaSignIcon />,
}) => {
  const alt = avatar ? avatar : 'example';
  return (
    <Col
      xs={xs}
      lg={lg}
      xl={xl}
      xxl={xxl}
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '25px 0',
      }}
    >
      <Space
        align="center"
        wrap={true}
        style={{ justifyContent: 'center', padding: '0 25px' }}
        className={classNames(classes._centered)}
      >
        <Avatar src={avatar} className={classNames(classes.aboutFounders__avatar)} alt={alt} />
        <Space direction="vertical">
          <Title level={3}>{founderName}</Title>
          <Text>{founderJob}</Text>
          <Space size="middle">
            <FacebookOutlined
              style={{
                color: '#8D9DA4',
                fontSize: '20px',
              }}
            />
            <InstagramOutlined
              style={{
                color: '#8D9DA4',
                fontSize: '20px',
              }}
            />
          </Space>
          {founderSign}
        </Space>
      </Space>
    </Col>
  );
};

export default FounderCard;
