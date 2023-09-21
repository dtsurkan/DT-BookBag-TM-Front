import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/client';
import useTwilioClient from 'hooks/useTwilioClient';
import useShowConfigModal from 'hooks/useShowConfigModal';
import AppLayout from 'components/Layout/AppLayout';
import MainContent from 'components/Layout/MainContent';
import { getBooks } from 'lib/strapi/services/books';
import Intro from 'components/Sections/Intro';
const DynamicAdvantages = dynamic(() => import('components/Sections/Advantages'));
const DynamicOpportunities = dynamic(() => import('components/Sections/Opportunities'));
const DynamicNewCollectionBooks = dynamic(() => import('components/Sections/NewCollectionBooks'));
const DynamicSubscribe = dynamic(() => import('components/Sections/Subscribe'));
const DynamicConfigBookModal = dynamic(() => import('components/Modals/ConfigBook'));

const Home = ({ books = [] }) => {
  const [session] = useSession();
  const {
    isConfigBookModal,
    showConfigBookModal,
    handleCancelConfigBookModal,
  } = useShowConfigModal();
  const { client } = useTwilioClient();
  return (
    <>
      <AppLayout>
        <MainContent>
          <Intro showModal={showConfigBookModal} />
          <DynamicAdvantages />
          <DynamicOpportunities />
          <DynamicNewCollectionBooks
            client={client}
            books={books}
            showModal={showConfigBookModal}
          />
          <DynamicSubscribe />
        </MainContent>
      </AppLayout>
      {session && (
        <DynamicConfigBookModal
          visible={isConfigBookModal}
          onCancel={handleCancelConfigBookModal}
        />
      )}
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const books = await getBooks();
  return {
    props: {
      books: books?.data ? books.data : [],
    },
    // revalidate: 1,
  };
};

export default Home;
