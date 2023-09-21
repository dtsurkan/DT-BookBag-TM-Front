import MainSelectSearch from "./MainSelectSearch";
import { useDebounceFetcher } from "hooks";
import { SEARCH_CITY_DEBOUNCE_DELAY } from "utils/constants";

const DebounceSelectSearch = ({
  dataEntryComponent: DataEntryComponent = MainSelectSearch,
  fetchOptions,
  debounceTimeout = SEARCH_CITY_DEBOUNCE_DELAY,
  ...props
}) => {
  const [options, isFetching, debounceFetcher] = useDebounceFetcher(
    fetchOptions,
    debounceTimeout
  );

  return (
    <DataEntryComponent
      isFetching={isFetching}
      onSearch={debounceFetcher}
      options={options}
      {...props}
    />
  );
};

export default DebounceSelectSearch;
