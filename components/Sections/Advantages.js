import { Fragment } from 'react';
import useTranslation from 'next-translate/useTranslation';
import classNames from 'classnames';
import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import AdventageCard from 'components/Cards/AdventageCard';
import { ADVANTAGES_LIST } from 'utils/constants';
import classes from 'styles/scss/pages/home.module.scss';

const Advantages = () => {
  const { t } = useTranslation();
  return (
    <Row className={classNames(classes.advantages)}>
      <Col xs={24} className={classNames(classes.advantages__heading)}>
        <Title level={3} type="secondary" style={{ color: '#01504D' }}>
          {t('index:advantages.suptitle')}
        </Title>
        <Title level={1} className={classNames(classes.advantages__heading__title)}>
          {t('index:advantages.title')}
        </Title>
      </Col>
      <Row>
        {ADVANTAGES_LIST.map((advantage) => (
          <Fragment key={advantage.id}>
            <AdventageCard title={t(advantage.title)} IconComponent={advantage.icon} />
          </Fragment>
        ))}
      </Row>
    </Row>
  );
};

export default Advantages;
