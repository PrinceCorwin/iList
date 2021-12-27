import {
  IconButton,
  Link,
  Text,
  VStack,
  HStack,
  Heading,
  Flex,
  Image,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
const About = ({ setShowAbout, themeObj }) => {
  return (
    <Flex
      position="relative"
      w="100%"
      px={6}
      flexDirection="column"
      flexGrow="1"
      justifyContent="flex-start"
      align-items="space-between"
      overflowY="auto"
    >
      <IconButton
        size="xs"
        position="fixed"
        top="4rem"
        right="2rem"
        colorScheme="red"
        aria-label="Close Window"
        icon={<CloseIcon />}
        onClick={() => setShowAbout(false)}
      />
      <Flex justifyContent="space-around" mb={6}>
        <VStack spacing={3} alignItems="flex-start">
          <Heading size="lg" py={3}>
            About iList...
          </Heading>
          <Heading size="md">We all make lists.</Heading>
          <VStack spacing={1} alignItems="flex-start">
            <Text>✅ Groceries</Text>
            <Text>✅ To Do</Text>
            <Text>✅ Travel Plans</Text>
            <Text>✅ The options are endless</Text>
          </VStack>
        </VStack>
        <Center w="150px">
          <Image
            // bg="red"
            // w="200px"
            // objectFit="fit"
            src="https://github.com/PrinceCorwin/iList/blob/main/src/images/stacked-lists.png?raw=true"
            alt="Stacked Lists"
          />
        </Center>
      </Flex>
      <Heading size="md" mb={3}>
        Create custom lists with an elegant, modern UI.
      </Heading>
      <VStack spacing={1} alignItems="flex-start" mb={3}>
        <Text>
          🏗️ Built with React, Chakra UI, Firebase.{' '}
          <Link
            color={useColorModeValue('blue', 'cyan')}
            href="https://github.com/PrinceCorwin/iList"
            isExternal
          >
            View code
          </Link>
        </Text>
        <Text>
          💪 Lightweight, stable, and purpose driven... without the bloat
          commonly found in other note-taking apps
        </Text>
        <Text>
          🖼️ Customizable and personal with integrated modern themes, each
          including Dark Mode
        </Text>
        <Text>
          🔐 User data and preferences (i.e selected theme) available across all
          devices. Simply login on new device using the same email
        </Text>
        <Text>
          🔥 Data/preference storage and Passwordless Login with Firebase (user
          email required). Safe, Simple, Secure
        </Text>
      </VStack>
      <HStack mb={3}>
        <Text>Tech Used:</Text>
        <Link
          href="https://developer.mozilla.org/en-US/docs/Web/HTML"
          isExternal
        >
          <Image
            alt="HTML5"
            width="26px"
            src="https://github.com/PrinceCorwin/Useful-tech-icons/blob/main/images/HTML.png?raw=true"
          />
        </Link>
        <Link
          href="https://developer.mozilla.org/en-US/docs/Web/CSS"
          isExternal
        >
          <Image
            alt="CSS3"
            width="26px"
            src="https://github.com/PrinceCorwin/Useful-tech-icons/blob/main/images/css.png?raw=true"
          />
        </Link>
        <Link href="https://chakra-ui.com/" isExternal>
          <Image
            alt="Chakra UI"
            width="26px"
            src="https://github.com/PrinceCorwin/Useful-tech-icons/blob/main/images/Chakra.png?raw=true"
          />
        </Link>
        <Link
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
          isExternal
        >
          <Image
            alt="JavaScript"
            width="26px"
            src="https://github.com/PrinceCorwin/Useful-tech-icons/blob/main/images/javascript.png?raw=true"
          />
        </Link>
        <Link href="https://reactjs.org/" isExternal>
          <Image
            alt="React"
            width="26px"
            src="https://github.com/PrinceCorwin/Useful-tech-icons/blob/main/images/react.png?raw=true"
          />
        </Link>
        <Link href="https://firebase.google.com/" isExternal>
          <Image
            alt="Firebase"
            width="26px"
            src="https://github.com/PrinceCorwin/Useful-tech-icons/blob/main/images/firebase-logo.png?raw=true"
          />
        </Link>
        <Link href="https://git-scm.com/doc" isExternal>
          <Image
            alt="Git"
            width="26px"
            src="https://github.com/PrinceCorwin/Useful-tech-icons/blob/main/images/git-logo-minimal.png?raw=true"
          />
        </Link>
      </HStack>
    </Flex>
  );
};

export default About;
