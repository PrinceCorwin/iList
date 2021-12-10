import { FaTrashAlt } from 'react-icons/fa';
import { Checkbox, Box, Spacer, Flex, IconButton } from '@chakra-ui/react';

const LineItem = ({ themeObj, item, handleDelete, handleCheck }) => {
  return (
    <Flex align="center">
      <Checkbox
        variant="solid"
        size="lg"
        spacing="1rem"
        aria-label={item.desc}
        colorScheme={themeObj.checkScheme}
        defaultChecked={item.checked}
        // the following onChange call must use anonymous function format so we can pass an argument without the handleCheck function executing immediately. onChange={handleCheck(item.id)} would fire off immediately without user interaction
        onChange={() => handleCheck(item.id)}
      >
        <Box borderLeftRadius="lg" bg={themeObj.bgItem} px={3} py={1}>
          <Box
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
      </Checkbox>

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
