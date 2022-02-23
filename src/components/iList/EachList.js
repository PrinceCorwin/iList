import { useState } from 'react';
import {
  Button,
  Text,
  Tooltip,
  Flex,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineEdit, AiFillEye } from 'react-icons/ai';
import { motion } from 'framer-motion';
const EachList = ({
  setNewName2,
  updateCurrentList,
  handleDelete,
  finalListError,
  setFinalListError,
  setEditList,
  list,
  themeObj,
}) => {
  const [modalWidth, setModalWidth] = useState({
    modal: '0',
    list: '100%',
    confirm: '0',
  });
  const [showEditListModal, setShowEditListModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleClick = () => {
    showEditListModal || showConfirmDelete
      ? setModalWidth({ modal: '0', list: '100%', confirm: '0' })
      : setModalWidth({ modal: '60%', list: '40%', confirm: '0' });
    setShowEditListModal(!showEditListModal);
    showConfirmDelete && setShowConfirmDelete(false);
  };
  return (
    <Flex align="center" w="100%" justify="flex-end" overflow="hidden">
      {/* edit modal slide in */}
      <motion.div
        className="editModal"
        style={{
          width: modalWidth.modal,
          color: themeObj.colorItem,
          backgroundColor: themeObj.bgItem,
        }}
      >
        <Tooltip label="View" fontSize="sm">
          <IconButton
            size="sm"
            mr={3}
            aria-label={`View ${list}`}
            variant="ghost"
            color={themeObj.colorItem}
            icon={<AiFillEye style={{ height: '20px', width: '20px' }} />}
            onClick={() => {
              setShowEditListModal(false);
              finalListError && setFinalListError(false);
              updateCurrentList(list);
            }}
          />
        </Tooltip>
        <Tooltip label="Rename" fontSize="sm">
          <IconButton
            mr={3}
            size="sm"
            aria-label={`Rename ${list}`}
            variant="ghost"
            color={themeObj.colorItem}
            icon={<AiOutlineEdit style={{ height: '20px', width: '20px' }} />}
            onClick={() => {
              finalListError && setFinalListError(false);
              setEditList(list);
              handleClick();
              setNewName2(list);
            }}
          />
        </Tooltip>
        <Tooltip label="Delete" fontSize="sm">
          <IconButton
            size="sm"
            aria-label={`Delete ${list}`}
            variant="ghost"
            color={themeObj.colorItem}
            icon={<FaRegTrashAlt style={{ height: '20px', width: '20px' }} />}
            onClick={() => {
              console.log('here');
              setShowConfirmDelete(true);

              setModalWidth({ modal: '0', list: '30%', confirm: '70%' });
            }}
          />
        </Tooltip>
      </motion.div>

      {/* confirm delete slide in */}
      <div
        className="confirmDelete overflow-hidden flexrow-around-center h-100 br-md"
        style={{
          transition: 'all .25s ease-in-out',
          width: modalWidth.confirm,
          color: themeObj.colorItem,
          backgroundColor: themeObj.bgItem,
        }}
      >
        <Text>CONFIRM</Text>
        <Button
          as="button"
          size="sm"
          variant="outline"
          colorScheme="red"
          align="center"
          px={3}
          onClick={() => {
            handleDelete(list);
          }}
        >
          Delete
        </Button>
        <Button
          as="button"
          size="sm"
          px={3}
          variant="outline"
          borderColor={themeObj.bg}
          colorScheme="green"
          align="center"
          onClick={handleClick}
        >
          Cancel
        </Button>
      </div>
      {/* )} */}
      <motion.button
        whileHover={{ backgroundColor: themeObj.color, color: themeObj.bg }}
        style={{
          padding: '5px 10px 5px 10px',
          backgroundColor: themeObj.bgItem,
          color: themeObj.colorItem,
          border: `1px solid ${themeObj.bg}`,
          width: modalWidth.list,
        }}
        className="listItem"
        onClick={handleClick}
      >
        <Heading size="md" isTruncated>
          {list}
        </Heading>
      </motion.button>
    </Flex>
  );
};

export default EachList;
