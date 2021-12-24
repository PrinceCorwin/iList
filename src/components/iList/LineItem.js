import { FaTrashAlt } from 'react-icons/fa';
import { Checkbox, Box, Spacer, Flex, IconButton } from '@chakra-ui/react';
const LineItem = ({
  themeObj,
  item,
  handleDelete,
  handleCheck,
  setEditItem,
}) => {
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
      <Box borderLeftRadius="lg" bg={themeObj.bgItem} ml={2} px={3} py={1}>
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
          {item.desc}
        </Box>
        <Box color={themeObj.added} fontStyle="italic" fontSize="xs">
          Added {item.date}
        </Box>
      </Box>

      <Spacer borderRightRadius="lg" bg={themeObj.bgItem} mr={3} />

      <IconButton
        aria-label={`Delete ${item.desc}`}
        variant="outline"
        // background="black"
        borderColor={themeObj.deleteOutline}
        color={themeObj.deleteIcon}
        // colorScheme={themeObj.checkScheme}
        icon={<FaTrashAlt />}
        onClick={() => handleDelete(item.id)}
      />
    </Flex>
  );
};

export default LineItem;
