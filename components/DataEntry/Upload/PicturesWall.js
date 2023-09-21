import { useState } from "react";
import { Form, message, Modal, Upload } from "antd";
import { AddImageIcon } from "components/Icons";
import { DEFAULT_ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from "utils/constants";
import { getBase64 } from "utils/FileReader";
import { getStrapiMedia } from "lib/strapi/shared/media";

const PicturesWall = ({
  form,
  allowedFileTypes = DEFAULT_ALLOWED_IMAGE_TYPES,
  maxFileSize = MAX_FILE_SIZE,
  name = "upload",
  valuePropName = "fileList",
  maxCount = 10,
  listType = "picture-card",
  rules = [],
  multiple = true,
  progress = { status: "active" },
  ...props
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleClosePreview = () => setPreviewVisible(false);

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const uploadProps = {
    maxCount,
    listType,
    beforeUpload: (file) => {
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      // console.log(fileSizeInMB + "MB");
      if (!!maxFileSize && fileSizeInMB > maxFileSize) {
        message.error({
          content: `File ${file.name} must be less than ${maxFileSize}MB`,
          style: { zIndex: 1030 },
        });
      } else if (!!allowedFileTypes && !allowedFileTypes.includes(file?.type)) {
        message.error({
          content: `File type of ${file.name} not supported`,
          style: { zIndex: 1030 },
        });
      }
      return allowedFileTypes.includes(file?.type) && fileSizeInMB < maxFileSize
        ? true
        : Upload.LIST_IGNORE;
    },
    onPreview: async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    },
    onChange: ({ fileList }) => setFileList(fileList),
    isImageUrl: (file) => {
      file.url = getStrapiMedia(file.url);
      return file;
    },
  };

  const uploadButton = (
    <div>
      <AddImageIcon style={{ fontSize: "50px" }} />
    </div>
  );
  return (
    <>
      <Form.Item
        name={name}
        valuePropName={valuePropName}
        getValueFromEvent={normFile}
        rules={[
          {
            required: true,
            message: "Загрузите хотя бы одну фото книги!",
          },
        ]}
      >
        <Upload multiple={multiple} progress={progress} {...uploadProps}>
          {fileList.length >= 10 ? null : uploadButton}
        </Upload>
      </Form.Item>
      <Modal
        zIndex={1021}
        centered
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleClosePreview}
      >
        <img
          alt={previewTitle}
          style={{ width: "100%" }}
          src={getStrapiMedia(previewImage)}
        />
      </Modal>
    </>
  );
};

export default PicturesWall;
