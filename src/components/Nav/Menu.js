import React, { useState } from 'react';
import { slide as MenuType } from 'react-burger-menu';
import { useAuth, db } from '../../hooks/useAuth';
import { Box, Center, theme, VStack } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { FaBlackTie } from 'react-icons/fa';

const Menu = ({ setNewList, setAppTheme, themeObj }) => {
  const { logout } = useAuth();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  // const handleClick = () => setMenuOpen(true);
  var styles = {
    bmBurgerButton: {
      position: 'relative',
      width: '25px',
      height: '20px',
      //   left: '36px',
      //   top: '36px',
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
      padding: '2.5em 1.25em 0',
      fontSize: '1.15em',
    },
    bmMorphShape: {
      fill: '#373a47',
    },
    bmItemList: {
      color: themeObj.colorItem,
      padding: '0.8em',
    },
    bmItem: {
      display: 'block',
    },
    bmOverlay: {
      maxWidth: '400px',
      background: 'rgba(0, 0, 0, 1.0)',
    },
  };
  // const [menuOpen, setMenuOpen] = useState(false);
  const checkDoc = db.collection('users').doc(user.uid);

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
      console.log(theme);
    }
  };

  return (
    <MenuType noOverlay isOpen={menuOpen} width={'200px'} styles={styles}>
      <Box _hover={{ fontWeight: 'semibold' }}>
        <Link to="/">Home</Link>
      </Box>
      <Box cursor="pointer" _hover={{ fontWeight: 'semibold' }}>
        <Link to="/newlist">New List</Link>
      </Box>
      <Box _hover={{ fontWeight: 'semibold' }}>
        <Link to="/mylists">My Lists</Link>
      </Box>

      <VStack mt={2} spacing={1}>
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
      {/* <VStack spacing={0} bg="gray">
        <Center>Custom</Center>
        <Center>(coming soon)</Center>
      </VStack> */}

      <Box
        _hover={{ fontWeight: 'semibold' }}
        mt={4}
        as="button"
        onClick={logout}
      >
        Logout
      </Box>
    </MenuType>
  );
};

export default Menu;
