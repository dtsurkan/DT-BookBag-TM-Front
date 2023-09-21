import useCustomSwr from 'hooks/useCustomSwr';
import { getSession, useSession } from 'next-auth/client';
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

const LikedBooks = () => {
  const [session] = useSession();
  console.log(`session`, session);
  const { response: liked_books, isLoading } = useCustomSwr({
    url: `/users/${session?.profile.id}/liked-books`,
    token: session.jwt,
  });
  return (
    <ProfileLayout>
      <ProfileList
        listTitle="components:lists.profile.liked-books-title"
        renderKey="liked"
        books={liked_books}
        hasAddingBook={false}
        isLoading={isLoading}
      />
    </ProfileLayout>
  );
};

export default LikedBooks;
