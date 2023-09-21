import { Fragment } from 'react';
import useTranslation from 'next-translate/useTranslation';
import classNames from 'classnames';
import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import AdventageCard from 'components/Sections/Advantages/AdvantageCard';
import { ADVANTAGES_LIST } from 'utils/constants';
import useStyles from './styles';

const Advantages = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Row className={classNames(classes.advantages)}>
      <Col xs={24} className={classNames(classes.advantagesHeading)}>
        <Title level={3} type="secondary" style={{ color: '#01504D' }} data-aos="fade-right">
          {t('components:advantages.suptitle')}
        </Title>
        <Title
          level={1}
          className={classNames(classes.advantagesHeadingTitle)}
          data-aos="fade-left"
        >
          {t('components:advantages.title')}
        </Title>
      </Col>
      <Row>
        {ADVANTAGES_LIST.map(({ id, title, icon, ...other }) => (
          <Fragment key={id}>
            <AdventageCard title={t(title)} IconComponent={icon} {...other} />
          </Fragment>
        ))}
      </Row>
    </Row>
  );
};

export default Advantages;
