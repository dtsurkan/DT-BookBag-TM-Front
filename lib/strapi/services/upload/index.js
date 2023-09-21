import { deleteRequest, post } from 'lib/request';
import { convertToFormData } from 'utils/FileReader';
import { STRAPI_URL } from 'lib/constants';

export const uploadImagesToStrapi = (data) =>
  post(STRAPI_URL, '/upload', {
    contentType: 'multipart/form-data',
    authenticate: true,
    data: convertToFormData(data),
  });

export const deleteImageFromStrapi = (imageId) =>
  deleteRequest(STRAPI_URL, `/upload/files/${imageId}`, { authenticate: true });
