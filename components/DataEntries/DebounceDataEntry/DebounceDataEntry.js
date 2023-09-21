import MainSelectSearch from '../Main/MainSelectSearch/MainSelectSearch';
import useDebounceFetcher from 'hooks/useDebounceFetcher';
import { SEARCH_CITY_DEBOUNCE_DELAY } from 'utils/constants';

const DebounceDataEntry = ({
  dataEntryComponent: DataEntryComponent = MainSelectSearch,
  fetchOptions,
  debounceTimeout = SEARCH_CITY_DEBOUNCE_DELAY,
  hasAdditionalOptions = false,
  additionalOption,
  ...props
}) => {
  const [options, isFetching, debounceFetcher] = useDebounceFetcher(fetchOptions, debounceTimeout);
  // NOTE! This checking for custom adding book_name to select options when doesn't find with Google Books API
  const customOptions = options
    ? [hasAdditionalOptions && additionalOption, ...options]
    : [hasAdditionalOptions && additionalOption];
  return (
    <DataEntryComponent
      isFetching={isFetching}
      onSearch={debounceFetcher}
      options={hasAdditionalOptions ? customOptions : options}
      {...props}
    />
  );
};

export default DebounceDataEntry;
