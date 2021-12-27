import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Text,
  Center,
  Button,
  Heading,
  Alert,
  AlertTitle,
  Flex,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';

const DeleteAccount = ({ user }) => {
  const handleDelete = () => {};
  return (
    <Flex p={6} justify="center" align="center" direction="column" flexGrow={1}>
      <Heading size="lg" py={3}>
        Delete {user.email}
      </Heading>
      <Alert
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={10}
        status="error"
      >
        <AlertIcon mb={3} />
        <AlertTitle>'ARE YOU SURE?'</AlertTitle>
        <AlertDescription>
          <Text color="red" textAlign="center">
            All of your data will be deleted!
          </Text>
          <Text mb={3} color="red" textAlign="center">
            This can NOT be undone!
          </Text>
          <Text mb={3}>
            Clicking 'Yes I'm Sure' will log you out, delete all of your data,
            and redirect you to the login screen
          </Text>
          <Text>
            Click 'Cancel' to keep your data and return to your current list
          </Text>
        </AlertDescription>
      </Alert>

      <Flex p={6} w="100%" justify="space-around">
        <Button colorScheme="teal" type="button" onClick={handleDelete}>
          Yes I'm Sure
        </Button>
        <Link to="/">
          <Button colorScheme="red" type="button">
            Cancel
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default DeleteAccount;
