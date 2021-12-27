import Menu from '../Nav/Menu';
import { Heading, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const Nav = ({
  user,
  setIsLoading,
  setShowHow,
  setShowAbout,
  isLoading,
  setAppTheme,
  themeObj,
  currentList,
}) => {
  return (
    <Flex
      color={themeObj.color}
      bg={themeObj.bg}
      w="100%"
      py={1}
      px={6}
      justifyContent="space-between"
      alignItems="center"
    >
      {user && (
        <>
          <Menu
            user={user}
            setShowHow={setShowHow}
            setShowAbout={setShowAbout}
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
          <Text py={2} fontSize="md" mr={8}>
            Login
          </Text>
        </Link>
      )}
    </Flex>
  );
};

export default Nav;
