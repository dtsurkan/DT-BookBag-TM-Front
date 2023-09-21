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

const BoughtBooks = () => {
  const [session] = useSession();
  console.log(`session`, session);
  const { response: bought_books, isLoading } = useCustomSwr({
    url: `/books?buyer.id=${session?.profile?.id}&book_status_ne=added`,
  });

  return (
    <ProfileLayout>
      <ProfileList
        listTitle="components:lists.profile.bought-books-title"
        renderKey="bought"
        books={bought_books}
        hasAddingBook={false}
        isLoading={isLoading}
      />
    </ProfileLayout>
  );
};

export default BoughtBooks;
