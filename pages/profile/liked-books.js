import useCustomSwr from 'hooks/useCustomSwr';
import { getSession } from 'next-auth/client';
import ProfileLayout from 'components/Layout/ProfileLayout';
import ProfileList from 'components/Lists/ProfileBooksList';
import { getUserLikedBooksSWR } from 'lib/swr/mutate/books';

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

const LikedBooks = ({ session }) => {
  const { response, isLoading } = useCustomSwr({
    url: getUserLikedBooksSWR(session?.profile.id, ''),
    token: session?.jwt,
  });
  const liked_books = response.map((item) => item.bookID);
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
