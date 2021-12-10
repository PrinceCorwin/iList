// currently not using this. Maybe in the future

import { mode, whiten, darken } from '@chakra-ui/theme-tools';

export const Flex = {
  baseStyle: {
    mine: {
      bg: 'teal',
      color: 'white',
    },
    // filled: (props: any) => ({
    //   bg: mode('teal', whiten('teal', 20))(props),
    // }),
  },
  // default values for `size` and `variant`
  defaultProps: {
    size: '',
    variant: '',
  },
};
