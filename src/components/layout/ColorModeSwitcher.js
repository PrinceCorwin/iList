import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  // const [currentColorMode, setCurrentColorMode] = useState('light');
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = colorMode === 'dark' ? 'orange.200' : 'orange';
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      _hover={{
        background: bg,

        // background: 'orange',
        // color: 'black',
      }}
      variant="ghost"
      color="black"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};
