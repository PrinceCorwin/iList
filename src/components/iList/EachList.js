import { Button, Tooltip, Flex, Heading, IconButton } from '@chakra-ui/react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';

const EachList = ({
  updateCurrentList,
  handleDelete,
  setFinalListError,
  setEditList,
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
        align="center"
        borderLeftRadius="lg"
        w="100%"
        px={3}
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
          borderColor={themeObj.deleteOutline}
          color={themeObj.deleteIcon}
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
          borderColor={themeObj.deleteOutline}
          color={themeObj.deleteIcon}
          icon={<FaRegTrashAlt />}
          onClick={() => handleDelete(list)}
        />
      </Tooltip>
    </Flex>
  );
};

export default EachList;
