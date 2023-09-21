import { message } from 'antd';
import {
  BAD_REQUEST,
  FORBIDDEN,
  METHOD_NOT_ALLOWED,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from 'lib/constants';

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

export const checkErrorCode = (errorCode) =>
  [BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, METHOD_NOT_ALLOWED, TOO_MANY_REQUESTS].includes(
    errorCode
  );
