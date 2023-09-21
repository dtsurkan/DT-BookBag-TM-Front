import { deleteRequest, post } from 'lib/request';
import { convertToFormData } from 'utils/FileReader';
import { STRAPI_URL } from 'lib/constants';

export const uploadImagesToStrapi = (data, token) =>
  post(STRAPI_URL, '/upload', {
    contentType: 'multipart/form-data',
    authenticate: true,
    token,
    data: convertToFormData(data),
  });

export const deleteImageFromStrapi = (imageId, token) =>
  deleteRequest(STRAPI_URL, `/upload/files/${imageId}`, { authenticate: true, token });
