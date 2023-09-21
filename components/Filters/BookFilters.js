import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Col, Row, Form } from 'antd';
import Title from 'antd/lib/typography/Title';
import FilterComponent from 'components/DataEntry/FilterComponent';
import {
  BOOK_CONDITION_LIST,
  LANGUAGE_LIST,
  PRICE_FILTER_LIST,
  CREATED_AT_FILTER_LIST,
} from 'utils/constants';
import { stringifyQueryParams } from 'lib/qs';

const BookFilters = ({ booksCount = 0, title = 'Каталог книг' }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const onValuesChange = (changedFields, allQueryParams) =>
    router.push(`${window.location.pathname}${stringifyQueryParams(allQueryParams)}`);

  useEffect(() => {
    form.setFieldsValue({ ...router.query });
  }, [form, router.query]);

  return (
    <Form form={form} size="large" name="filters" onValuesChange={onValuesChange}>
      <Row justify="space-between">
        <Col xs={24}>
          <Title level={1}>{`${title} (найдено: ${booksCount})`}</Title>
        </Col>
        <Col xs={24}>
          <Row>
            <FilterComponent name="condition" options={BOOK_CONDITION_LIST} />
            <FilterComponent
              filterText="По дате"
              placeholder="По дате"
              name="created_at"
              options={CREATED_AT_FILTER_LIST}
            />
            <FilterComponent
              options={LANGUAGE_LIST}
              filterText="Язык"
              placeholder="Язык"
              name="language"
            />
            <FilterComponent
              options={PRICE_FILTER_LIST}
              filterText="Цена"
              placeholder="Цена"
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
