import { Heading, Flex } from '@chakra-ui/react';

const NotFound = ({ themeObj, setAppTheme, setIsLoading }) => {
  return (
    <Flex grow="1" justify="center" direction="column">
      <Heading as="h1" mb={6}>
        404: Page not found
      </Heading>
    </Flex>
  );
};

export default NotFound;
