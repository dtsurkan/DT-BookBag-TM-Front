import { Layout, Row, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import { createUseStyles } from 'react-jss';
import FounderCard from 'components/Sections/Founders/FounderCard/FounderCard';
import DImaSignIcon from 'components/Icons/DimaSignIcon';

const useStyles = createUseStyles((theme) => ({
  aboutFounders: {
    background: '#f9fefd',
    margin: '50px 0',
    padding: '50px 0',
    minHeight: '60vh',
    display: 'flex',
    justifyContent: 'center',
  },
  [theme.breakpoints.down(theme.breakpoints.md)]: {
    aboutFounders: {
      margin: '0px',
      padding: '25px 0',
    },
  },
}));

const Founders = () => {
  const classes = useStyles();
  return (
    <Layout className={classes.aboutFounders}>
      <Space direction="vertical" align="center">
        <Title level={4}>Давай знакомиться!</Title>
        <Title>Основатели платформы</Title>
      </Space>
      <Row justify="center" style={{ margin: '32px 0' }}>
        <FounderCard />
        <FounderCard
          founderName="Дмитрий Цуркан"
          founderSign={<DImaSignIcon />}
          founderJob="Крутой разработчик"
          avatar="/assets/dima_tsurkan.png"
        />
      </Row>
    </Layout>
  );
};

export default Founders;
