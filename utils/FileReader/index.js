export const getBase64 = (file) => {
  // console.log("file", file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const convertToFormData = (files) => {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("files", file.originFileObj);
  });
  return formData;
};
