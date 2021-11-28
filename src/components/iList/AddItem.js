import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react';
import {
  IconButton,
  InputGroup,
  Center,
  Icon,
  Input,
  FormControl,
  InputRightAddon,
  InputRightElement,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  const inputRef = useRef();
  return (
    <form label="Add Item" onSubmit={handleSubmit} style={{ width: '100%' }}>
      <InputGroup>
        <Input
          autoFocus
          ref={inputRef}
          type="text"
          id="addItem"
          placeholder="Add Item"
          required
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
        />
        {/* <InputRightElement
          children={ */}
        <IconButton
          type="submit"
          aria-label="Add Item"
          onClick={() => inputRef.current.focus()}
          colorScheme="teal"
          icon={<FaPlus />}
        />
        {/* }
        /> */}

        {/* <button
          type="submit"
          aria-label="Add Item"
          onClick={() => inputRef.current.focus()}
        >
          <FaPlus />
        </button> */}
      </InputGroup>
    </form>
  );
};

export default AddItem;
