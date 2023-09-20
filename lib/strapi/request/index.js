import axios from "axios";

const tryAxios = async (...args) => {
  try {
    return await axios(...args);
  } catch (error) {
    throw error;
  }
};

export const request = (
  path,
  { contentType = "application/json", headers, ...other } = {}
) => {
  return tryAxios(
    `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${path}`,
    {
      headers: {
        // "content-type": "application/json",
        "content-type": contentType,
        ...headers,
      },
      ...other,
    }
  );
};

export const get = (path, opts) => request(path, { method: "get", ...opts });

export const post = (path, opts) => request(path, { method: "post", ...opts });

export const deleteRequest = (path, opts) =>
  request(path, { method: "delete", ...opts });
