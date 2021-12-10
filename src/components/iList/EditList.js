import React from 'react';
import {
  Input,
  Button,
  FormControl,
  FormHelperText,
  Heading,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
function EditList({ setIsLoading, themeObj, currentList, setCurrentList }) {
  console.log(currentList);
  return (
    <Flex w="100%" grow="1">
      <Input placeholder="Rename List" type="text"></Input>
    </Flex>
  );
}

export default EditList;
