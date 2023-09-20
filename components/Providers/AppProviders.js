import StoreProvider from "./StoreProvider";

const AppProviders = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default AppProviders;
