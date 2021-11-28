import React from 'react';
import { GridItem, Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

// import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Nav = ({ currentList }) => {
  const { user, logout } = useAuth();

  return (
    <Flex
      // bg="red"
      w="100%"
      pt={3}
      pl={6}
      pr={6}
      pb={3}
      justifyContent="space-between"
      alignItems="center"
    >
      {user && (
        <>
          <Text fontSize="md" mr={8}>
            {currentList}
          </Text>
          <Flex justifyContent="space-between" alignItems="center">
            <Link to="/myLists">
              <Text fontSize="md" mr={8}>
                My Lists
              </Text>
            </Link>
            <Box as="button" onClick={logout}>
              <Text fontSize="md" mr={8}>
                Logout
              </Text>
            </Box>
            <ColorModeSwitcher />
          </Flex>
        </>
      )}
      {!user && (
        <Link to="/login">
          <Text fontSize="md" mr={8}>
            Login
          </Text>
        </Link>
      )}
    </Flex>
  );
};

export default Nav;
