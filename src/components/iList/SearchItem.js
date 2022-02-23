import { CloseIcon } from '@chakra-ui/icons';

import { InputGroup, IconButton, Input, FormControl } from '@chakra-ui/react';

const SearchItem = ({
  showSearch,
  setShowSearch,
  themeObj,
  search,
  setSearch,
}) => {
  return (
    <FormControl label="Search" onSubmit={e => e.preventDefault()}>
      <InputGroup size="sm" p={3}>
        <Input
          type="text"
          autoComplete="off"
          id="search"
          role="searchbox"
          placeholder="Search / Filter Items"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <IconButton
          size="sm"
          // m={1}
          variant="outline"
          aria-label="Search List"
          icon={<CloseIcon />}
          color={themeObj.deleteIcon}
          onClick={() => {
            setShowSearch(!showSearch);
          }}
        />
      </InputGroup>
    </FormControl>
  );
};

export default SearchItem;
