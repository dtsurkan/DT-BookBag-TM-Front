import { v4 as uuidv4 } from 'uuid';
import MainInput from 'components/DataEntries/Main/MainInput';
import MainSelectSearch from 'components/DataEntries/Main/MainSelectSearch';
import MainInputNumber from 'components/DataEntries/Main/MainInputNumber';
import MainTextAreaInput from 'components/DataEntries/Main/MainTextAreaInput';
import DepandantCategorySelect from 'components/DataEntries/Depandant/DepandantCategorySelect';
import DepandantBookNameAuthorSelect from 'components/DataEntries/Depandant/DepandantBookNameAuthorSelect';
import DebounceDataEntry from 'components/DataEntries/DebounceDataEntry';
import { getCities } from 'lib/nova-poshta/services/cities';
import { getBookConditionList, getLanguageList } from 'utils/constants';

export const getBookInputsList = (profile, categories, t) => [
  {
    id: uuidv4(),
    component: DepandantBookNameAuthorSelect,
  },
  {
    id: uuidv4(),
    component: DepandantCategorySelect,
    options: categories,
  },
  {
    id: uuidv4(),
    name: 'language',
    rules: [
      {
        required: true,
        message: 'components:data-entries.language-error-required',
      },
    ],
    placeholder: 'components:data-entries.language-placeholder',
    component: MainSelectSearch,
    options: getLanguageList(t),
  },
  {
    id: uuidv4(),
    name: 'condition',
    rules: [
      {
        required: true,
        message: 'components:data-entries.condition-error-required',
      },
    ],
    placeholder: 'components:data-entries.condition-placeholder',

    component: MainSelectSearch,
    options: getBookConditionList(t),
  },
  {
    id: uuidv4(),
    name: 'price',
    rules: [
      {
        required: true,
        message: 'components:data-entries.price-error-required',
      },
      {
        type: 'number',
        min: 10,
        message: 'components:data-entries.price-error-min-value',
      },
    ],
    component: MainInputNumber,
  },
  {
    id: uuidv4(),
    name: 'seller_city',
    rules: [
      {
        required: true,
        message: 'components:data-entries.city-error-required',
      },
    ],
    placeholder: 'components:data-entries.city-placeholder',
    component: DebounceDataEntry,
    fetchOptions: async (city) => {
      const response = await getCities(city);
      return response?.data?.data[0]?.Addresses.map((city) => {
        return { key: city.DeliveryCity, value: city.Present, label: city.Present };
      });
    },
    labelInValue: true,
    // if options are childen you need config isChildrenOptions and optionFilterProp to"children"
    isChildrenOptions: true,
    optionFilterProp: 'children',
    filterOption: false,
    disabled: profile?.user_city ? true : false,
    extra: profile?.user_city
      ? 'components:data-entries.city-extra-text'
      : 'components:empty.empty-string',
    // initialValue: profile.user_city ? profile.user_city : undefined,
  },
  {
    id: uuidv4(),
    name: 'seller_comment',
    component: MainTextAreaInput,
    lg: 24,
    autoSize: { minRows: 2, maxRows: 5 },
    styles: { marginBottom: '30px' },
  },
];

export const getSettingsInputList = () => [
  {
    id: uuidv4(),
    name: 'fullname',
    hasFeedback: false,
    // rules: [
    //   {
    //     required: true,
    //     message: 'components:data-entries.fullname-error-required',
    //   },
    // ],
    placeholder: 'components:data-entries.fullname-placeholder',
    component: MainInput,
    lg: 24,
  },
  {
    id: uuidv4(),
    name: 'username',
    rules: [
      {
        required: true,
        message: 'components:data-entries.username-error-required',
      },
    ],
    placeholder: 'components:data-entries.username-placeholder',
    component: MainInput,
    lg: 24,
  },
  {
    id: uuidv4(),
    name: 'email',
    rules: [
      {
        type: 'email',
        message: 'components:data-entries.email-error-valid',
      },
      {
        required: true,
        message: 'components:data-entries.email-error-required',
      },
    ],
    placeholder: 'components:data-entries.email-placeholder',
    component: MainInput,
    disabled: true,
    extra: 'components:data-entries.email-extra-text',
    lg: 24,
  },
  {
    id: uuidv4(),
    name: 'user_city',
    // rules: [
    //   {
    //     required: true,
    //     message: 'components:data-entries.city-error-required',
    //   },
    // ],
    hasFeedback: false,
    placeholder: 'components:data-entries.city-placeholder',
    component: DebounceDataEntry,
    fetchOptions: async (city) => {
      const response = await getCities(city);
      return response?.data?.data[0]?.Addresses.map((city) => {
        return {
          key: city.DeliveryCity,
          value: city.Present,
          label: city.Present,
        };
      });
    },
    labelInValue: true,
    // if options are childen you need config isChildrenOptions and optionFilterProp to"children"
    isChildrenOptions: true,
    optionFilterProp: 'children',
    filterOption: false,
    lg: 24,
  },
];
