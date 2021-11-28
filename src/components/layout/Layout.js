import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useAuth, db } from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import Nav from './Nav';
// import currentList from '../dashboard/Dashboard';

const Layout = ({ children, currentList }) => {
  return (
    <Flex
      // bg="red"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      w="100%"
      // p={3}
      maxW="500px"
      border="1px"
      borderColor="teal.600"
      m="auto"
    >
      {/* <Nav currentList={currentList ? currentList : ''} /> */}
      <Nav currentList={currentList} />

      {children}
    </Flex>
  );
};

export default Layout;
