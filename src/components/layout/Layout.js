import React from 'react';
import { Flex } from '@chakra-ui/react';
import Nav from './Nav';

const Layout = ({
  isLoading,
  newList,
  setNewList,
  setAppTheme,
  themeObj,
  children,
  currentList,
}) => {
  return (
    <Flex
      overflow="hidden"
      position="relative"
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
      <Nav
        isLoading={isLoading}
        newList={newList}
        setNewList={setNewList}
        setAppTheme={setAppTheme}
        themeObj={themeObj}
        currentList={currentList}
      />

      {children}
    </Flex>
  );
};

export default Layout;
