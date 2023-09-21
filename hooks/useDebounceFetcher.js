import { useMemo, useState } from 'react';
import { debounce as _debounce } from 'lodash';

export const useDebounceFetcher = (fetchOptions, debounceTimeout) => {
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      // setOptions([]);
      setIsFetching(true);
      try {
        fetchOptions(value).then((newOptions) => {
          setOptions(newOptions);
          setIsFetching(false);
        });
      } catch (error) {
        console.log('error', error);
        setIsFetching(false);
      }
    };
    return _debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return [options, isFetching, debounceFetcher];
};
