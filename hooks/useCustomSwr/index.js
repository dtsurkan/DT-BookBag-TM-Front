import useSWR from 'swr';
import { STRAPI_URL } from 'lib/constants';

const useCustomSwr = ({
  baseURL = STRAPI_URL,
  url = '/books',
  token = false,
  extraSwrOpts = {},
}) => {
  console.log(`extraSwrOpts`, { ...extraSwrOpts });
  const { data, error, mutate, isValidating } = useSWR([`${STRAPI_URL}${url}`, token], {
    ...extraSwrOpts,
  });

  return {
    response: data ? data : [],
    isLoading: (!error && !data) || isValidating,
    isError: error,
    mutate,
    isValidating,
  };
};

export default useCustomSwr;
