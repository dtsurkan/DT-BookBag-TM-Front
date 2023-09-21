import { getSession } from 'next-auth/client';
import useCustomSwr from 'hooks/useCustomSwr';
import ProfileLayout from 'components/Layout/ProfileLayout';
import ProfileList from 'components/Lists/ProfileBooksList';
import { getUserBoughtBooksSWR } from 'lib/swr/mutate/books';

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

const BoughtBooks = ({ session }) => {
  const { response: bought_books, isLoading } = useCustomSwr({
    url: getUserBoughtBooksSWR(session?.profile?.id, ''),
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
