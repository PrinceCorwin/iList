import { useState } from 'react';
import { slide as MenuType } from 'react-burger-menu';
import { useAuth, db } from '../auth/useAuth';
import { ChevronDownIcon } from '@chakra-ui/icons';
import AMIlogo from './../../images/ami.svg';
import {
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Menu as DropDown,
  Box,
  Icon,
  Link as Jump,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import ThemeListItem from './ThemeListItem';
import { Link } from 'react-router-dom';

const Menu = ({
  user,
  showAbout,
  setShowAbout,
  appTheme,
  setAppTheme,
  themeObj,
}) => {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  // const burgerBarColor = themeObj.color;
  var styles = {
    bmBurgerButton: {
      position: 'relative',
      width: '20px',
      height: '15px',
    },
    bmBurgerBars: {
      background: `${themeObj.colorIcon}`,
    },
    bmBurgerBarsHover: {
      // this doesn't work
      background: 'red',
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
      maxWidth: '500px',
      background: 'rgba(0, 0, 0, 0.3)',
    },
  };

  const themeList = [
    {
      name: 'Default',
      color: '#F7FAFC',
      bg: '#303F9F',
    },
    {
      name: 'Woodlands',
      color: '#F7FAFC',
      bg: '#4CBB17',
    },
    {
      name: 'CodeLife',
      color: '#F7FAFC',
      bg: 'teal',
    },
    {
      name: 'Ocean',
      color: '#FFFFFF',
      bg: '#2196F3',
    },
    {
      name: 'Purple',
      color: '#F7FAFC',
      bg: '#9C27B0',
    },
    {
      name: 'Passion',
      color: '#F7FAFC',
      bg: '#FF69B4',
    },
    {
      name: 'Harvest',
      color: '#212121',
      bg: '#FFC107',
    },
    {
      name: 'Headlines',
      color: '#1A202C',
      bg: 'white',
    },
  ];

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
      // noOverlay
      width={'200px'}
      styles={styles}
    >
      <Box
        _hover={{ fontWeight: 'semibold' }}
        onClick={() => {
          showAbout && setShowAbout(false);
          handleOnClose();
        }}
        py={2}
      >
        <div className="flexrow-start-center">
          <Jump href="https://amalfimakesit.com" isExternal>
            Home
          </Jump>
          <img className="ml-1 w-25px" src={AMIlogo} />
        </div>
      </Box>
      <Box
        _hover={{ fontWeight: 'semibold' }}
        onClick={() => {
          showAbout && setShowAbout(false);
          handleOnClose();
        }}
        py={2}
      >
        <Link to="/">Current List</Link>
      </Box>
      <Box _hover={{ fontWeight: 'semibold' }} onClick={handleOnClose} py={2}>
        <Link
          to="/newlist"
          onClick={() => {
            showAbout && setShowAbout(false);
          }}
        >
          New List
        </Link>
      </Box>
      <Box _hover={{ fontWeight: 'semibold' }} onClick={handleOnClose} py={2}>
        <Link
          to="/mylists"
          onClick={() => {
            showAbout && setShowAbout(false);
          }}
        >
          My Lists
        </Link>
      </Box>
      <DropDown>
        <MenuButton m={3} size="sm" as={Button} rightIcon={<ChevronDownIcon />}>
          Themes
        </MenuButton>
        <MenuList>
          {themeList.map((item, index) => (
            <MenuItem key={index}>
              <ThemeListItem
                appTheme={appTheme}
                applyTheme={applyTheme}
                key={index}
                chosenTheme={item}
              />
            </MenuItem>
          ))}
        </MenuList>
      </DropDown>
      <Box
        py={2}
        _hover={{ fontWeight: 'semibold' }}
        as="button"
        onClick={() => {
          setShowAbout(true);
          handleOnClose();
        }}
      >
        <Link to="/">About / Help</Link>
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
        _hover={{ fontWeight: 'semibold' }}
        as="button"
        py={2}
        onClick={handleOnClose}
      >
        <Link to="/contact">Contact Us</Link>
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
