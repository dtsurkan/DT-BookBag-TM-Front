import { useShowConfigModal } from 'hooks';
import AppLayout from 'components/AppLayout/AppLayout';
import ConfigBookModal from 'components/Modals/ConfigBookModal';
import ContentComponent from 'components/AppLayout/ContentComponent';
import Intro from 'components/Sections/Intro';
import Advantages from 'components/Sections/Advantages';
import Opportunities from 'components/Sections/Opportunities';
import NewCollectionBooks from 'components/Sections/NewCollectionBooks';
import Subscribe from 'components/Sections/Subscribe';
import { getBooks } from 'lib/strapi/services/books';

const Home = ({ books = [] }) => {
  const {
    isConfigBookModal,
    showConfigBookModal,
    handleCancelConfigBookModal,
  } = useShowConfigModal();

  return (
    <>
      <AppLayout>
        <ContentComponent>
          <Intro showModal={showConfigBookModal} />
          <Advantages />
          <Opportunities />
          <NewCollectionBooks books={books} showModal={showConfigBookModal} />
          <Subscribe />
        </ContentComponent>
      </AppLayout>
      <ConfigBookModal visible={isConfigBookModal} onCancel={handleCancelConfigBookModal} />
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
