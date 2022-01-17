import { Heading, Flex, Text, Icon } from '@chakra-ui/react';
import Menu from './Menu';

import { FaHome, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export const ContentNav = ({
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
      <Menu
        user={user}
        setShowAbout={setShowAbout}
        themeObj={themeObj}
        appTheme={appTheme}
        setAppTheme={setAppTheme}
      ></Menu>
      <Link to="/">
        <Flex>
          <Icon as={FaHome} w={5} h={5} color={themeObj.color} />
        </Flex>
      </Link>
      <Link to="/mylists">
        <Flex>
          <Icon as={FaClipboardList} w={5} h={5} color={themeObj.color} />
        </Flex>
      </Link>
      <ColorModeSwitcher setUserColorMode={setUserColorMode} user={user} />
    </Flex>
  );
};
