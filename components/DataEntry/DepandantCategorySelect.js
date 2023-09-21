import { useState } from 'react';
import MainSelectSearch from './MainSelectSearch';

// NOTE! Fix resetiing value in future
const DepandantCategorySelect = ({ options: categories, form }) => {
  const [isDisabled, setIsDisabled] = useState(form.getFieldValue('subcategories') ? false : true);
  const [subCategories, setSubCategories] = useState(
    categories
      .filter((item) => item.id === form.getFieldValue('categories'))
      .map((category) =>
        category.subcategories.map((subCategory) => ({
          value: subCategory.id,
          label: subCategory.name,
        }))
      )
      .flat()
  );
  const filterCategories = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
  const handleChange = (value) => {
    form.setFieldsValue({ subcategories: undefined });
    if (value) {
      const subCategories = categories
        .filter((item) => item.id === value)
        .map((category) =>
          category.subcategories.map((subCategory) => ({
            value: subCategory.id,
            label: subCategory.name,
          }))
        );
      console.log('subCategories', subCategories[0]);
      setSubCategories(subCategories[0]);
      setIsDisabled(false);
    } else {
      setSubCategories(undefined);
      setIsDisabled(true);
    }
  };
  return (
    <>
      <MainSelectSearch
        onChange={handleChange}
        name="categories"
        options={filterCategories}
        rules={[
          {
            required: true,
            message: 'Выберите категорию!',
          },
        ]}
      />
      <MainSelectSearch
        name="subcategories"
        disabled={isDisabled}
        mode="multiple"
        options={subCategories}
        placeholder="Подкатегория"
        rules={[
          {
            required: true,
            message: 'Выберите подкатегорию!',
          },
        ]}
      />
    </>
  );
};

export default DepandantCategorySelect;
