import { message } from "antd";

export const showStrapiErrors = (error) => {
  console.log(`error.response test`, error.response);
  switch (error.response.status) {
    case 429:
      error.response.data.message.forEach((item) =>
        item.messages.forEach((res) => message.error(res.message))
      );
      return error.response;
    default:
      return error.response;
  }
};
