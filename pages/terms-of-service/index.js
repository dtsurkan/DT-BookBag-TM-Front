import AppLayout from 'components/Layout/AppLayout';
import MainContent from 'components/Layout/MainContent';
import TermsPolicies from 'components/Sections/TermsPolicies';
import { TERMS_OF_USE } from 'utils/constants';

const TermsOfService = () => {
  return (
    <AppLayout>
      <MainContent>
        <TermsPolicies list={TERMS_OF_USE} />
      </MainContent>
    </AppLayout>
  );
};

export default TermsOfService;
