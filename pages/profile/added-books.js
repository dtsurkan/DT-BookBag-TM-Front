import { getSession, useSession } from 'next-auth/client';
import useCustomSwr from 'hooks/useCustomSwr';
import ProfileLayout from 'components/Layout/ProfileLayout';
import ProfileList from 'components/Lists/ProfileBooksList';

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
    props: {},
  };
}

const AddedBooks = () => {
  const [session] = useSession();
  console.log(`session`, session);
  const { response: addedBooks, isLoading } = useCustomSwr({
    url: `/books?seller.id=${session?.profile?.id}&book_status=added`,
  });

  return (
    <ProfileLayout>
      <ProfileList renderKey="additional-settings" books={addedBooks} isLoading={isLoading} />
    </ProfileLayout>
  );
};

export default AddedBooks;
