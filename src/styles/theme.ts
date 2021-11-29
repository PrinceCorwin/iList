import { extendTheme } from '@chakra-ui/react';
// import { Flex } from './components/Flex';

export const tealTheme = extendTheme({
  components: {
    Box: {
      baseStyle: {
        bg: 'teal',
        color: 'white',
      },
    },
  },
});
