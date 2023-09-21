import { getSession } from 'next-auth/client';
import useCustomSwr from 'hooks/useCustomSwr';
import ProfileLayout from 'components/Layout/ProfileLayout';
import ProfileList from 'components/Lists/ProfileBooksList';
import { getUserProcessingBooksSWR } from 'lib/swr/mutate/books';

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

const ProcessingBooks = ({ session }) => {
  const { response: processing_books, isLoading } = useCustomSwr({
    url: getUserProcessingBooksSWR(session?.profile?.id, ''),
  });

  return (
    <ProfileLayout>
      <ProfileList
        listTitle="components:lists.profile.processing-books-title"
        renderKey="processing"
        books={processing_books}
        hasAddingBook={false}
        isLoading={isLoading}
      />
    </ProfileLayout>
  );
};

export default ProcessingBooks;
