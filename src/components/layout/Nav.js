import React from 'react';
import { Heading, Box, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

// import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Nav = ({ bg, color, currentList }) => {
  const { user, logout } = useAuth();

  return (
    <Flex
      variant="mine"
      color={color}
      bg={bg}
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
          <Heading as="h1" mr={8} isTruncated>
            {currentList}
          </Heading>
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
