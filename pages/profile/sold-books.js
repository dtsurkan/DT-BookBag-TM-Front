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

const SoldBooks = () => {
  const [session] = useSession();
  console.log(`session`, session);
  const { response: sold_books, isLoading } = useCustomSwr({
    url: `/books?seller.id=${session?.profile?.id}&book_status_ne=added`,
    token: session.jwt,
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
