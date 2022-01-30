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
import AddEditModal from './AddEditModal';

const AddItem = ({
  showAdd,
  themeObj,
  newItem,
  setNewItem,
  handleSubmit,
  setShowAdd,
}) => {
  // const inputRef = useRef();
  return (
    <AddEditModal
      showAdd={showAdd}
      themeObj={themeObj}
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      setShowAdd={setShowAdd}
    />
  );
};

export default AddItem;
