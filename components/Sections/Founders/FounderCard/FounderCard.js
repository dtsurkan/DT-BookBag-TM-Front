import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { Avatar, Col, Space } from 'antd';
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import AlinaSignIcon from 'components/Icons/AlinaSignIcon';

const useStyles = createUseStyles((theme) => ({
  founderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '25px 0',
  },
  founderBox: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 25px',
    textAlign: 'center',
  },
  founderAvatar: { marginRight: '16px', width: '220px', height: '220px' },
  founderIcon: {
    color: '#8D9DA4',
    fontSize: '20px',
  },
  [theme.breakpoints.down(theme.breakpoints.md)]: {
    founderAvatar: {
      marginRight: '0px',
      width: '180px',
      height: '180px',
    },
  },
}));

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
  const classes = useStyles();
  const alt = avatar ? avatar : 'example';
  return (
    <Col xs={xs} lg={lg} xl={xl} xxl={xxl} className={classes.founderWrapper}>
      <Space className={classNames(classes.founderBox)}>
        <Avatar src={avatar} className={classNames(classes.founderAvatar)} alt={alt} />
        <Space direction="vertical">
          <Title level={3}>{founderName}</Title>
          <Text>{founderJob}</Text>
          <Space size="middle">
            <FacebookOutlined className={classes.founderIcon} />
            <InstagramOutlined className={classes.founderIcon} />
          </Space>
          {founderSign}
        </Space>
      </Space>
    </Col>
  );
};

export default FounderCard;
