import React from 'react';
import { Box } from '@chakra-ui/react';

const Backdrop = () => {
  return (
    <Box
      w="100%"
      h="100%"
      bg="black"
      opacity=".5"
      position="absolute"
      zIndex="1000"
    ></Box>
  );
};

export default Backdrop;
