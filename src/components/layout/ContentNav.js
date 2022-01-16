import { Heading, Flex, Text, Icon } from '@chakra-ui/react';
import { FaHome, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export const ContentNav = ({ setUserColorMode, themeObj }) => {
  return (
    <Flex
      color={themeObj.color}
      //   bg={themeObj.bg}
      bg="red"
      w="100%"
      py={1}
      px={3}
      justifyContent="space-between"
      alignItems="center"
    >
      <Link to="/">
        <Icon as={FaHome} w={6} h={6} color={themeObj.color} />
      </Link>
      <Link to="/mylists">
        <Icon ml={3} as={FaClipboardList} w={6} h={6} color={themeObj.color} />
      </Link>
      <ColorModeSwitcher setUserColorMode={setUserColorMode} />
    </Flex>
  );
};
