import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = ({ setUserColorMode }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = colorMode === 'dark' ? 'orange.200' : 'orange';
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const iconColor = useColorModeValue('black', 'white');
  // toggleColorMode();

  const handleClick = () => {
    setUserColorMode(colorMode === 'light' ? 'dark' : 'light');
    toggleColorMode();
  };

  return (
    <IconButton
      size="md"
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
