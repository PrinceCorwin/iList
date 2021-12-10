import React from 'react';
import { Heading, Flex } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <Flex grow="1" justify="center" direction="column">
      <Heading as="h1" mb={6}>
        404: Page not found
      </Heading>
    </Flex>
  );
};

export default NotFound;
