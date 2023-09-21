//THIS IS FAIL.  redux-persist failed to create sync storage. falling back to noop storage.
// This log occurs on the server-side (when you import storage from redux-persist/lib/storage) because you cannot create the local storage. Here is my workaround:

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
