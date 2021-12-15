import React, { useState } from 'react';
import Menu from '../Nav/Menu';
import { Heading, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { useAuth } from '../../hooks/useAuth';

const Nav = ({ isLoading, setNewList, setAppTheme, themeObj, currentList }) => {
  const { user } = useAuth();
  console.log(currentList);
  return (
    <Flex
      // position="relative"
      // overflow="visible"
      color={themeObj.color}
      // h={10}
      bg={themeObj.bg}
      w="100%"
      pt={1}
      pl={6}
      pr={6}
      pb={1}
      justifyContent="space-between"
      alignItems="center"
    >
      {user && (
        <>
          <Menu
            // menuOpen={menuOpen}
            // setMenuOpen={setMenuOpen}
            themeObj={themeObj}
            setAppTheme={setAppTheme}
            setNewList={setNewList}
          ></Menu>
          {!isLoading && (
            <Heading px={3} as="h1" mr={8} isTruncated>
              {currentList}
            </Heading>
          )}
          <Flex justifyContent="space-between" alignItems="center">
            <Link to="/mylists">
              <Text fontSize="md" mr={8}>
                My Lists
              </Text>
            </Link>

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
