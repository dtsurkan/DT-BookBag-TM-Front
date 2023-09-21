import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import AppLayout from 'components/Layout/AppLayout';
import MainContent from 'components/Layout/MainContent';

const FacebookUserDataDeletionInstructions = () => {
  return (
    <AppLayout>
      <MainContent>
        <Title level={3}>Facebook Data Deletion Instructions URL</Title>{' '}
        <Paragraph>
          BookBag Login is a facebook login app and we do not save your personal data in our server.
          According to Facebook policy, we have to provide User Data Deletion Callback URL or Data
          Deletion Instructions URL.
        </Paragraph>
        <Paragraph>
          If you want to delete your activities for BookBag Login App, you can remove your
          information by following these steps:
        </Paragraph>
        <Paragraph>1. Go to your Facebook Account’s Setting & Privacy. Click “Settings”</Paragraph>
        <Paragraph>
          2. Look for “Apps and Websites” and you will see all of the apps and websites you linked
          with your Facebook.
        </Paragraph>
        <Paragraph>3. Search and Click “BookBag Login” in the search bar.</Paragraph>{' '}
        <Paragraph>4. Scroll and click “Remove”.</Paragraph>{' '}
        <Paragraph>5. Congratulations, you have succesfully removed your app activities.</Paragraph>
      </MainContent>
    </AppLayout>
  );
};

export default FacebookUserDataDeletionInstructions;
