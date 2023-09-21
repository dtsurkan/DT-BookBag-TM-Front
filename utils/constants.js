import { v4 as uuidv4 } from "uuid";
import { DefenceIcon, LeavesIcon } from "components/Icons";

export const YOUR_ORIGIN_URL =
  process.env.NODE_ENV === "production"
    ? "https://bookbag-4c9a1.web.app"
    : "http://localhost:3000";

export const DEFAULT_ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/x-citrix-jpeg",
  "image/pjpeg",
  "image/png",
  "image/x-citrix-png",
  "image/x-png",
  "image/webp",
];
export const MAX_FILE_SIZE = 200;
export const SEARCH_CITY_DEBOUNCE_DELAY = 800;
export const SEARCH_BOOK_DEBOUNCE_DELAY = 400;

export const BOOK_CONDITION_LIST = [
  { value: "Новое", label: "Новое" },
  { value: "Идеальное", label: "Идеальное" },
  { value: "Xорошее", label: "Xорошее" },
  { value: "Среднее", label: "Среднее" },
  { value: "Плохое", label: "Плохое" },
  { value: "Ужасное", label: "Ужасное" },
];

export const LANGUAGE_LIST = [
  { value: "Украинский", label: "Украинский" },
  { value: "Русский", label: "Русский" },
  { value: "Английский", label: "Английский" },
  { value: "Польский", label: "Польский" },
  { value: "Итальянский", label: "Итальянский" },
  { value: "Нимецкий", label: "Нимецкий" },
];

// Note: price:ASC/DESC because of _sort: field:params (in documantation strapi)
export const PRICE_FILTER_LIST = [
  { value: "price:ASC", label: "От низкой к высокой" },
  { value: "price:DESC", label: "От високой к низкой" },
];

// Advantages list
export const ADVANTAGES_LIST = [
  { id: uuidv4(), title: "Гараздо дешевле чем в интернет-магазинах" },
  {
    id: uuidv4(),
    title: "Економие природных ресурсов на печать нових изданий",
    icon: LeavesIcon,
  },
  {
    id: uuidv4(),
    title: "Удобное и безопасное использование платформи",
    icon: DefenceIcon,
  },
];
