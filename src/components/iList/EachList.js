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
  updateCurrentList,
  handleDelete,
  finalListError,
  setFinalListError,
  setEditList,
  list,
  themeObj,
}) => {
  const [showEditListModal, setShowEditListModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  // const [hover, setHover] = useState(false);
  const variants = {
    mainFull: { width: '400px' },
    mainPartial: { width: '245px' },
    modalFull: { x: -10 },
    modalStart: { x: '-155px' },
  };
  const transition = { duration: 0.25, ease: 'easeInOut' };
  return (
    <Flex align="center" w="100%">
      {/* Edit List menu  */}
      {showEditListModal && (
        <motion.div
          className="editModal"
          variants={variants}
          initial="modalStart"
          animate="modalFull"
          transition={transition}
          style={{
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
                setShowEditListModal(false);
                finalListError && setFinalListError(false);
                setEditList(list);
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
                setShowEditListModal(false);
                setShowConfirmDelete(true);
              }}
            />
          </Tooltip>
        </motion.div>
      )}
      {/* Confirm Delete menu */}
      {showConfirmDelete && (
        <Flex
          mr={1}
          alignItems="center"
          justifyContent="space-between"
          h="100%"
          px={3}
          color={themeObj.colorItem}
          bg={themeObj.bgItem}
          borderRadius="md"
        >
          <Text mr={3}>CONFIRM</Text>
          <Button
            as="button"
            mr={3}
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
            onClick={() => {
              setShowConfirmDelete(false);
            }}
          >
            Cancel
          </Button>
        </Flex>
      )}
      <motion.button
        variants={variants}
        animate={showEditListModal ? 'mainPartial' : 'mainFull'}
        whileHover={{ backgroundColor: themeObj.color, color: themeObj.bg }}
        transition={transition}
        style={{
          backgroundColor: themeObj.bgItem,
          color: themeObj.colorItem,
          border: `1px solid ${themeObj.bg}`,
        }}
        className="listItem"
        w="100%"
        // px={3}
        onClick={() => {
          setShowEditListModal(!showEditListModal);
        }}
      >
        <Heading size="md" isTruncated>
          {list}
        </Heading>
      </motion.button>
    </Flex>
  );
};

export default EachList;
