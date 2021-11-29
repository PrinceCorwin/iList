import { FaTrashAlt } from 'react-icons/fa';
import {
  Checkbox,
  Box,
  Spacer,
  Flex,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';

const LineItem = ({ item, handleDelete, handleCheck }) => {
  const bg = useColorModeValue('gray.200', 'gray.700');
  const color = useColorModeValue('lightgray', 'gray');

  return (
    <Flex align="center">
      <Checkbox
        variant="solid"
        size="lg"
        spacing="1rem"
        aria-label={item.desc}
        colorScheme="orange"
        defaultChecked={item.checked}
        // the following onChange call must use anonymous function format so we can pass an argument without the handleCheck function executing immediately. onChange={handleCheck(item.id)} would fire off immediately without user interaction
        onChange={() => handleCheck(item.id)}
      >
        <Box bg={bg} px={3} py={1}>
          <Box
            style={
              item.checked
                ? { textDecoration: 'line-through red', color: color }
                : null
            }
          >
            {item.desc}
          </Box>
          <Box fontSize="sm">Added {item.date}</Box>
        </Box>
      </Checkbox>

      <Spacer bg={bg} mr={3} />

      <IconButton
        aria-label={`Delete ${item.desc}`}
        variant="outline"
        colorScheme="teal"
        icon={<FaTrashAlt />}
        onClick={() => handleDelete(item.id)}
      />
    </Flex>
  );
};

export default LineItem;
