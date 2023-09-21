import useSWR from 'swr';
import { STRAPI_URL } from 'lib/constants';

const useCustomSwr = ({
  baseURL = STRAPI_URL,
  url = '/books',
  token = false,
  extraSwrOpts = {},
  shouldFetch = true,
}) => {
  // console.log(`extraSwrOpts`, { ...extraSwrOpts });
  const { data, error, mutate, isValidating } = useSWR(
    shouldFetch ? [`${STRAPI_URL}${url}`, token] : null,
    {
      ...extraSwrOpts,
    }
  );

  return {
    response: data ? data : [],
    isLoading: (!error && !data) || isValidating,
    isError: error,
    mutate,
    isValidating,
  };
};

export default useCustomSwr;
