import { Fragment } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { List } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';

const TermsPolicies = ({ list = [] }) => {
  const { t } = useTranslation();
  return list.map((item) => (
    <Fragment key={item.id}>
      <Title level={3} data-aos="zoom-in">
        {t(item.title)}
      </Title>
      {item?.paragraphs?.map((paragraph, index) => (
        <Paragraph style={{ fontSize: '16px' }} key={index} data-aos="zoom-in">
          {t(paragraph)}
        </Paragraph>
      ))}
      {item?.list && (
        <List size="small" style={{ marginBottom: '16px' }}>
          {item?.list.map((listItem, index) => (
            <List.Item key={index} data-aos="zoom-in">
              - {t(listItem)}
            </List.Item>
          ))}
        </List>
      )}
    </Fragment>
  ));
};

export default TermsPolicies;
