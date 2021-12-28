import { Link } from 'react-router-dom';
import { useAuth, db } from '../auth/useAuth';
import {
  Text,
  Button,
  Heading,
  Alert,
  AlertTitle,
  Flex,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';

const DeleteAccount = ({ user, lists, setLists }) => {
  const { logout } = useAuth();
  const checkDoc = db.collection('users').doc(user.uid);

  const handleDelete = async () => {
    let listCount = lists.length - 1;
    lists.forEach(list => {
      deleteList(list, listCount);
      listCount--;
    });
  };

  const deleteList = async (deletedList, listCount) => {
    try {
      // delete list from database
      await checkDoc
        .collection(deletedList)
        .get()
        .then(function (collection) {
          if (collection.docs.length) {
            let data = collection.docs;
            console.log(data);
            data.forEach(doc => {
              checkDoc.collection(deletedList).doc(doc.id).delete();
            });
          }
        });
    } catch (err) {
      console.log(err.message);
    } finally {
      setLists([...lists].filter(item => item !== deletedList));

      if (listCount === 0) {
        await checkDoc.delete();
        logout();
      }
    }
  };
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
        <AlertTitle>ARE YOU SURE?</AlertTitle>
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
