import AppLayout from 'components/Layout/AppLayout';
import MainContent from 'components/Layout/MainContent';
import PageHeaderLogo from 'components/Layout/PageHeaderLogo';
// import Founders from 'components/Sections/Founders';
import AboutBookBag from 'components/Sections/AboutBookBag';

const AboutBookBagPage = () => {
  return (
    <AppLayout>
      <MainContent
        styles={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div data-aos="fade-right">
          <PageHeaderLogo
            avatar={false}
            isBackIcon={true}
            isClickable={true}
            title="components:buttons.return"
            style={{ padding: '0' }}
          />
        </div>
        <AboutBookBag />
        {/* <Founders /> */}
      </MainContent>
    </AppLayout>
  );
};
export const getServerSideProps = async () => {
  return { props: {} };
};

export default AboutBookBagPage;
