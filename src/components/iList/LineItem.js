import { FaTrashAlt } from 'react-icons/fa';
import { Text, Checkbox, Box, Flex, IconButton } from '@chakra-ui/react';
const LineItem = ({
  themeObj,
  item,
  handleDelete,
  handleCheck,
  setEditItem,
}) => {
  // may use this in the future
  // const shadow = `-4px 6px 6px ${useColorModeValue('gray', '#A0AEC0')}`;
  return (
    <Flex align="center">
      <Checkbox
        variant="solid"
        size="lg"
        spacing="1rem"
        aria-label={item.desc}
        colorScheme={themeObj.checkScheme}
        defaultChecked={item.checked}
        onChange={() => handleCheck(item.id)}
      ></Checkbox>
      <Flex
        justify="space-between"
        align="center"
        // borderLeft="1px solid #CBD5E0"
        // borderBottom="1px solid #CBD5E0"
        // boxShadow={shadow}
        borderRadius="lg"
        bg={themeObj.bgItem}
        ml={2}
        // mr={2}
        pl={3}
        py={1}
        w="100%"
      >
        <Flex direction="column">
          <Box
            cursor="pointer"
            onClick={() => {
              setEditItem(item);
            }}
            style={
              item.checked
                ? {
                    textDecoration: `line-through  ${themeObj.strike}`,
                    color: `${themeObj.strikeText}`,
                  }
                : {
                    color: `${themeObj.colorItem}`,
                  }
            }
          >
            <Text
              _hover={{ textShadow: '1px 1px lightgrey' }}
              // _hover={
              //   item.checked
              //     ? { color: `${themeObj.colorItem}` }
              //     : { color: 'red' }
              // }
            >
              {item.desc}
            </Text>
          </Box>
          <Box color={themeObj.added} fontStyle="italic" fontSize="xs">
            Added {item.date}
          </Box>
        </Flex>
        <IconButton
          alignSelf="flex-start"
          mt={1}
          ml={3}
          size="md"
          aria-label={`Delete ${item.desc}`}
          variant="outline"
          border="none"
          // borderColor={themeObj.deleteOutline}
          color={themeObj.deleteIcon}
          icon={<FaTrashAlt />}
          onClick={() => handleDelete(item.id)}
        />
      </Flex>
    </Flex>
  );
};

export default LineItem;
