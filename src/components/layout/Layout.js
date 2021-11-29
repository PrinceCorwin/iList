import React from 'react';
import { Flex } from '@chakra-ui/react';
import Nav from './Nav';

const Layout = ({ bg, color, children, currentList }) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      w="100%"
      maxW="500px"
      border="1px"
      borderColor="teal.600"
      m="auto"
    >
      <Nav bg={bg} color={color} currentList={currentList} />

      {children}
    </Flex>
  );
};

export default Layout;
