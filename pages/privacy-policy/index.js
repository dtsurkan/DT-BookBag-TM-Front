import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import AppLayout from 'components/Layout/AppLayout';
import MainContent from 'components/Layout/MainContent';

const PrivacyPolicy = () => {
  return (
    <AppLayout>
      <MainContent>
        <Title level={3}>Privacy Policy</Title>{' '}
        <Paragraph>
          built the BookBag app as an Open Source app. This SERVICE is provided by at no cost and is
          intended for use as is.
        </Paragraph>
        <Paragraph>
          This page is used to inform visitors regarding my policies with the collection, use, and
          disclosure of Personal Information if anyone decided to use my Service.
        </Paragraph>
        <Paragraph>
          If you choose to use my Service, then you agree to the collection and use of information
          in relation to this policy. The Personal Information that I collect is used for providing
          and improving the Service. I will not use or share your information with anyone except as
          described in this Privacy Policy.
        </Paragraph>
        <Paragraph>
          The terms used in this Privacy Policy have the same meanings as in our Terms and
          Conditions, which is accessible at BookBag unless otherwise defined in this Privacy
          Policy.
        </Paragraph>
        <Paragraph>
          <Title level={3}>Information Collection and Use</Title>
        </Paragraph>
        <Paragraph>
          For a better experience, while using our Service, I may require you to provide us with
          certain personally identifiable information. The information that I request will be
          retained on your device and is not collected by me in any way.
        </Paragraph>
        <Paragraph>
          The app does use third party services that may collect information used to identify you.
        </Paragraph>
        <Paragraph>
          Link to privacy policy of third party service providers used by the app
        </Paragraph>
        <Paragraph>
          <Title level={3}>Log Data</Title>
        </Paragraph>
        <Paragraph>
          I want to inform you that whenever you use my Service, in a case of an error in the app I
          collect data and information (through third party products) on your phone called Log Data.
          This Log Data may include information such as your device Internet Protocol (“IP”)
          address, device name, operating system version, the configuration of the app when
          utilizing my Service, the time and date of your use of the Service, and other statistics.
        </Paragraph>
        <Paragraph>
          <Title level={3}>Cookies</Title>
        </Paragraph>
        <Paragraph>
          Cookies are files with a small amount of data that are commonly used as anonymous unique
          identifiers. These are sent to your browser from the websites that you visit and are
          stored on your device's internal memory.
        </Paragraph>
        <Paragraph>
          This Service does not use these “cookies” explicitly. However, the app may use third party
          code and libraries that use “cookies” to collect information and improve their services.
          You have the option to either accept or refuse these cookies and know when a cookie is
          being sent to your device. If you choose to refuse our cookies, you may not be able to use
          some portions of this Service.
        </Paragraph>
        <Paragraph>
          <Title level={3}>Service Providers</Title>
        </Paragraph>
        <Paragraph>
          I may employ third-party companies and individuals due to the following reasons:
        </Paragraph>
        <ul>
          <li>To facilitate our Service;</li> <li>To provide the Service on our behalf;</li>{' '}
          <li>To perform Service-related services; or</li>{' '}
          <li>To assist us in analyzing how our Service is used.</li>
        </ul>{' '}
        <Paragraph>
          I want to inform users of this Service that these third parties have access to your
          Personal Information. The reason is to perform the tasks assigned to them on our behalf.
          However, they are obligated not to disclose or use the information for any other purpose.
        </Paragraph>
        <Paragraph>
          <Title level={3}>Security</Title>
        </Paragraph>
        <Paragraph>
          I value your trust in providing us your Personal Information, thus we are striving to use
          commercially acceptable means of protecting it. But remember that no method of
          transmission over the internet, or method of electronic storage is 100% secure and
          reliable, and I cannot guarantee its absolute security.
        </Paragraph>
        <Paragraph>
          <Title level={3}>Links to Other Sites</Title>
        </Paragraph>
        <Paragraph>
          This Service may contain links to other sites. If you click on a third-party link, you
          will be directed to that site. Note that these external sites are not operated by me.
          Therefore, I Titlely advise you to review the Privacy Policy of these websites. I have no
          control over and assume no responsibility for the content, privacy policies, or practices
          of any third-party sites or services.
        </Paragraph>
        <Paragraph>
          <Title level={3}>Children’s Privacy</Title>
        </Paragraph>
        <Paragraph>
          These Services do not address anyone under the age of 13. I do not knowingly collect
          personally identifiable information from children under 13 years of age. In the case I
          discover that a child under 13 has provided me with personal information, I immediately
          delete this from our servers. If you are a parent or guardian and you are aware that your
          child has provided us with personal information, please contact me so that I will be able
          to do necessary actions.
        </Paragraph>
        <Paragraph>
          <Title level={3}>Changes to This Privacy Policy</Title>
        </Paragraph>
        <Paragraph>
          I may update our Privacy Policy from time to time. Thus, you are advised to review this
          page periodically for any changes. I will notify you of any changes by posting the new
          Privacy Policy on this page.
        </Paragraph>
        <Paragraph>This policy is effective as of 2021-07-19</Paragraph>
        <Paragraph>
          <Title level={3}>Contact Us</Title>
        </Paragraph>
        <Paragraph>
          If you have any questions or suggestions about my Privacy Policy, do not hesitate to
          contact me at test@gmail.com.
        </Paragraph>
      </MainContent>
    </AppLayout>
  );
};

export default PrivacyPolicy;
