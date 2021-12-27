import {
  IconButton,
  Link,
  Button,
  Text,
  VStack,
  HStack,
  Heading,
  Flex,
  Image,
  Center,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
const About = ({ setShowHow, themeObj }) => {
  return (
    <Flex
      position="relative"
      w="100%"
      px={6}
      py={2}
      flexDirection="column"
      flexGrow="1"
      justifyContent="flex-start"
      align-items="space-between"
      overflowY="auto"
    >
      coming
      {/* <Button
        bg={themeObj.bg}
        color={themeObj.color}
        py={1}
        onClick={() => setShowAbout(false)}
      >
        Close
      </Button> */}
    </Flex>
  );
};

export default About;
