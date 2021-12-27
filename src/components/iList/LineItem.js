import { FaTrashAlt } from 'react-icons/fa';
import {
  Checkbox,
  Box,
  Flex,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
const LineItem = ({
  themeObj,
  item,
  handleDelete,
  handleCheck,
  setEditItem,
}) => {
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
      <Box
        // borderLeft="1px solid #CBD5E0"
        // borderBottom="1px solid #CBD5E0"
        // boxShadow={shadow}
        borderRadius="lg"
        bg={themeObj.bgItem}
        ml={2}
        mr={2}
        px={3}
        py={1}
        w="100%"
      >
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

      {/* as far as I can tell, the following spacer isn't needed. leaving here in case bug manifests */}
      {/* <Spacer borderRightRadius="lg" bg={themeObj.bgItem} mr={3} /> */}

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
