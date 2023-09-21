import { v4 as uuidv4 } from 'uuid';
import LeavesIcon from 'components/Icons/LeavesIcon';
import DefenceIcon from 'components/Icons/DefenceIcon';
import {
  AlertOutlined,
  BookOutlined,
  CarryOutOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  LikeOutlined,
  LogoutOutlined,
  MailOutlined,
  MessageOutlined,
  MoneyCollectOutlined,
  SettingOutlined,
} from '@ant-design/icons';

// For book pagination
export const PAGE_SIZE = 30;
export const PAGE_BOOK_LIMIT = 30;

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

export const getBookConditionList = (t) => [
  { value: 'new', label: t('components:lists.condition.new') },
  { value: 'perfect', label: t('components:lists.condition.perfect') },
  { value: 'good', label: t('components:lists.condition.good') },
  { value: 'medium', label: t('components:lists.condition.medium') },
  { value: 'bad', label: t('components:lists.condition.bad') },
  { value: 'terrible', label: t('components:lists.condition.terrible') },
];
export const LOCALES_LIST = [
  { value: 'uk', label: 'UA' },
  { value: 'ru', label: 'RU' },
];
export const getLanguageList = (t) => [
  { value: 'ukrainian', label: t('components:lists.language.ukrainian') },
  { value: 'russian', label: t('components:lists.language.russian') },
  { value: 'english', label: t('components:lists.language.english') },
  { value: 'polish', label: t('components:lists.language.polish') },
  { value: 'italian', label: t('components:lists.language.italian') },
  { value: 'german', label: t('components:lists.language.german') },
];

// Note: price:ASC/DESC because of _sort: field:params (in documantation strapi)
export const getPriceFilterList = (t) => [
  { value: 'price:ASC', label: t('components:lists.price.from-small-to-big') },
  { value: 'price:DESC', label: t('components:lists.price.from-big-to-small') },
];
export const getCreateAtFilterList = (t) => [
  { value: 'created_at:ASC', label: t('components:lists.date.default') },
  { value: 'created_at:DESC', label: t('components:lists.date.new') },
];

// Advantages list
export const ADVANTAGES_LIST = [
  {
    id: uuidv4(),
    title: 'components:advantages.list.first-item',
    'data-aos': 'fade-right',
    'data-aos-duration': '500',
  },
  {
    id: uuidv4(),
    title: 'components:advantages.list.second-item',
    icon: LeavesIcon,
    'data-aos': 'fade-right',
    'data-aos-duration': '800',
  },
  {
    id: uuidv4(),
    title: 'components:advantages.list.third-item',
    icon: DefenceIcon,
    'data-aos': 'fade-right',
    'data-aos-duration': '1000',
  },
];
// Menu lists
export const MENU_LIST = [
  {
    id: uuidv4(),
    key: '/books',
    href: '/books',
    icon: <BookOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.menu.books',
  },
  {
    id: uuidv4(),
    key: '/categories',
    href: '/categories',
    icon: <MailOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.menu.categories',
  },
  {
    id: uuidv4(),
    key: '/about-bookbag',
    href: '/about-bookbag',
    icon: <InfoCircleOutlined />,
    title: 'components:lists.menu.about-bookbag',
  },
];

export const PROFILE_DROPDOWN_LIST = [
  {
    id: uuidv4(),
    key: '/profile/added-books',
    href: '/profile/added-books',
    icon: <BookOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.my-books',
  },
  {
    id: uuidv4(),
    key: '/profile/sold-books',
    href: '/profile/sold-books',
    icon: <CarryOutOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.sold-books',
  },
  {
    id: uuidv4(),
    key: '/profile/bought-books',
    href: '/profile/bought-books',
    icon: <MoneyCollectOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.bought-books',
  },
  {
    id: uuidv4(),
    key: '/profile/liked-books',
    href: '/profile/liked-books',
    icon: <LikeOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.liked-books',
  },
  {
    id: uuidv4(),
    key: '/profile/my-messages',
    href: '/profile/my-messages',
    icon: <MessageOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.my-messages',
  },
  {
    id: uuidv4(),
    key: '/profile/setup-profile',
    href: '/profile/setup-profile',
    icon: <SettingOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.settings',
  },
  {
    id: uuidv4(),
    key: 'logout',
    href: 'logout',
    icon: <LogoutOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.logout',
  },
];

export const PROFILE_ASIDE_TOP_LIST = [
  {
    id: uuidv4(),
    key: '/profile/added-books',
    href: '/profile/added-books',
    icon: <BookOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.my-books',
  },
  {
    id: uuidv4(),
    key: '/profile/sold-books',
    href: '/profile/sold-books',
    icon: <CarryOutOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.sold-books',
  },
  {
    id: uuidv4(),
    key: '/profile/bought-books',
    href: '/profile/bought-books',
    icon: <MoneyCollectOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.bought-books',
  },
  {
    id: uuidv4(),
    key: '/profile/liked-books',
    href: '/profile/liked-books',
    icon: <LikeOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.liked-books',
  },
  {
    id: uuidv4(),
    key: '/profile/my-messages',
    href: '/profile/my-messages',
    icon: <MessageOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.my-messages',
  },
];

export const PROFILE_ASIDE_BOTTOM_LIST = [
  {
    id: uuidv4(),
    key: '/profile/setup-profile',
    href: '/profile/setup-profile',
    icon: <SettingOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.settings',
  },
  {
    id: uuidv4(),
    key: 'logout',
    href: 'logout',
    icon: <LogoutOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.logout',
  },
];

export const BOOK_SETTINGS_LIST = [
  {
    id: uuidv4(),
    key: 'edit',
    href: false,
    icon: <SettingOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.book-settings.edit',
  },
  {
    id: uuidv4(),
    key: 'liked',
    href: false,
    icon: <LikeOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.book-settings.liked',
  },
  {
    id: uuidv4(),
    key: 'sold',
    href: false,
    icon: <CarryOutOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.book-settings.sold',
  },
  {
    id: uuidv4(),
    key: 'delete',
    href: false,
    icon: <CloseOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.book-settings.delete',
  },
];

export const FOOTER_LINKS_LIST = [
  {
    id: uuidv4(),
    key: '/books',
    href: '/books',
    icon: <BookOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.footer.books',
  },
  {
    id: uuidv4(),
    key: '/about-bookbag',
    href: '/about-bookbag',
    icon: <InfoCircleOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.footer.about-bookbag',
  },
  {
    id: uuidv4(),
    key: false,
    href: false,
    icon: false,
    title: 'components:lists.footer.contact-email',
  },
];

export const FOOTER_CONTACTS_LIST = [
  {
    id: uuidv4(),
    key: false,
    href: false,
    icon: false,
    title: 'components:lists.footer.contact-number',
  },

  {
    id: uuidv4(),
    key: '/privacy-policy',
    href: '/privacy-policy',
    icon: <AlertOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.footer.privacy-policy',
  },
  {
    id: uuidv4(),
    key: '/terms-of-service',
    href: '/terms-of-service',
    icon: <AlertOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.footer.terms-of-service',
  },
];

export const RESTRICTED_PATHS = [
  { route: '/profile/added-books' },
  { route: '/profile/bought-books' },
  { route: '/profile/sold-books' },
  { route: '/profile/liked-books' },
  { route: '/profile/my-messages/[sid]' },
  { route: '/profile/setup-profile' },
  { route: '/profile/my-messages' },
];
export const ONLY_UNREGISTERED_PATHS = [
  { route: '/auth/login' },
  { route: '/auth/register' },
  { route: '/auth/forgot-password' },
  { route: '/auth/reset-password' },
];
