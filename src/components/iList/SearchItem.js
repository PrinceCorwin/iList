import { FaSearch } from 'react-icons/fa';
import {
  InputGroup,
  Icon,
  Input,
  FormControl,
  InputRightAddon,
} from '@chakra-ui/react';

const SearchItem = ({ search, setSearch }) => {
  return (
    <FormControl label="Search" onSubmit={e => e.preventDefault()}>
      <InputGroup size="sm">
        <Input
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
