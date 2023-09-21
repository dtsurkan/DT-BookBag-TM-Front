import axios from "axios";

const tryAxios = async (...args) => {
  try {
    return await axios(...args);
  } catch (error) {
    // throw error;
    console.log("error", error.response.data);
  }
};

export const request = (
  baseUrl,
  path,
  { contentType = "application/json", headers, ...other } = {}
) => {
  console.log("baseUrl", baseUrl);
  console.log("path", path);
  console.log("`${baseUrl}${path}`", `${baseUrl}${path}`);
  console.log("...other", other);
  return tryAxios(`${baseUrl}${path}`, {
    headers: {
      "content-type": contentType,
      ...headers,
    },
    ...other,
  });
};

export const get = (baseUrl, path, opts) =>
  request(baseUrl, path, { method: "get", ...opts });

export const post = (baseUrl, path, opts) =>
  request(baseUrl, path, { method: "post", ...opts });

export const deleteRequest = (baseUrl, path, opts) =>
  request(baseUrl, path, { method: "delete", ...opts });
