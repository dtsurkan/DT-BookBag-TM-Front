import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

const Burger = ({
  isVisible = false,
  handleTriggerMenuDrawer = () => {},
  styles = {
    fontSize: '25px',
    cursor: 'pointer',
    color: '#01504d',
    marginRight: '16px',
  },
}) => {
  return (
    <>
      {isVisible ? (
        <CloseOutlined style={styles} onClick={handleTriggerMenuDrawer} />
      ) : (
        <MenuOutlined style={styles} onClick={handleTriggerMenuDrawer} />
      )}
    </>
  );
};

export default Burger;
