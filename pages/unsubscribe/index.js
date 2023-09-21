import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { message } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import MainContent from 'components/Layout/MainContent';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';
import { toggleSubscribeByTokenOnNewBooks } from 'lib/strapi/services/subscriptions';
import { checkErrorCode } from 'lib/strapi/shared/errors';

const Unsubscribe = () => {
  const router = useRouter();
  const [isUnsubscribeOneNewBooks, setIsUnsubscribeOneNewBooks] = useState(false);
  const handleUnsubscribeOnNewBooks = async () => {
    setIsUnsubscribeOneNewBooks(true);
    try {
      const res = await toggleSubscribeByTokenOnNewBooks(router.query.token, true);
      console.log(`data`, res);
      if (!checkErrorCode(res.status)) {
        message.success('You have successfully been subscribed');
      } else {
        message.error('Wrong token');
      }
      setIsUnsubscribeOneNewBooks(false);
    } catch (error) {
      setIsUnsubscribeOneNewBooks(false);
    }
  };
  useEffect(() => {
    const unsubscribe = async () => {
      setIsUnsubscribeOneNewBooks(true);
      try {
        const res = await toggleSubscribeByTokenOnNewBooks(router.query.token, false);
        console.log(`data`, res);
        if (!checkErrorCode(res.status)) {
          message.success('You have successfully been unsubscribed');
        } else {
          message.error('Wrong token');
        }
        setIsUnsubscribeOneNewBooks(false);
      } catch (error) {
        setIsUnsubscribeOneNewBooks(false);
      }
    };
    if (router?.query?.token) {
      unsubscribe();
    }
  }, [router?.query?.token]);
  return (
    <MainSpinner spinning={isUnsubscribeOneNewBooks}>
      <MainContent
        extraStyles={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          paddingTop: 0,
        }}
      >
        <div>
          <Title level={3}>Керування Вашими підписками</Title>
          <Paragraph>
            Тут Ви можете відписатися від розсилок, які існують на цьому сервісі.
          </Paragraph>
          <PrimaryButton
            onClick={handleUnsubscribeOnNewBooks}
            isBlock={false}
            btnText="Ви можете натиснути тут, щоб повторно підписатися на нові книги"
          />
        </div>
      </MainContent>
    </MainSpinner>
  );
};

export default Unsubscribe;
