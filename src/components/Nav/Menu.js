import React, { useState } from 'react';
import { slide as MenuType } from 'react-burger-menu';
import { useAuth, db } from '../../hooks/useAuth';
import { Box, Center, VStack } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

const Menu = ({ setNewList, setAppTheme }) => {
  const { logout } = useAuth();
  const { user } = useAuth();

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
      top: '0',
      left: '0',
      height: '100%',
    },
    bmMenu: {
      // overflow: 'visible',
      background: '#373a47',
      padding: '2.5em 1.25em 0',
      fontSize: '1.15em',
    },
    bmMorphShape: {
      fill: '#373a47',
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em',
    },
    bmItem: {
      display: 'block',
    },
    bmOverlay: {
      maxWidth: '400px',
      background: 'rgba(0, 0, 0, 0.0)',
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
    <MenuType noOverlay isOpen={false} width={'200px'} styles={styles}>
      <Box _hover={{ fontWeight: 'semibold' }}>
        <Link to="/">Home</Link>
      </Box>
      <Box cursor="pointer" _hover={{ fontWeight: 'semibold' }}>
        <Link to="/newlist">New List</Link>
      </Box>
      <Box _hover={{ fontWeight: 'semibold' }}>
        <Link to="/mylists">My Lists</Link>
      </Box>
      <Box mt={2}>Themes</Box>
      <VStack spacing={1}>
        <Box
          _hover={{ fontWeight: 'semibold' }}
          as="button"
          w="100%"
          onClick={() => {
            applyTheme('default');
          }}
        >
          <Center w="100%" color="#F7FAFC" bg="#6082B6">
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
          <Center w="100%" color="#00008B" bg="rgb(0, 220, 255)">
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
          <Center w="100%" color="#F7FAFC" bg="#BF40BF">
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
          <Center w="100%" color="#F7FAFC" bg="#DAA520">
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
          <Center w="100%" color="#1A202C" bg="#F7FAFC">
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
