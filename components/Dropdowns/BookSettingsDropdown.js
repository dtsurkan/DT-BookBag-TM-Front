import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Dropdown, message } from 'antd';
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import MenuItems from 'components/Navigation/components/MenuItems';
import { BOOK_SETTINGS_LIST } from 'utils/constants';
import { addBookToLikedBooks } from 'state/actions/user/profile';
import { deleteBook } from 'lib/strapi/services/books';
import classes from 'styles/scss/components/buttons.module.scss';
import { fetchSubscribedConversations } from 'lib/twilio-conversation/services/client';
import { deleteConversation } from 'lib/twilio-conversation/services/conversation';

const BookSettingsDropdown = ({
  book = {},
  menuList = BOOK_SETTINGS_LIST,
  showConfigBookModal = () => {},
  showInformModal = () => {},
  showCheckingUserModal = () => {},
  client,
}) => {
  const { t } = useTranslation();
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
  const onClickMenuItem = async ({ key }) => {
    message.info(key);
    switch (key) {
      case 'edit':
        setIsVisibleDropdown(false);
        showConfigBookModal();
        break;
      case 'liked':
        setIsVisibleDropdown(false);
        await dispatch(addBookToLikedBooks(profile.id, book, t));
        break;
      case 'sold':
        setIsVisibleDropdown(false);
        showCheckingUserModal();
        break;
      case 'delete':
        confirm({
          centered: true,
          title: t('components:confirm.confirm-delete-book'),
          icon: <ExclamationCircleOutlined />,
          okText: t('components:general.yes'),
          okType: 'danger',
          //   because dropdown z-index === 1050
          zIndex: 1100,
          cancelText: t('components:general.no'),
          async onOk() {
            // NOTE! In future wiil change
            const conversations = await fetchSubscribedConversations(client);
            console.log(`conversations`, conversations);
            if (conversations.items.length) {
              conversations.items.forEach(async (conversation) => {
                if (conversation.channelState.attributes.bookSlug === book.slug) {
                  console.log(`conversation`, conversation);
                  const deletedConversation = await deleteConversation(conversation);
                  console.log(`deletedConversation`, deletedConversation);
                }
              });
            }
            await deleteBook(book.id);
            showInformModal();
          },
          onCancel() {
            message.info('Cancel');
          },
        });
        break;
      default:
        setIsVisibleDropdown(false);
        break;
    }
  };
  return (
    <div
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
      role="button"
      tabIndex="0"
      className={classNames(classes.dropdownBtn, {
        [classes.active]: isVisibleDropdown,
      })}
    >
      <Dropdown.Button
        visible={isVisibleDropdown}
        onVisibleChange={(flag) => setIsVisibleDropdown(flag)}
        trigger={['click']}
        type="text"
        overlay={
          <MenuItems
            menuList={menuList}
            hasSelectedKeys={false}
            hasCustomOnClick={true}
            customOnClick={onClickMenuItem}
          />
        }
        icon={
          <EllipsisOutlined
            style={{
              color: 'green',
              fontSize: '32px',
              fontWeight: '700',
            }}
          />
        }
      />
    </div>
  );
};

export default BookSettingsDropdown;
