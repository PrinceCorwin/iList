import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

const SearchItem = ({ search, setSearch }) => {
  return (
    <form className="searchForm" onSubmit={e => e.preventDefault()}>
      <FormLabel>Search</FormLabel>
      <input
        type="text"
        id="search"
        role="searchbox"
        placeholder="Search Items"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
