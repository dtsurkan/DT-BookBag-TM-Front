import { getImageExtensionByType } from 'utils/functions';

export const getBase64 = (file) => {
  // console.log("file", file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// NOTE. Antd design upload component has automatically uid property, then request to strapi and uid dissappeared(via koa-body/formidable library). In frontend we have draggable upload objects,
// and it's necessary to replace local file to strapi file in the same position, so I fixed via changing name property to uid filling and uuid field also exists for keys in frontend.
export const convertToFormData = (files) => {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    // Be attentive hera! It's so-so solution, because File Object doesn't have setter, only getter
    const ext = getImageExtensionByType(file.originFileObj.type);
    const newFile = new File([file.originFileObj], `${file.originFileObj.uid}${ext}`, {
      type: file.originFileObj.type,
    });
    formData.append('files', newFile);
  });
  return formData;
};
