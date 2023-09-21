import AppLayout from 'components/Layout/AppLayout';
import MainContent from 'components/Layout/MainContent';
import TermsPolicies from 'components/Sections/TermsPolicies';
import { PRIVACY_POLICY } from 'utils/constants';

const PrivacyPolicy = () => {
  return (
    <AppLayout>
      <MainContent>
        <TermsPolicies list={PRIVACY_POLICY} />
      </MainContent>
    </AppLayout>
  );
};

export default PrivacyPolicy;
