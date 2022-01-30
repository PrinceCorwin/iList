import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react';
import {
  Button,
  Heading,
  IconButton,
  InputGroup,
  Input,
  Textarea,
  Flex,
} from '@chakra-ui/react';

const AddItem = ({
  themeObj,
  newItem,
  setNewItem,
  handleSubmit,
  setShowAdd,
}) => {
  // const inputRef = useRef();
  return (
    <Flex
      borderRadius={5}
      direction="column"
      // label="Add Item"
      // onSubmit={handleSubmit}
      bg={themeObj.bgItem}
      // mx={3}
      w="90%"
      py={3}
      px={4}
      position="absolute"
      zIndex="1000"
      top="50px"
      left="20px"
    >
      {/* <InputGroup> */}
      <Heading size="md" color={themeObj.colorItem} mb={3}>
        Add Item to List
      </Heading>
      <Textarea
        bg={themeObj.bgItem}
        color={themeObj.colorItem}
        // variant="outline"
        autoFocus
        autoComplete="off"
        // ref={inputRef}
        // type="text"
        id="addItem"
        placeholder="Item Description"
        isRequired
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />
      <Flex w="60%" justifyContent="space-between" mt={3}>
        <Button
          size="sm"
          variant="solid"
          aria-label="Rename List"
          // color="#F7FAFC"
          colorScheme="green"
          onClick={handleSubmit}
        >
          Add Item
        </Button>
        <Button
          size="sm"
          variant="solid"
          // mr={3}

          onClick={() => {
            setShowAdd(false);
          }}
          aria-label="cancel"
          // color="#F7FAFC"
          // _hover={{
          //   background: `${themeObj.deleteIcon}`,
          // }}
          colorScheme="red"
        >
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddItem;
