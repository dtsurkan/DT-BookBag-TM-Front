import { Layout, Row, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import FounderCard from 'components/Cards/FounderCard';
import { DImaSignIcon } from 'components/Icons';
import classes from 'styles/scss/pages/about.module.scss';

const Founders = () => {
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
