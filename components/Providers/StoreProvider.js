import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "../../state/store";

const StoreProvider = ({ children }) => {
  //   console.log("pageProps", pageProps);
  //   console.log("pageProps.initialReduxState", pageProps.initialReduxState);
  //   const store = useStore(pageProps.initialReduxState);
  const store = useStore();
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
