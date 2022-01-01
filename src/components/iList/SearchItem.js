import { FaSearch } from 'react-icons/fa';
import {
  InputGroup,
  Icon,
  Input,
  FormControl,
  InputRightAddon,
} from '@chakra-ui/react';

const SearchItem = ({ themeObj, search, setSearch }) => {
  return (
    <FormControl label="Search" onSubmit={e => e.preventDefault()}>
      <InputGroup size="sm">
        <Input
          type="text"
          autoComplete="off"
          id="search"
          role="searchbox"
          placeholder="Search / Filter Items"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <InputRightAddon
          bg={themeObj.bgIcon}
          size="sm"
          children={<Icon color={themeObj.colorIcon} as={FaSearch} />}
        />
      </InputGroup>
    </FormControl>
  );
};

export default SearchItem;
