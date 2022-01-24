import { Heading, Flex, Text, Icon } from '@chakra-ui/react';
import Menu from './Menu';

import { FaHome, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export const ContentNav = ({
  editItem,
  setEditItem,
  showAbout,
  setShowAbout,
  appTheme,
  setAppTheme,
  user,
  setUserColorMode,
  themeObj,
}) => {
  return (
    <Flex
      color={themeObj.color}
      bg={themeObj.bg}
      //   bg="red"
      w="100%"
      py={1}
      px={3}
      justifyContent="space-between"
      alignItems="center"
    >
      {user && (
        <>
          <Menu
            user={user}
            showAbout={showAbout}
            setShowAbout={setShowAbout}
            themeObj={themeObj}
            appTheme={appTheme}
            setAppTheme={setAppTheme}
          ></Menu>
          <Link to="/">
            <Flex
              onClick={() => {
                showAbout && setShowAbout(false);
                editItem && setEditItem(false);
              }}
            >
              <Icon as={FaHome} w={5} h={5} color={themeObj.color} />
            </Flex>
          </Link>
          <Link to="/mylists">
            <Flex
              onClick={() => {
                showAbout && setShowAbout(false);
                editItem && setEditItem(false);
              }}
            >
              <Icon as={FaClipboardList} w={5} h={5} color={themeObj.color} />
            </Flex>
          </Link>
          <ColorModeSwitcher setUserColorMode={setUserColorMode} user={user} />
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
