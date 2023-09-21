import { useState } from "react";
import { Form, message, Modal, Upload } from "antd";
import { AddImageIcon } from "components/Icons";
import { DEFAULT_ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from "utils/constants";
import { getBase64 } from "utils/FileReader";

const PicturesWall = ({
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
  const getFiles = ({ fileList: newFileList }) => {
    // file.status is empty when beforeUpload return false
    const filteredFileList = newFileList.filter((file) => !!file.status);
    // console.log("filteredFileList", filteredFileList);
    setFileList(filteredFileList);
    return filteredFileList;
  };
  const uploadProps = {
    maxCount,
    listType,
    beforeUpload: (file) => {
      // console.log("file", file);
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      // console.log(fileSizeInMB + "MB");
      if (!!maxFileSize && fileSizeInMB > maxFileSize) {
        message.error(`File ${file.name} must be less than ${maxFileSize}MB`);
      } else if (!!allowedFileTypes && !allowedFileTypes.includes(file?.type)) {
        message.error(`File type of ${file.name} not supported`);
      }
      return (
        allowedFileTypes.includes(file?.type) && fileSizeInMB < maxFileSize
      );
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
        getValueFromEvent={getFiles}
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
        centered
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleClosePreview}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default PicturesWall;
