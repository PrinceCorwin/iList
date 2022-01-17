import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { db } from '../auth/useAuth';

export const ColorModeSwitcher = ({ user, setUserColorMode }) => {
  const checkDoc = db.collection('users').doc(user.uid);
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = colorMode === 'dark' ? 'orange.200' : 'orange';
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const iconColor = useColorModeValue('black', 'white');
  // toggleColorMode();

  const handleClick = async () => {
    setUserColorMode(colorMode === 'light' ? 'dark' : 'light');
    toggleColorMode();
    await checkDoc.update({
      colormode: colorMode === 'light' ? 'dark' : 'light',
    });
  };

  return (
    <IconButton
      size="sm"
      // h="15px"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      _hover={{
        background: bg,
      }}
      variant="ghost"
      color={iconColor}
      marginLeft="2"
      onClick={handleClick}
      icon={<SwitchIcon />}
      // {...props}
    />
  );
};
