import AntdProvider from "./AntdProvider";
import StoreProvider from "./StoreProvider";

const AppProviders = ({ children }) => {
  return (
    <StoreProvider>
      <AntdProvider>{children}</AntdProvider>
    </StoreProvider>
  );
};

export default AppProviders;
