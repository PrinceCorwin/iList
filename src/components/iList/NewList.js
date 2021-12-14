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

const NewList = ({ setIsLoading, currentList, setCurrentList, themeObj }) => {
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
      console.log(currentList);
    }
  };

  const updateMyListsArray = async newList => {
    try {
      await checkDoc.update({
        mylists: firebase.firestore.FieldValue.arrayUnion(newList),
        // myLists: checkDoc.mylists.arrayUnion('My List'),
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
    <Flex grow="1" justify="center" direction="column">
      {!isUnique && (
        <Alert status="error" variant="subtle" mt={6} mb={6}>
          <AlertIcon />
          You already have a list named {alertText}
        </Alert>
      )}

      {/* display alert if list already exists */}

      <Heading size="md" py={3}>
        Name Your List
      </Heading>
      <form label="New List" onSubmit={handleSubmit} style={{ width: '100%' }}>
        <FormControl>
          <Input
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
            Name must not be the same as another active list
          </FormHelperText>
          <Button
            variant="solid"
            mt={4}
            //   ml={2}
            type="submit"
            aria-label="Add Item"
            color="white"
            //   color={themeObj.colorIcon}
            _hover={{
              background: `${themeObj.checkScheme}`,
            }} // color="red"
            // bg="red.800"
            bg="black"
            //   bg={themeObj.bgIcon}
          >
            Add
          </Button>
          <Button
            variant="solid"
            mt={4}
            //   ml={2}
            type="button"
            onClick={() => {
              setNewList('');
              history.push('/');
            }}
            aria-label="cancel"
            color="white"
            //   color={themeObj.colorIcon}
            _hover={{
              background: `${themeObj.checkScheme}`,
            }} // color="red"
            // bg="red.800"
            bg="red"
            //   bg={themeObj.bgIcon}
          >
            Cancel
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
};

export default NewList;
