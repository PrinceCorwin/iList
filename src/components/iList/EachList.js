import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import {
  Button,
  Tooltip,
  Flex,
  Heading,
  Box,
  IconButton,
} from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';

const EachList = ({
  updateCurrentList,
  handleEdit,
  handleDelete,
  setFinalListError,
  lists,
  inputRef,
  setEditList,
  currentList,
  setCurrentList,
  list,
  themeObj,
}) => {
  return (
    <Flex align="center" w="100%">
      <Button
        as="button"
        size="md"
        variant="outline"
        colorScheme={themeObj.checkScheme}
        // _hover={{ bg: 'none' }}
        // cursor="pointer"
        align="center"
        borderLeftRadius="lg"
        w="100%"
        // h="100%"
        px={3}
        // bg={themeObj.bgItem}
        // color={themeObj.colorItem}
        onClick={() => {
          setFinalListError(false);
          updateCurrentList(list);
        }}
      >
        <Heading px={3} size="md" isTruncated>
          {list}
        </Heading>
      </Button>
      <Tooltip label="Rename" fontSize="sm">
        <IconButton
          size="sm"
          aria-label={`Rename ${list}`}
          ml={3}
          variant="outline"
          // background="black"
          borderColor={themeObj.deleteOutline}
          color={themeObj.deleteIcon}
          // colorScheme={themeObj.checkScheme}
          icon={<AiOutlineEdit />}
          onClick={() => {
            setFinalListError(false);
            setEditList(list);
          }}
        />
      </Tooltip>
      <Tooltip label="Delete" fontSize="sm">
        <IconButton
          ml={3}
          size="sm"
          aria-label={`Delete ${list}`}
          variant="outline"
          // background="black"
          borderColor={themeObj.deleteOutline}
          color={themeObj.deleteIcon}
          // colorScheme={themeObj.checkScheme}
          icon={<FaRegTrashAlt />}
          onClick={() => handleDelete(list)}
        />
      </Tooltip>
    </Flex>
  );
};

export default EachList;
