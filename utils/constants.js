import { v4 as uuidv4 } from 'uuid';
import { DefenceIcon, LeavesIcon } from 'components/Icons';
import {
  BookOutlined,
  CarryOutOutlined,
  CloseOutlined,
  LikeOutlined,
  LogoutOutlined,
  MailOutlined,
  MessageOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
} from '@ant-design/icons';

export const DEFAULT_ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/x-citrix-jpeg',
  'image/pjpeg',
  'image/png',
  'image/x-citrix-png',
  'image/x-png',
  'image/webp',
];
export const MAX_FILE_SIZE = 200;
export const SEARCH_CITY_DEBOUNCE_DELAY = 800;
export const SEARCH_BOOK_DEBOUNCE_DELAY = 400;

export const BOOK_CONDITION_LIST = [
  { value: 'Новое', label: 'Новое' },
  { value: 'Идеальное', label: 'Идеальное' },
  { value: 'Xорошее', label: 'Xорошее' },
  { value: 'Среднее', label: 'Среднее' },
  { value: 'Плохое', label: 'Плохое' },
  { value: 'Ужасное', label: 'Ужасное' },
];

export const LANGUAGE_LIST = [
  { value: 'Украинский', label: 'Украинский' },
  { value: 'Русский', label: 'Русский' },
  { value: 'Английский', label: 'Английский' },
  { value: 'Польский', label: 'Польский' },
  { value: 'Итальянский', label: 'Итальянский' },
  { value: 'Нимецкий', label: 'Нимецкий' },
];

// Note: price:ASC/DESC because of _sort: field:params (in documantation strapi)
export const PRICE_FILTER_LIST = [
  { value: 'price:ASC', label: 'От низкой к высокой' },
  { value: 'price:DESC', label: 'От високой к низкой' },
];
export const CREATED_AT_FILTER_LIST = [
  { value: 'created_at:ASC', label: 'Дефолтное' },
  { value: 'created_at:DESC', label: 'Самие новие' },
];

// Advantages list
export const ADVANTAGES_LIST = [
  { id: uuidv4(), title: 'Гараздо дешевле чем в интернет-магазинах' },
  {
    id: uuidv4(),
    title: 'Економие природных ресурсов на печать нових изданий',
    icon: LeavesIcon,
  },
  {
    id: uuidv4(),
    title: 'Удобное и безопасное использование платформи',
    icon: DefenceIcon,
  },
];
// Menu lists
export const MENU_LIST = [
  {
    id: uuidv4(),
    key: '/books',
    href: '/books',
    icon: <BookOutlined style={{ fontSize: 18 }} />,
    title: 'Книги',
  },
  {
    id: uuidv4(),
    key: '/categories',
    href: '/categories',
    icon: <MailOutlined style={{ fontSize: 18 }} />,
    title: 'Категории',
  },
  {
    id: uuidv4(),
    key: '/about',
    href: '/about',
    icon: false,
    title: 'О BookBag',
  },
];

export const PROFILE_DROPDOWN_LIST = [
  {
    id: uuidv4(),
    key: '/profile/added-books',
    href: '/profile/added-books',
    icon: <BookOutlined style={{ fontSize: 18 }} />,
    title: 'Мои книги',
  },
  {
    id: uuidv4(),
    key: '/profile/sold-books',
    href: '/profile/sold-books',
    icon: <CarryOutOutlined style={{ fontSize: 18 }} />,
    title: 'Продано',
  },
  {
    id: uuidv4(),
    key: '/profile/bought-books',
    href: '/profile/bought-books',
    icon: <MoneyCollectOutlined style={{ fontSize: 18 }} />,
    title: 'Куплено',
  },
  {
    id: uuidv4(),
    key: '/profile/liked-books',
    href: '/profile/liked-books',
    icon: <LikeOutlined style={{ fontSize: 18 }} />,
    title: 'Понравившиеся',
  },
  {
    id: uuidv4(),
    key: '/profile/my-messages',
    href: '/profile/my-messages',
    icon: <MessageOutlined style={{ fontSize: 18 }} />,
    title: 'Мои сообщения',
  },
  {
    id: uuidv4(),
    key: '/profile/settings',
    href: '/profile/settings',
    icon: <SettingOutlined style={{ fontSize: 18 }} />,
    title: 'Настройки',
  },
  {
    id: uuidv4(),
    key: 'logout',
    href: 'logout',
    icon: <LogoutOutlined style={{ fontSize: 18 }} />,
    title: 'Выйти',
  },
];

export const PROFILE_ASIDE_TOP_LIST = [
  {
    id: uuidv4(),
    key: '/profile/added-books',
    href: '/profile/added-books',
    icon: <BookOutlined style={{ fontSize: 18 }} />,
    title: 'Мои книги',
  },
  {
    id: uuidv4(),
    key: '/profile/sold-books',
    href: '/profile/sold-books',
    icon: <CarryOutOutlined style={{ fontSize: 18 }} />,
    title: 'Продано',
  },
  {
    id: uuidv4(),
    key: '/profile/bought-books',
    href: '/profile/bought-books',
    icon: <MoneyCollectOutlined style={{ fontSize: 18 }} />,
    title: 'Куплено',
  },
  {
    id: uuidv4(),
    key: '/profile/liked-books',
    href: '/profile/liked-books',
    icon: <LikeOutlined style={{ fontSize: 18 }} />,
    title: 'Понравившиеся',
  },
  {
    id: uuidv4(),
    key: '/profile/my-messages',
    href: '/profile/my-messages',
    icon: <MessageOutlined style={{ fontSize: 18 }} />,
    title: 'Мои сообщения',
  },
];

export const PROFILE_ASIDE_BOTTOM_LIST = [
  {
    id: uuidv4(),
    key: '/profile/settings',
    href: '/profile/settings',
    icon: <SettingOutlined style={{ fontSize: 18 }} />,
    title: 'Настройки',
  },
  {
    id: uuidv4(),
    key: 'logout',
    href: 'logout',
    icon: <LogoutOutlined style={{ fontSize: 18 }} />,
    title: 'Выйти',
  },
];

export const BOOK_SETTINGS_LIST = [
  {
    id: uuidv4(),
    key: 'edit',
    href: false,
    icon: <SettingOutlined style={{ fontSize: 18 }} />,
    title: 'Изменить',
  },
  {
    id: uuidv4(),
    key: 'liked',
    href: false,
    icon: <LikeOutlined style={{ fontSize: 18 }} />,
    title: 'Нравится',
  },
  {
    id: uuidv4(),
    key: 'sold',
    href: false,
    icon: <CarryOutOutlined style={{ fontSize: 18 }} />,
    title: 'Продано',
  },
  {
    id: uuidv4(),
    key: 'delete',
    href: false,
    icon: <CloseOutlined style={{ fontSize: 18 }} />,
    title: 'Удалить',
  },
];
