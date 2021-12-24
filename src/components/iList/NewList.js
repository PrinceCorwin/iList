import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import {
  Input,
  Button,
  FormControl,
  FormHelperText,
  Heading,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useAuth, db } from '../../hooks/useAuth';

const NewList = ({
  setIsLoading,
  currentList,
  setAppTheme,
  setCurrentList,
  themeObj,
}) => {
  const history = useHistory();
  const { user } = useAuth();
  const [alertText, setAlertText] = useState('');
  const [newList, setNewList] = useState('');
  const inputRef = useRef();
  const [isUnique, setIsUnique] = useState(true);

  const checkDoc = db.collection('users').doc(user.uid);

  const checkDuplicate = async newList => {
    await checkDoc
      .collection(newList)
      .get()
      .then(collection => {
        if (collection.docs.length) {
          console.log(collection);
          console.log('exists');
          setAlertText(newList);
          setIsUnique(false);
        } else {
          updateCurrentList(newList);
          updateMyListsArray(newList);
          setIsUnique(true);
        }
      })

      .catch(error => {
        console.log('Error getting document:', error);
      });
  };

  useEffect(() => {
    // temp fix. try moving this function from dashboard useEffect to App level useEffect. Use conditional if(user)?
    const getUserPrefs = async () => {
      try {
        const userList = await checkDoc.get();
        setAppTheme(userList.data().currenttheme);

        // setFetchError(null);
      } catch (err) {
        // setFetchError(err.message);

        console.log(err.message);
      } finally {
        // setLoaderLoading(false);
        setIsLoading(false);
      }
    };
    // setIsLoading(false);
    getUserPrefs();
    setIsLoading(false);
  }, []);

  const updateCurrentList = async newList => {
    try {
      await checkDoc.update({ currentlist: newList });
      setNewList('');
      setCurrentList(newList);
      history.push('/');

      //   setLoaderLoading(true);
      setIsLoading(false);
      //   setFetchError(null);
    } catch (err) {
      //   setFetchError(err.message);
      console.log(err.message);
    } finally {
    }
  };

  const updateMyListsArray = async newList => {
    try {
      await checkDoc.update({
        mylists: firebase.firestore.FieldValue.arrayUnion(newList),
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      console.log(newList);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!newList) return;
    checkDuplicate(newList);
    setNewList('');
  };

  return (
    <Flex grow="1" justify="center" direction="column" width="400px">
      <Flex direction="column" h="250px">
        <Heading size="md" py={3}>
          Name Your New List
        </Heading>
        <form
          label="New List"
          onSubmit={handleSubmit}
          style={{ width: '100%' }}
        >
          <FormControl>
            <Input
              bg={themeObj.bgItem}
              color={themeObj.colorItem}
              variant="outline"
              autoFocus
              ref={inputRef}
              type="text"
              id="newList"
              placeholder="New List Name"
              required
              value={newList}
              onChange={e => setNewList(e.target.value)}
            />
            <FormHelperText>
              New list name can not match another existing list
            </FormHelperText>
            <Flex mt={4} w="50%" justify="space-between">
              <Button
                variant="solid"
                type="submit"
                aria-label="Add Item"
                color={themeObj.colorIcon}
                _hover={{
                  background: `${themeObj.deleteIcon}`,
                }}
                bg={themeObj.bgIcon}
              >
                Add
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setNewList('');
                  history.push('/');
                }}
                aria-label="cancel"
                color={themeObj.colorIcon}
                _hover={{
                  background: `${themeObj.deleteIcon}`,
                }}
                bg="red"
              >
                Cancel
              </Button>
            </Flex>
          </FormControl>
        </form>
        {!isUnique && (
          <Alert status="error" variant="subtle" mt={6} mb={6}>
            <AlertIcon />
            You already have a list named {alertText}
          </Alert>
        )}
      </Flex>
    </Flex>
  );
};

export default NewList;
