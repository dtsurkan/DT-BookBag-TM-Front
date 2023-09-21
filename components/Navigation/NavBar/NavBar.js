import { useTheme } from 'react-jss';
import { useMediaQuery } from 'react-responsive';
import DesktopHeader from 'components/Navigation/Desktop/DesktopHeader';
import MobileHeader from 'components/Navigation/Mobile/MobileHeader';

const NavBar = () => {
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery({ maxWidth: theme.breakpoints.xl });

  return <>{isTabletOrMobile ? <MobileHeader /> : <DesktopHeader />}</>;
};

export default NavBar;
