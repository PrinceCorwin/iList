import { useState } from 'react';
import { slide as MenuType } from 'react-burger-menu';
import { useAuth, db } from '../auth/useAuth';
import { Box, Icon, Center, VStack, Link as Jump } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

import { Link } from 'react-router-dom';

const Menu = ({ user, setShowHow, setShowAbout, setAppTheme, themeObj }) => {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  var styles = {
    bmBurgerButton: {
      position: 'relative',
      width: '25px',
      height: '20px',
    },
    bmBurgerBars: {
      background: '#373a47',
    },
    bmBurgerBarsHover: {
      background: '#a90000',
    },
    bmCrossButton: {
      marginRight: '10px',
      height: '24px',
      width: '24px',
    },
    bmCross: {
      background: '#bdc3c7',
    },
    bmMenuWrap: {
      // overflow: 'visible',
      paddingRight: '0',
      position: 'absolute',
      top: '5px',
      left: '0',
      height: '98%',
    },
    bmMenu: {
      border: `1px solid ${themeObj.colorItem}`,
      // overflow: 'visible',
      background: themeObj.bgItem,
      fontSize: '1.15em',
    },
    bmMorphShape: {
      fill: '#373a47',
    },
    bmItemList: {
      color: themeObj.colorItem,
      padding: '1.5rem .8rem',
    },
    bmItem: {
      display: 'block',
    },
    bmOverlay: {
      maxWidth: '400px',
      background: 'rgba(0, 0, 0, 1.0)',
    },
  };
  const checkDoc = db.collection('users').doc(user.uid);

  const handleOnOpen = () => {
    setMenuOpen(true);
  };
  const handleOnClose = () => {
    setMenuOpen(false);
  };

  const applyTheme = async theme => {
    setAppTheme(theme);
    try {
      await checkDoc.update({ currenttheme: theme });

      //   setLoaderLoading(true);
      // setIsLoading(false);
      //   setFetchError(null);
    } catch (err) {
      //   setFetchError(err.message);
      console.log(err.message);
    } finally {
    }
  };

  return (
    <MenuType
      onClose={handleOnClose}
      isOpen={menuOpen}
      onOpen={handleOnOpen}
      noOverlay
      width={'200px'}
      styles={styles}
    >
      <Box _hover={{ fontWeight: 'semibold' }} onClick={handleOnClose}>
        <Link to="/">Home</Link>
      </Box>
      <Box _hover={{ fontWeight: 'semibold' }} onClick={handleOnClose}>
        <Link to="/newlist">New List</Link>
      </Box>
      <Box _hover={{ fontWeight: 'semibold' }} onClick={handleOnClose}>
        <Link to="/mylists">My Lists</Link>
      </Box>

      <VStack py={2} spacing={1}>
        <Center w="100%">Themes</Center>
        <Box
          _hover={{ fontWeight: 'semibold' }}
          as="button"
          w="100%"
          onClick={() => {
            applyTheme('default');
          }}
        >
          <Center w="100%" color="#F7FAFC" bg="#303F9F">
            Default
          </Center>
        </Box>
        <Box
          _hover={{ fontWeight: 'semibold' }}
          as="button"
          w="100%"
          onClick={() => {
            applyTheme('woodlands');
          }}
        >
          <Center w="100%" color="#F7FAFC" bg="#4CBB17">
            Woodlands
          </Center>
        </Box>
        <Box
          _hover={{ fontWeight: 'semibold' }}
          as="button"
          w="100%"
          onClick={() => {
            applyTheme('codelife');
          }}
        >
          <Center w="100%" color="#F7FAFC" bg="teal">
            CodeLife
          </Center>
        </Box>
        <Box
          _hover={{ fontWeight: 'semibold' }}
          as="button"
          w="100%"
          onClick={() => {
            applyTheme('ocean');
          }}
        >
          <Center w="100%" color="#FFFFFF" bg="#2196F3">
            Ocean
          </Center>
        </Box>
        <Box
          _hover={{ fontWeight: 'semibold' }}
          as="button"
          w="100%"
          onClick={() => {
            applyTheme('purple');
          }}
        >
          <Center w="100%" color="#F7FAFC" bg="#9C27B0">
            Purple
          </Center>
        </Box>
        <Box
          _hover={{ fontWeight: 'semibold' }}
          as="button"
          w="100%"
          onClick={() => {
            applyTheme('passion');
          }}
        >
          <Center w="100%" color="#F7FAFC" bg="#FF69B4">
            Passion
          </Center>
        </Box>
        <Box
          _hover={{ fontWeight: 'semibold' }}
          as="button"
          w="100%"
          onClick={() => {
            applyTheme('harvest');
          }}
        >
          <Center w="100%" color="#212121" bg="#FFC107">
            Harvest
          </Center>
        </Box>
        <Box
          _hover={{ fontWeight: 'semibold' }}
          as="button"
          w="100%"
          onClick={() => {
            applyTheme('minimal');
          }}
        >
          <Center
            w="100%"
            // border="1px solid #1A202C"
            color="#1A202C"
            bg="white"
          >
            Minimalist
          </Center>
        </Box>
      </VStack>
      <Box
        py={2}
        _hover={{ fontWeight: 'semibold' }}
        as="button"
        onClick={() => {
          setShowAbout(true);
          setShowHow(false);
          handleOnClose();
        }}
      >
        <Link to="/">About</Link>
      </Box>
      <Box
        py={2}
        _hover={{ fontWeight: 'semibold' }}
        as="button"
        onClick={() => {
          setShowHow(true);

          setShowAbout(false);
          handleOnClose();
        }}
      >
        <Link to="/">How It Works</Link>
      </Box>
      <Box
        py={2}
        _hover={{ fontWeight: 'semibold' }}
        as="button"
        onClick={() => {
          handleOnClose();
        }}
      >
        <Jump href="https://github.com/PrinceCorwin/iList" isExternal>
          View Code {` `}
          <Icon as={FaGithub} />
        </Jump>
      </Box>
      <Box
        _hover={{ fontWeight: 'semibold' }}
        as="button"
        py={2}
        onClick={logout}
      >
        Logout
      </Box>
      <Box
        py={2}
        color="red"
        fontSize="sm"
        _hover={{ fontWeight: 'semibold' }}
        as="button"
        onClick={handleOnClose}
      >
        <Link to="/delete_account">Delete Account</Link>
      </Box>
    </MenuType>
  );
};

export default Menu;