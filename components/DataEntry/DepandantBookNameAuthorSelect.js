import DebounceSelectSearch from './DebounceSelectSearch';
import MainInput from './MainInput';
import { getBooksFromGoogleBooks } from 'lib/google/books';

// NOTE! Fix resetiing value in future
const DepandantBookNameAuthorSelect = ({ form }) => {
  const fetchOptions = async (name) => {
    if (name) {
      const response = await getBooksFromGoogleBooks(name);
      console.log(`response`, response);
      // Checking for book without field authors
      const result = response?.data?.items
        ?.filter((book) => book.volumeInfo.authors)
        .map((book) => {
          const customizedLabel = `Назва: ${
            book.volumeInfo.title
          } Автор: ${book.volumeInfo.authors.join(', ')}`;
          return {
            key: book.id,
            // label: book.volumeInfo.title,
            // Think about this issue(title or customized title)
            label: customizedLabel,
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
      const authors = option.authors.join(', ');
      console.log(`authors`, authors);
      form.setFieldsValue({ author: authors });
    } else {
      console.log(44444);
      form.setFieldsValue({ author: undefined });
    }
  };

  return (
    <>
      <DebounceSelectSearch
        onChange={handleChange}
        fetchOptions={fetchOptions}
        name="book_name"
        rules={[
          {
            required: true,
            message: 'Введите название книги!',
          },
        ]}
        placeholder="Название книги"
        isChildrenOptions={true}
        filterOption={false}
        optionFilterProp="children"
        optionLabelProp="children"
      />
      <MainInput
        name="author"
        disabled={true}
        placeholder="Автор"
        rules={[
          {
            required: true,
            message: 'Введите автора!',
          },
        ]}
      />
    </>
  );
};

export default DepandantBookNameAuthorSelect;
