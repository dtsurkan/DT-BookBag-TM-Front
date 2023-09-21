import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { v4 as uuidv4 } from 'uuid';
import { Col, Divider, Form, Input, Row } from 'antd';
import DebounceDataEntry from 'components/DataEntries/DebounceDataEntry';
import MainInput from 'components/DataEntries/Main/MainInput';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import { getBooksFromGoogleBooks } from 'lib/google/books';

// NOTE! Fix resetiing value in future
const DepandantBookNameAuthorSelect = ({ form }) => {
  const { t } = useTranslation();
  const [customBookForm] = Form.useForm();
  const [hasAdditionalOptions, setHasAdditionalOptions] = useState(false);
  const [additionalOption, setAdditionalOption] = useState({});
  const [isDisabledAuthor, setIsDisabledAuthor] = useState(true);
  const fetchOptions = async (name) => {
    if (name) {
      const response = await getBooksFromGoogleBooks(name);
      console.log(`response`, response);
      // Checking for book without field authors
      const result = response?.data?.items
        ?.filter((book) => book.volumeInfo.authors)
        .map((book) => {
          // const customizedLabel = `Назва: ${
          //   book.volumeInfo.title
          // } Автор: ${book.volumeInfo.authors.join(', ')}`;
          return {
            key: book.id,
            label: book.volumeInfo.title,
            // Think about this issue(title or customized title)
            // label: customizedLabel,
            // NOTE! This implementing needed for unique value of select option.
            // For example, when title the same, it's necessary to stringify all volumeInfo with all data,
            // then before sending to backend, parse and put title to book_name.
            value: JSON.stringify({ ...book.volumeInfo, key: book.id }),
            ...book.volumeInfo,
          };
        });
      console.log(`result`, result);
      return result;
    }
  };

  const handleChange = (value, option) => {
    console.log(`value, option`, value, option);
    // form.setFieldsValue({ author: undefined });
    if (value) {
      if (option.feature) {
        setIsDisabledAuthor(false);
      } else {
        const authors = option.authors.join(', ');
        console.log(`authors`, authors);
        form.setFieldsValue({ author: authors });
      }
    } else {
      console.log(44444);
      form.setFieldsValue({ author: undefined });
      setIsDisabledAuthor(true);
    }
  };

  return (
    <>
      <DebounceDataEntry
        onChange={handleChange}
        fetchOptions={fetchOptions}
        name="book_name"
        rules={[
          {
            required: true,
            message: 'components:data-entries.bookname-error-required',
          },
        ]}
        placeholder="components:data-entries.bookname-placeholder"
        isChildrenOptions={true}
        filterOption={false}
        optionFilterProp="children"
        optionLabelProp="children"
        hasAdditionalOptions={hasAdditionalOptions}
        additionalOption={additionalOption}
        dropdownRender={(menu) => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <Form
              name="custom-adding-book"
              form={customBookForm}
              onFinish={({ book_name }) => {
                console.log(`book_name`, book_name);
                if (book_name) {
                  setHasAdditionalOptions(true);
                  setAdditionalOption({
                    key: uuidv4(),
                    value: JSON.stringify({ title: book_name, key: uuidv4() }),
                    label: book_name,
                    feature: 'custom-added-book',
                  });
                  customBookForm.resetFields();
                }
              }}
              style={{ margin: '10px' }}
            >
              <Row justify="space-around" align="center">
                <Col xs={24} lg={11}>
                  <Form.Item name="book_name" style={{ margin: '0' }}>
                    <Input placeholder={t('components:data-entries.custom-bookname-placeholder')} />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={11}>
                  <Form.Item style={{ margin: '0' }}>
                    <PrimaryButton btnText="components:buttons.add-another-bookname" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      />
      <MainInput
        name="author"
        disabled={isDisabledAuthor}
        placeholder="components:data-entries.author-placeholder"
        rules={[
          {
            required: true,
            message: 'components:data-entries.author-error-required',
          },
        ]}
      />
    </>
  );
};

export default DepandantBookNameAuthorSelect;
