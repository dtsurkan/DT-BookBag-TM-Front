import { getSession } from 'next-auth/client';
import useCustomSwr from 'hooks/useCustomSwr';
import ProfileLayout from 'components/Layout/ProfileLayout';
import ProfileList from 'components/Lists/ProfileBooksList';
import { getUserAddedBooksSWR } from 'lib/swr/mutate/books';

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

const AddedBooks = ({ session }) => {
  const { response: addedBooks, isLoading } = useCustomSwr({
    url: getUserAddedBooksSWR(session?.profile?.id, ''),
  });

  return (
    <ProfileLayout>
      <ProfileList renderKey="additional-settings" books={addedBooks} isLoading={isLoading} />
    </ProfileLayout>
  );
};

export default AddedBooks;
