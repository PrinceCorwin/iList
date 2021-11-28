import { FaSearch } from 'react-icons/fa';
import {
  InputGroup,
  Center,
  Icon,
  Input,
  FormControl,
  InputRightAddon,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

// import { Search2Icon, AddIcon, WarningIcon } from '@chakra-ui/icons';
const SearchItem = ({ search, setSearch }) => {
  return (
    <FormControl label="Search" onSubmit={e => e.preventDefault()}>
      {/* <FormLabel>Search</FormLabel> */}
      <InputGroup size="sm">
        <Input
          // size="sm"
          // variant="filled"
          type="text"
          id="search"
          role="searchbox"
          placeholder="Search Items"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <InputRightAddon
          size="sm"
          children={<Icon color="teal" as={FaSearch} />}
        />
      </InputGroup>
    </FormControl>
  );
};

export default SearchItem;
