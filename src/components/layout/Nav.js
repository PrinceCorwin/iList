import React, { useState } from 'react';
import Menu from '../Nav/Menu';
import { Heading, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { useAuth } from '../../hooks/useAuth';

const Nav = ({ isLoading, setAppTheme, themeObj, currentList }) => {
  // const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useAuth();
  return (
    <Flex
      color={themeObj.color}
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
          ></Menu>
          {!isLoading && (
            <Heading px={3} as="h1" mr={1} isTruncated>
              {currentList}
            </Heading>
          )}
          <Flex justifyContent="flex-end" alignItems="center">
            <Link to="/mylists">
              <Text fontSize="md" w="75px">
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
