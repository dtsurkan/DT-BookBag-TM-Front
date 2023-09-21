import { SWRConfig } from 'swr';
import axios from 'axios';

const SwrProvider = ({ children }) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: (url, token) => {
          console.log(`url SwrProvider SwrProvider`, url);
          return axios
            .get(url, { headers: { Authorization: token ? 'Bearer ' + token : '' } })
            .then((res) => res.data);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrProvider;
