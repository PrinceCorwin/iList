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
import { motion, AnimatePresence, useSpring } from 'framer-motion';
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
  const [hover, setHover] = useState(false);
  const variants = {
    initial: { width: '100%' },
    mainFull: {
      width: '100%',
      transition: {
        delay: 0.25,
        duration: 0.25,
        ease: 'easeInOut',
      },
    },
    mainPartial: {
      width: '60%',
      transition: {
        duration: 0.25,
        ease: 'easeInOut',
      },
    },
    modalFull: { x: -20, opacity: 1 },
    modalStart: { x: '-155px', opacity: 0 },
  };
  const transition = {
    duration: 0.05,
    ease: 'easeInOut',
  };
  const handleClick = () => {
    showEditListModal || showConfirmDelete
      ? setModalWidth({ modal: '0', list: '100%', confirm: '0' })
      : setModalWidth({ modal: '60%', list: '40%', confirm: '0' });
    setShowEditListModal(!showEditListModal);
    showConfirmDelete && setShowConfirmDelete(false);
  };
  return (
    <Flex align="center" w="100%" justify="flex-end" overflow="hidden">
      {/* {showEditListModal && ( */}
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
              // setShowEditListModal(false);
              finalListError && setFinalListError(false);
              setEditList(list);
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
              // setShowEditListModal(false);
              setModalWidth({ modal: '0', list: '30%', confirm: '70%' });
            }}
          />
        </Tooltip>
      </motion.div>
      {/* )} */}
      {/* </AnimatePresence> */}

      {/* Confirm Delete menu */}
      {/* {showConfirmDelete && ( */}
      <div
        className="confirmDelete overflow-hidden flexrow-around-center h-100 br-md"
        style={{
          transition: 'all .25s ease-in-out',
          width: modalWidth.confirm,
          color: themeObj.colorItem,
          backgroundColor: themeObj.bgItem,
        }}
        // transition="all .25s ease-in-out"
        // overflow="hidden"
        // w={modalWidth.confirm}
        // mr={1}
        // alignItems="center"
        // justifyContent="space-around"
        // h="100%"
        // px={3}
        // color={themeObj.colorItem}
        // bg={themeObj.bgItem}
        // borderRadius="md"
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
        // variants={variants}
        // initial="initial"
        // animate={showEditListModal ? 'mainPartial' : 'mainFull'}
        whileHover={{ backgroundColor: themeObj.color, color: themeObj.bg }}
        // transition={transition}
        style={{
          padding: '5px 10px 5px 10px',
          backgroundColor: themeObj.bgItem,
          color: themeObj.colorItem,
          border: `1px solid ${themeObj.bg}`,
          width: modalWidth.list,
          // transition: 'all .25s ease-in-out',
        }}
        className="listItem"
        // w="100%"
        // px={3}
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
