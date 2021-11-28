import { FaTrashAlt } from 'react-icons/fa';
import {
  ListItem,
  Checkbox,
  Box,
  Spacer,
  Flex,
  IconButton,
} from '@chakra-ui/react';

const LineItem = ({ item, handleDelete, handleCheck }) => {
  return (
    <Flex align="center" variant="filled">
      <Checkbox
        size="lg"
        spacing="1rem"
        aria-label={item.desc}
        colorScheme="teal"
        defaultChecked={item.checked}
        // the following onChange call must use anonymous function format so we can pass an argument without the handleCheck function executing immediately. onChange={handleCheck(item.id)} would fire off immediately without user interaction
        onChange={() => handleCheck(item.id)}
      >
        <Box>
          <Box>{item.desc}</Box>
          <Box fontSize="sm">Added {item.date}</Box>
        </Box>
      </Checkbox>

      <Spacer />
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
