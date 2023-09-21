import { useState } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from 'state/store';
import CenteredLottieWrapper from 'components/Lottie/CenteredLottieWrapper';
import booksLoadingLottie from 'lotties/redux-persist-loading.json';

const StoreProvider = ({ children }) => {
  //   console.log("pageProps", pageProps);
  //   console.log("pageProps.initialReduxState", pageProps.initialReduxState);
  //   const store = useStore(pageProps.initialReduxState);
  const store = useStore();
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  const [gateLifted, setGateLifted] = useState(false);
  const onBeforeLift = () => {
    // Take an action before the gate lifts
    setTimeout(() => {
      setGateLifted(true);
    }, 3000);
  };
  return (
    <Provider store={store}>
      <PersistGate onBeforeLift={onBeforeLift} persistor={persistor}>
        {gateLifted ? children : <CenteredLottieWrapper lottieData={booksLoadingLottie} />}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
