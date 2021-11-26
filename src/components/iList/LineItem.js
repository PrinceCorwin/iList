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
  // const itemDate = item.date.toDate();
  // const dateStr = `${
  //   itemDate.getMonth() + 1
  // }/${itemDate.getDate()}/${itemDate.getFullYear()}`;
  return (
    <Flex align="center">
      <Checkbox
        size="lg"
        spacing="1rem"
        aria-label={item.desc}
        // type="checkbox"
        defaultChecked={item.checked}
        // the following onChange call must use anonymous function format so we can pass an argument without the handleCheck function executing immediately. onChange={handleCheck(item.id)} would fire off immediately without user interaction
        onChange={() => handleCheck(item.id)}
      >
        {' '}
        <Box>
          <Box>{item.desc}</Box>
          <Box>Added {item.date}</Box>
        </Box>
      </Checkbox>

      {/* <Flex bg="red"> */}
      {/* <Box>
        <Box>{item.desc}</Box>
        <Box>Added {item.date}</Box>
      </Box> */}
      {/* </Flex> */}
      <Spacer />
      <IconButton
        aria-label={`Delete ${item.desc}`}
        variant="outline"
        colorScheme="teal"
        icon={<FaTrashAlt />}
        onClick={() => handleDelete(item.id)}
      />
      {/* <FaTrashAlt
        role="button"
        tabIndex="0"
        onClick={() => handleDelete(item.id)}
        aria-label={`Delete ${item.desc}`}
      /> */}
      {/* <label
        style={
          item.checked ? { textDecoration: 'line-through', color: 'red' } : null
        }
      >
        <div>{item.desc}</div>
        <div className="dateAuthor">
          <span>Added {item.date}</span>
        </div>
      </label> */}
      {/* <FaTrashAlt
        role="button"
        tabIndex="0"
        onClick={() => handleDelete(item.id)}
        aria-label={`Delete ${item.desc}`}
      /> */}
    </Flex>
  );
};

export default LineItem;
