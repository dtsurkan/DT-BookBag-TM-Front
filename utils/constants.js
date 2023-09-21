import { v4 as uuidv4 } from 'uuid';
import LeavesIcon from 'components/Icons/LeavesIcon';
import DefenceIcon from 'components/Icons/DefenceIcon';
import {
  AlertOutlined,
  BookOutlined,
  CarryOutOutlined,
  CloseOutlined,
  DeliveredProcedureOutlined,
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

export const getProfileDropdownList = ({ processingBooksCount = 0, messagesCount = 0 }) => [
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
    key: '/profile/processing-books',
    href: '/profile/processing-books',
    icon: <DeliveredProcedureOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.processing-books',
    hasBadge: true,
    count: processingBooksCount,
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
    hasBadge: true,
    count: messagesCount,
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

export const getProfileAsideTopList = ({ processingBooksCount = 0, messagesCount = 0 }) => [
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
    key: '/profile/processing-books',
    href: '/profile/processing-books',
    icon: <DeliveredProcedureOutlined style={{ fontSize: 18 }} />,
    title: 'components:lists.profile.processing-books',
    hasBadge: true,
    count: processingBooksCount,
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
    hasBadge: true,
    count: messagesCount,
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
  { route: '/profile/processing-books' },
  { route: '/profile/sold-books' },
  { route: '/profile/liked-books' },
  { route: '/profile/my-messages/[sid]' },
  { route: '/profile/setup-profile' },
  { route: '/profile/my-messages' },
  { route: '/books/[slug]/chat' },
];
export const ONLY_UNREGISTERED_PATHS = [
  { route: '/auth/login' },
  { route: '/auth/register' },
  { route: '/auth/forgot-password' },
  { route: '/auth/reset-password' },
];

export const PRIVACY_POLICY = [
  {
    id: uuidv4(),
    title: 'components:privacy-policy.title',
    paragraphs: [
      'components:privacy-policy.first-paragraph',
      'components:privacy-policy.second-paragraph',
      'components:privacy-policy.third-paragraph',
    ],
  },
  {
    id: uuidv4(),
    title: 'components:privacy-policy.agreement.title',
    paragraphs: ['components:privacy-policy.agreement.first-paragraph'],
  },
  {
    id: uuidv4(),
    title: 'components:privacy-policy.info-collection.title',
    paragraphs: [
      'components:privacy-policy.info-collection.first-paragraph',
      'components:privacy-policy.info-collection.second-paragraph',
      'components:privacy-policy.info-collection.third-paragraph',
    ],
  },
  {
    id: uuidv4(),
    title: 'components:privacy-policy.use-info.title',
    paragraphs: ['components:privacy-policy.use-info.first-paragraph'],
    list: [
      'components:privacy-policy.use-info.list.first',
      'components:privacy-policy.use-info.list.second',
      'components:privacy-policy.use-info.list.third',
      'components:privacy-policy.use-info.list.fourth',
      'components:privacy-policy.use-info.list.fifth',
      'components:privacy-policy.use-info.list.sixth',
      'components:privacy-policy.use-info.list.seventh',
    ],
  },
  {
    id: uuidv4(),
    title: 'components:privacy-policy.logs.title',
    paragraphs: ['components:privacy-policy.logs.first-paragraph'],
  },
  {
    id: uuidv4(),
    title: 'components:privacy-policy.cookies.title',
    paragraphs: [
      'components:privacy-policy.cookies.first-paragraph',
      'components:privacy-policy.cookies.second-paragraph',
    ],
  },
  {
    id: uuidv4(),
    title: 'components:privacy-policy.ads.title',
    paragraphs: [
      'components:privacy-policy.ads.first-paragraph',
      'components:privacy-policy.ads.second-paragraph',
      'components:privacy-policy.ads.third-paragraph',
    ],
  },
  {
    id: uuidv4(),
    title: 'components:privacy-policy.third-party.title',
    paragraphs: ['components:privacy-policy.third-party.first-paragraph'],
  },
  {
    id: uuidv4(),
    title: 'components:privacy-policy.ccpa-privacy.title',
    paragraphs: [
      'components:privacy-policy.ccpa-privacy.first-paragraph',
      'components:privacy-policy.ccpa-privacy.second-paragraph',
      'components:privacy-policy.ccpa-privacy.third-paragraph',
      'components:privacy-policy.ccpa-privacy.fourth-paragraph',
      'components:privacy-policy.ccpa-privacy.fifth-paragraph',
      'components:privacy-policy.ccpa-privacy.sixth-paragraph',
      'components:privacy-policy.ccpa-privacy.seventh-paragraph',
      'components:privacy-policy.ccpa-privacy.eithth-paragraph',
    ],
  },
  {
    id: uuidv4(),
    title: 'components:privacy-policy.clild-info.title',
    paragraphs: [
      'components:privacy-policy.clild-info.first-paragraph',
      'components:privacy-policy.clild-info.second-paragraph',
    ],
  },
];

export const TERMS_OF_USE = [
  {
    id: uuidv4(),
    title: 'components:terms-of-use.title',
  },
  {
    id: uuidv4(),
    title: 'components:terms-of-use.conditions.title',
    paragraphs: ['components:terms-of-use.conditions.first-paragraph'],
  },
  {
    id: uuidv4(),
    title: 'components:terms-of-use.use-licence.title',
    paragraphs: [
      'components:terms-of-use.use-licence.first-paragraph',
      'components:terms-of-use.use-licence.second-paragraph',
    ],
    list: [
      'components:terms-of-use.use-licence.list.first',
      'components:terms-of-use.use-licence.list.second',
      'components:terms-of-use.use-licence.list.third',
      'components:terms-of-use.use-licence.list.fourth',
      'components:terms-of-use.use-licence.list.fifth',
    ],
  },
  {
    id: uuidv4(),
    title: 'components:terms-of-use.disclaimer.title',
    paragraphs: ['components:terms-of-use.disclaimer.first-paragraph'],
  },
  {
    id: uuidv4(),
    title: 'components:terms-of-use.limitations.title',
    paragraphs: ['components:terms-of-use.limitations.first-paragraph'],
  },
  {
    id: uuidv4(),
    title: 'components:terms-of-use.revisions.title',
    paragraphs: ['components:terms-of-use.revisions.first-paragraph'],
  },
  {
    id: uuidv4(),
    title: 'components:terms-of-use.links.title',
    paragraphs: ['components:terms-of-use.links.first-paragraph'],
  },
  {
    id: uuidv4(),
    title: 'components:terms-of-use.modifications.title',
    paragraphs: ['components:terms-of-use.modifications.first-paragraph'],
  },
  {
    id: uuidv4(),
    title: 'components:terms-of-use.privacy.title',
    paragraphs: ['components:terms-of-use.privacy.first-paragraph'],
  },
  {
    id: uuidv4(),
    title: 'components:terms-of-use.governing-law.title',
    paragraphs: ['components:terms-of-use.governing-law.first-paragraph'],
  },
];
