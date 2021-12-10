import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import {
  Button,
  Tooltip,
  Flex,
  Heading,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';

const EachList = ({
  updateCurrentList,
  handleEdit,
  handleDelete,
  inputRef,
  setEditList,
  currentList,
  setCurrentList,
  item,
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
        onClick={() => updateCurrentList(item)}
      >
        <Heading px={3} size="md" isTruncated>
          {item}
        </Heading>
      </Button>
      <Tooltip label="Rename" fontSize="sm">
        <IconButton
          size="sm"
          aria-label={`Rename ${item.desc}`}
          ml={3}
          variant="outline"
          // background="black"
          borderColor={themeObj.deleteOutline}
          color={themeObj.deleteIcon}
          // colorScheme={themeObj.checkScheme}
          icon={<AiOutlineEdit />}
          onClick={() => setEditList(item)}
        />
      </Tooltip>
      <Tooltip label="Delete" fontSize="sm">
        <IconButton
          ml={3}
          size="sm"
          aria-label={`Delete ${item.desc}`}
          variant="outline"
          // background="black"
          borderColor={themeObj.deleteOutline}
          color={themeObj.deleteIcon}
          // colorScheme={themeObj.checkScheme}
          icon={<FaRegTrashAlt />}
          onClick={() => handleDelete(item)}
        />
      </Tooltip>
    </Flex>
  );
};

export default EachList;
