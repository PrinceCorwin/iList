import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react';
import { IconButton, InputGroup, Input } from '@chakra-ui/react';

const AddItem = ({ themeObj, newItem, setNewItem, handleSubmit }) => {
  const inputRef = useRef();
  return (
    <form label="Add Item" onSubmit={handleSubmit} style={{ width: '100%' }}>
      <InputGroup>
        <Input
          variant="outline"
          autoFocus
          autoComplete="off"
          ref={inputRef}
          type="text"
          id="addItem"
          placeholder="Add Item"
          required
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
        />
        <IconButton
          ml={2}
          type="submit"
          aria-label="Add Item"
          onClick={() => inputRef.current.focus()}
          color={themeObj.colorIcon}
          _hover={{
            background: `${themeObj.checkScheme}`,
          }}
          bg={themeObj.bgIcon}
          icon={<FaPlus />}
        />
      </InputGroup>
    </form>
  );
};

export default AddItem;
