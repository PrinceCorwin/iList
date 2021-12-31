import {
  IconButton,
  Button,
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
          devices. Simply login on new device using the same email. We will
          NEVER share your data!
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
      <VStack py={3} spacing={3}>
        <Heading>How It Works...</Heading>
        <Heading alignSelf="flex-start" size="sm">
          After Login
        </Heading>
        <Text p={3} bg={themeObj.bgItem} color={themeObj.colorItem}>
          After login, you will remain logged in on current device until
          "Logout" is selected in menu. Each time you open the app, your lists
          and preferences will be synced
        </Text>
        <Text p={3} bg={themeObj.bgItem} color={themeObj.colorItem}>
          The first time you login, a default list will be created named "My
          List"
        </Text>
        <Heading alignSelf="flex-start" size="sm">
          Add and Edit List Items
        </Heading>
        <Text p={3} bg={themeObj.bgItem} color={themeObj.colorItem}>
          You may immediately begin adding items to 'My List' by typing the
          description into the 'Add Item' input field at the top of the page
        </Text>
        <Text p={3} bg={themeObj.bgItem} color={themeObj.colorItem}>
          Added list items may be edited by clicking on the description text or
          deleted by clicking the Trash Can icon to the right of the description
        </Text>
        <Text p={3} bg={themeObj.bgItem} color={themeObj.colorItem}>
          Check the list items as complete by clicking the checkbox to the left
          of the description
        </Text>
        <Heading alignSelf="flex-start" size="sm">
          Edit List Name
        </Heading>
        <Text p={3} bg={themeObj.bgItem} color={themeObj.colorItem}>
          List names can be changed by clicking "My Lists" in the menu
          (hamburger menu - top, left) and clicking the Edit icon to the right
          of the list name
        </Text>
        <Text p={3} bg={themeObj.bgItem} color={themeObj.colorItem}>
          Lists may also be deleted on the "My Lists" page by clicking the Trash
          Can icon to the right of the Edit icon (list can not be deleted if it
          is the only remaining list, but it's name can still be changed)
        </Text>
        <Heading alignSelf="flex-start" size="sm">
          View or Create New List
        </Heading>
        <Text p={3} bg={themeObj.bgItem} color={themeObj.colorItem}>
          To change which list is currently being viewed on home page, click "My
          Lists" and select the list you want to view or edit
        </Text>
        <Text p={3} bg={themeObj.bgItem} color={themeObj.colorItem}>
          Create a new list by clicking hamburger menu (top, left) and selecting
          "New List". New list name may not be the same as another of your
          existing lists. A warning will appear on screen if a duplicate list is
          attempted
        </Text>
        <Text p={3} bg={themeObj.bgItem} color={themeObj.colorItem}>
          When a new list is created, it will become the current list. You will
          be returned to the home page ready to add items to that list
        </Text>
        <Heading alignSelf="flex-start" size="sm">
          Change App Theme
        </Heading>
        <Text p={3} bg={themeObj.bgItem} color={themeObj.colorItem}>
          Click "Themes" in menu to select one of the beautiful included themes.
          Your selection will be saved to your account preferences until another
          is selected
        </Text>
        <Heading alignSelf="flex-start" size="sm">
          Logout or Delete Account
        </Heading>
        <Text p={3} bg={themeObj.bgItem} color={themeObj.colorItem}>
          You may logout or delete your account in the menu. WARNING: Deleting
          account can NOT be undone. All data will be lost
        </Text>{' '}
        <Heading alignSelf="flex-start" size="sm">
          Contact Us
        </Heading>
        <Text p={3} bg={themeObj.bgItem} color={themeObj.colorItem}>
          Thank you for choosing iList. Feel free to contact us with any issues
          or suggestions by selecting "Contact Us" in the menu.
        </Text>
        <Button colorScheme="green" w="10rem">
          Close
        </Button>
      </VStack>
    </Flex>
  );
};

export default About;
