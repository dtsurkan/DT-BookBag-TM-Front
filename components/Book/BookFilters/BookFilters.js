import { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Col, Row, Form } from 'antd';
import Title from 'antd/lib/typography/Title';
import BookFilter from 'components/DataEntries/Filters/BookFilter';
import {
  getCreateAtFilterList,
  getPriceFilterList,
  getBookConditionList,
  getLanguageList,
} from 'utils/constants';
import { stringifyQueryParams } from 'lib/qs';

const BookFilters = ({ booksCount = 0, title = 'components:others.catalog-title' }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const router = useRouter();
  const onValuesChange = (changedFields, allQueryParams) =>
    router.push(`${window.location.pathname}${stringifyQueryParams(allQueryParams)}`);

  useEffect(() => {
    form.setFieldsValue({ ...router.query });
  }, [form, router.query]);

  useEffect(() => {
    form.resetFields();
  }, [form, window.location.pathname]);
  return (
    <Form
      style={{ margin: '24px 0' }}
      form={form}
      size="large"
      name="filters"
      onValuesChange={onValuesChange}
    >
      <Row justify="space-between">
        <Col xs={24}>
          <Title>
            {t(title)} {`(${booksCount})`}
          </Title>
        </Col>
        <Col xs={24}>
          <Row>
            <BookFilter name="condition" options={getBookConditionList(t)} />
            <BookFilter
              filterText="components:data-entries.date-filter-label"
              placeholder="components:data-entries.date-placeholder"
              name="created_at"
              options={getCreateAtFilterList(t)}
            />
            <BookFilter
              options={getLanguageList(t)}
              filterText="components:data-entries.language-filter-label"
              placeholder="components:data-entries.language-placeholder"
              name="language"
            />
            <BookFilter
              options={getPriceFilterList(t)}
              filterText="components:data-entries.price-filter-label"
              placeholder="components:data-entries.price-placeholder"
              name="price"
              xs={12}
              lg={16}
            />
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default BookFilters;
