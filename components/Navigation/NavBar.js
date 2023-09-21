import { useMediaQuery } from 'react-responsive';
import DesktopHeader from './components/DesktopHeader';
import MobileHeader from './components/MobileHeader';

const NavBar = () => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1200 });

  return <>{isTabletOrMobile ? <MobileHeader /> : <DesktopHeader />}</>;
};

export default NavBar;
