// currently not using this. Maybe in the future

import { extendTheme } from '@chakra-ui/react';

export const tealTheme = extendTheme({
  components: {
    Box: {
      baseStyle: {
        bg: 'red',
        color: 'white',
      },
    },
  },
});
