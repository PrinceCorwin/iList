import Menu from './Menu';
import { Heading, Flex, Text, Icon } from '@chakra-ui/react';
import { FaHome, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const Nav = ({
  user,
  setIsLoading,
  setShowHow,
  setShowAbout,
  isLoading,
  appTheme,
  setAppTheme,
  themeObj,
  currentList,
}) => {
  return (
    <Flex
      color={user ? themeObj.color : null}
      bg={user && !isLoading && themeObj.bg}
      w="100%"
      py={1}
      px={3}
      justifyContent="start"
      alignItems="center"
    >
      {user && (
        <>
          <Menu
            user={user}
            setShowHow={setShowHow}
            setShowAbout={setShowAbout}
            themeObj={themeObj}
            appTheme={appTheme}
            setAppTheme={setAppTheme}
          ></Menu>
          {!isLoading && (
            <Heading px={3} as="h1" w="100%" align="center" isTruncated>
              {currentList}
            </Heading>
          )}
          {/* <Flex justifyContent="flex-end" alignItems="center">
            <Link to="/">
              <Icon as={FaHome} w={6} h={6} color={themeObj.color} />
            </Link>
            <Link to="/mylists">
              <Icon
                ml={3}
                as={FaClipboardList}
                w={6}
                h={6}
                color={themeObj.color}
              />
            </Link>
            <ColorModeSwitcher />
          </Flex> */}
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
