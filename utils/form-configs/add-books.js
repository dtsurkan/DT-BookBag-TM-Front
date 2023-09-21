import { v4 as uuidv4 } from "uuid";
import MainInput from "components/DataEntry/MainInput";
import MainSelectSearch from "components/DataEntry/MainSelectSearch";
import MainInputNumber from "components/DataEntry/MainInputNumber";
import MainTextAreaInput from "components/DataEntry/MainTextAreaInput";
import DepandantCategorySelect from "components/DataEntry/DepandantCategorySelect";
import { BOOK_CONDITION_LIST, LANGUAGE_LIST } from "utils/constants";
import DebounceSelectSearch from "components/DataEntry/DebounceSelectSearch";
import { getCities } from "lib/nova-poshta/services/cities";

export const getBookInputsList = (categories) => [
  {
    id: uuidv4(),
    name: "book_name",
    rules: [
      {
        required: true,
        message: "Введите название книги!",
      },
    ],
    placeholder: "Название книги",
    component: MainInput,
  },
  {
    id: uuidv4(),
    name: "author",
    rules: [
      {
        required: true,
        message: "Введите автора!",
      },
    ],
    placeholder: "Автор",
    component: MainInput,
  },
  {
    id: uuidv4(),
    component: DepandantCategorySelect,
    options: categories,
  },
  {
    id: uuidv4(),
    name: "language",
    rules: [
      {
        required: true,
        message: "Выберите язык!",
      },
    ],
    placeholder: "Языки",
    btnText: "Добавить язык",
    component: MainSelectSearch,
    options: LANGUAGE_LIST,
  },
  {
    id: uuidv4(),
    name: "condition",
    rules: [
      {
        required: true,
        message: "Укажите состояние!",
      },
    ],
    placeholder: "Состояние",

    component: MainSelectSearch,
    options: BOOK_CONDITION_LIST,
  },
  {
    id: uuidv4(),
    name: "price",
    rules: [
      {
        required: true,
        message: "Введите цену!",
      },
    ],
    component: MainInputNumber,
  },
  {
    id: uuidv4(),
    name: "seller_city",
    rules: [
      {
        required: true,
        message: "Укажите свой город!",
      },
    ],
    placeholder: "Укажите свой город",
    component: DebounceSelectSearch,
    fetchOptions: async (city) => {
      const response = await getCities(city);
      return response?.data?.data[0]?.Addresses.map((city) => {
        return {
          value: city.MainDescription,
          label: city.Present,
        };
      });
    },
    labelInValue: true,
    // if options are childen you need config isChildrenOptions and optionFilterProp to"children"
    isChildrenOptions: true,
    optionFilterProp: "children",
  },
  {
    id: uuidv4(),
    name: "seller_comment",
    component: MainTextAreaInput,
    lg: 24,
    minRows: 2,
  },
];
