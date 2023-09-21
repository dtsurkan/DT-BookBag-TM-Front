import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty as _isEmpty } from 'lodash';
import ProfileLayout from 'components/AppLayout/ProfileLayout';
import ProfileList from 'components/Lists/ProfileList';
import { getCurrentUserProfile } from 'state/actions/user/profile';

const BoughtBooks = () => {
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

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
      <ProfileList listTitle="Куплені книги" renderKey="sold" books={[]} hasAddingBook={false} />
    </ProfileLayout>
  );
};

export default BoughtBooks;
