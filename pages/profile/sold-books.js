import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty as _isEmpty } from 'lodash';
import ProfileLayout from 'components/AppLayout/ProfileLayout';
import ProfileList from 'components/Lists/ProfileList';
import { getCurrentUserProfile } from 'state/actions/user/profile';

const SoldBooks = () => {
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const sold_books = !_isEmpty(profile)
    ? profile.added_books.filter((book) => book.book_status === 'sold')
    : [];

  useEffect(() => {
    if (profile?.id) {
      dispatch(getCurrentUserProfile(profile?.id));
    }
  }, [profile.id, dispatch]);

  useEffect(() => {
    if (_isEmpty(profile)) {
      router.push('/login');
    }
  }, [profile, router]);

  //   if (!profile) {
  //     router.push("/login");
  //     return null;
  //   }
  return (
    <ProfileLayout>
      <ProfileList
        listTitle="Продані книги"
        renderKey="sold"
        books={sold_books}
        hasAddingBook={false}
      />
    </ProfileLayout>
  );
};

export default SoldBooks;
