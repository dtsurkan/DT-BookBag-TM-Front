import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/client';
import { Dropdown, message } from 'antd';
import { EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import MenuItems from 'components/Navigation/Menu/MenuItems';
import { handleAddBookToLikedBooks } from 'logics/books/liked-books';
import { deleteBook } from 'lib/strapi/services/books';
import { fetchSubscribedConversations } from 'lib/twilio-conversation/services/client';
import { deleteConversation } from 'lib/twilio-conversation/services/conversation';
import { BOOK_SETTINGS_LIST } from 'utils/constants';

const BookSettingsDropdown = ({
  book = {},
  menuList = BOOK_SETTINGS_LIST,
  showConfigBookModal = () => {},
  showInformModal = () => {},
  showCheckingUserModal = () => {},
  isVisibleDropdown = false,
  setIsVisibleDropdown = () => {},
  client,
}) => {
  const { t } = useTranslation();
  const [session] = useSession();
  const onClickMenuItem = async ({ key }) => {
    message.info(key);
    switch (key) {
      case 'edit':
        setIsVisibleDropdown(false);
        showConfigBookModal();
        break;
      case 'liked':
        setIsVisibleDropdown(false);
        await handleAddBookToLikedBooks(session, book, t);
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
            if (conversations?.items?.length) {
              conversations.items.forEach(async (conversation) => {
                if (conversation.channelState.attributes.bookSlug === book.slug) {
                  console.log(`conversation`, conversation);
                  const deletedConversation = await deleteConversation(conversation);
                  console.log(`deletedConversation`, deletedConversation);
                }
              });
            }
            await deleteBook(book.id, session?.jwt);
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
  );
};

export default BookSettingsDropdown;
