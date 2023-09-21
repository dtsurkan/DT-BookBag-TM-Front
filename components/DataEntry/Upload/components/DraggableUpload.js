/* eslint-disable react/display-name */
import { memo } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Col, Row, Upload } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';

const grid = 8;
const getListStyle = (fileList, isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : '#f9f9f9',
  display: 'flex',
  // flexWrap: 'wrap',
  padding: fileList.length ? grid * 2 : 0,
  overflow: 'auto',
});
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 0,
  margin: 4,
  height: 104,
  width: 104,
  background: isDragging ? 'lightgreen' : '#f9f9f9',
  ...draggableStyle,
});

const DraggableUpload = memo(({ children, ...props }) => {
  const fileList = props.fileList || [];

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }
    const newFileList = reorder(fileList, source.index, destination.index);
    props.onChange({ fileList: newFileList });
  };

  const onRemove = (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    props.onChange({ fileList: newFileList });
  };

  return (
    <>
      <Row style={{ margin: '8px 0' }}>
        <Col xs={24}>
          <Dragger
            disabled={fileList?.length < props.maxCount ? false : true}
            showUploadList={false}
            height={200}
            {...props}
          >
            {children}
          </Dragger>
        </Col>
      </Row>
      {fileList && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={getListStyle(fileList, snapshot.isDraggingOver)}
              >
                {fileList.map((item, index) => {
                  // console.log(`props`, props);
                  return (
                    <Draggable key={item.uid} draggableId={item.uid} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          {/* Only for rendering images not uploading, so set up properties only for render */}
                          <Upload
                            fileList={[item]}
                            progress={props.progress}
                            listType={props.listType}
                            onPreview={props.onPreview}
                            isImageUrl={props.isImageUrl}
                            onRemove={onRemove}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
});

export default DraggableUpload;
