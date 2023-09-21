import { getSession } from 'next-auth/client';
import useCustomSwr from 'hooks/useCustomSwr';
import ProfileLayout from 'components/Layout/ProfileLayout';
import ProfileList from 'components/Lists/ProfileBooksList';
import { getUserSoldBooksSWR } from 'lib/swr/mutate/books';

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

const SoldBooks = ({ session }) => {
  const { response: sold_books, isLoading } = useCustomSwr({
    url: getUserSoldBooksSWR(session?.profile?.id, ''),
  });

  return (
    <ProfileLayout>
      <ProfileList
        listTitle="components:lists.profile.sold-books-title"
        renderKey="sold"
        books={sold_books}
        isLoading={isLoading}
        hasAddingBook={false}
      />
    </ProfileLayout>
  );
};

export default SoldBooks;
