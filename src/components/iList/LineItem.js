import { Text, Checkbox, Box, Flex } from '@chakra-ui/react';
const LineItem = ({ themeObj, item, handleCheck, setEditItem }) => {
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
        borderRadius="lg"
        bg={themeObj.bgItem}
        ml={2}
        // mr={2}
        px={3}
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
            <Text _hover={{ textShadow: '1px 1px lightgrey' }}>
              {item.desc}
            </Text>
          </Box>
          <Box color={themeObj.added} fontStyle="italic" fontSize="xs">
            Added {item.date}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LineItem;
