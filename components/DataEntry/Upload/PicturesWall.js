import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Form, message, Modal, Upload } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import DraggableUpload from './components/DraggableUpload';
import DraggerContent from './components/DraggerContent';
import { AddImageIcon } from 'components/Icons';
import { getStrapiMedia } from 'lib/strapi/shared/media';
import { getBase64 } from 'utils/FileReader';
import { DEFAULT_ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from 'utils/constants';

const PicturesWall = ({
  isDraggable = true,
  isDragger = true,
  // hasImageCrop = false,
  // form,
  allowedFileTypes = DEFAULT_ALLOWED_IMAGE_TYPES,
  maxFileSize = MAX_FILE_SIZE,
  name = 'upload',
  valuePropName = 'fileList',
  maxCount = 10,
  listType = 'picture-card',
  rules = [
    {
      required: true,
      message: 'components:data-entries.upload-error-required',
    },
  ],
  multiple = true,
  progress = { status: 'active' },
  uploadButton = <AddImageIcon />,
  draggerContent = <DraggerContent />,
  ...props
}) => {
  const { t } = useTranslation();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleClosePreview = () => setPreviewVisible(false);
  const translateRules = rules.map((rule) => ({ ...rule, message: t(rule.message) }));
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const uploadProps = {
    multiple,
    progress,
    maxCount,
    listType,
    accept: DEFAULT_ALLOWED_IMAGE_TYPES.join(', '),
    beforeUpload: (file) => {
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      // console.log(fileSizeInMB + "MB");
      if (!!maxFileSize && fileSizeInMB > maxFileSize) {
        message.error({
          content: t('components:data-entries.upload-file-size-rule', {
            fileName: file.name,
            maxFileSize,
          }),
          style: { zIndex: 1030 },
        });
      } else if (!!allowedFileTypes && !allowedFileTypes.includes(file?.type)) {
        message.error({
          content: t('components:data-entries.upload-file-size-rule', {
            fileName: file.name,
          }),
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
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    },
    onChange: ({ fileList }) => setFileList(fileList),
    isImageUrl: (file) => {
      file.url = getStrapiMedia(file.url);
      return file;
    },
    ...props,
  };

  const uploadDraggerChildren = isDragger
    ? draggerContent
    : fileList?.length < maxCount && uploadButton;

  return (
    <>
      <Form.Item
        name={name}
        valuePropName={valuePropName}
        getValueFromEvent={normFile}
        rules={rules.length ? translateRules : rules}
        style={{ margin: 0 }}
      >
        {isDraggable ? (
          <DraggableUpload {...uploadProps}>{uploadDraggerChildren}</DraggableUpload>
        ) : isDragger ? (
          <Dragger style={{ margin: '20px 0' }} height={200} {...uploadProps}>
            {uploadDraggerChildren}
          </Dragger>
        ) : (
          // <UploadWrapper hasImageCrop={hasImageCrop}>
          <Upload {...uploadProps}>{uploadDraggerChildren}</Upload>
          // </UploadWrapper>
        )}
      </Form.Item>
      <Modal
        zIndex={1021}
        centered
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleClosePreview}
      >
        <img alt={previewTitle} style={{ width: '100%' }} src={getStrapiMedia(previewImage)} />
      </Modal>
    </>
  );
};

export default PicturesWall;
