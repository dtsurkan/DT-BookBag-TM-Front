import { useRouter } from 'next/router';
import { isEmpty as _isEmpty } from 'lodash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileLayout from 'components/AppLayout/ProfileLayout';
import ProfileList from 'components/Lists/ProfileList';
import { getCurrentUserProfile } from 'state/actions/user/profile';

const AddedBooks = () => {
  const { profile } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const added_books =
    !_isEmpty(profile) && profile.added_books.filter((book) => book.book_status === 'added');

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
  // if (!profile) {
  //   router.push("/login");
  //   return null;
  // }
  return (
    <ProfileLayout>
      <ProfileList renderKey="additional-settings" books={!_isEmpty(profile) ? added_books : []} />
    </ProfileLayout>
  );
};

export default AddedBooks;
