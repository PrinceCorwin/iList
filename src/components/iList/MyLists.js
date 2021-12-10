import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import EachList from './EachList';

import {
  Button,
  VStack,
  Center,
  Input,
  FormControl,
  FormHelperText,
  Icon,
  Heading,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useAuth, db } from '../../hooks/useAuth';
// import NewList from './NewList';
const MyLists = ({ setIsLoading, currentList, setCurrentList, themeObj }) => {
  const inputRef = useRef();
  const [alertText2, setAlertText2] = useState('');
  const [isUnique2, setIsUnique2] = useState(true);
  const [newName2, setNewName2] = useState('');
  const history = useHistory();
  const { user } = useAuth();
  const [editList, setEditList] = useState(false);
  const [lists, setLists] = useState([]);
  const checkDoc = db.collection('users').doc(user.email);

  const getMyLists = async () => {
    try {
      const userLists = await (await checkDoc.get()).data().mylists;
      setLists(userLists);

      // console.log(userLists);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // setIsLoading(false);
    getMyLists();
    console.log('here');
  }, []);

  const handleDelete = async deletedList => {
    try {
      // update user preference array on database
      await checkDoc.update({
        mylists: firebase.firestore.FieldValue.arrayRemove(deletedList),
      });
      // set a new currentList if deleted list is the currentList
      if (currentList === deletedList) {
        const tempLists = lists.filter(item => item !== deletedList);
        setCurrentList(tempLists[0]);
        // update user pref currentlist
        await checkDoc.update({ currentlist: deletedList });
      }
      // delete list from database
      await checkDoc
        .collection(deletedList)
        .get()
        .then(function (collection) {
          if (collection.docs.length) {
            let data = collection.docs;

            console.log(data);
            // delete old list
            data.map(doc => {
              checkDoc.collection(deletedList).doc(doc.id).delete();
            });
          }
        });
    } catch (err) {
      console.log(err.message);
    } finally {
      setLists([...lists].filter(item => item !== deletedList));
      console.log(deletedList);
    }
  };

  const updateCurrentList = async newList => {
    try {
      await checkDoc.update({ currentlist: newList });
      setCurrentList(newList);
      console.log(editList);
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

  const handleSubmit = async e => {
    e.preventDefault();
    if (!newName2) return;
    // console.log('check duplicate');
    let uniqueName = true;
    try {
      // check duplicate
      await checkDoc
        .collection(newName2)
        .get()
        .then(collection => {
          if (collection.docs.length) {
            // console.log(collection);
            // console.log('exists');
            setAlertText2(newName2);
            // setIsUnique2(false);
            uniqueName = false;
          } else {
            // console.log('nope');
            // updateMyListsArray(newName, oldName);
            uniqueName = true;

            // setIsUnique2(true);
          }
        });
      // console.log(uniqueName);
      if (uniqueName) {
        await checkDoc.update({
          mylists: firebase.firestore.FieldValue.arrayUnion(newName2),
        });
        // console.log('still going');
        await checkDoc.update({
          mylists: firebase.firestore.FieldValue.arrayRemove(editList),
        });
        // console.log('about to update');
        updateLists(newName2, editList);
      }
    } catch (err) {
    } finally {
      // updateLists();
      // getMyLists();
      setEditList(false);
      setNewName2('');
    }
  };

  const updateLists = async (added, removed) => {
    const origLists = lists;
    // console.log('got here');
    const updatedLists = [...origLists.filter(item => item !== removed), added];
    // console.log(updatedLists);
    setLists(updatedLists);
    try {
      await checkDoc
        .collection(removed)
        .get()
        .then(function (collection) {
          if (collection.docs.length) {
            let data = collection.docs;

            console.log(data);
            // add new list with new name with old list's data and delete old list
            data.map(doc => {
              // add new list
              console.log(doc.data());
              checkDoc.collection(added).doc(doc.id).set(doc.data());
              // delete old list
              checkDoc.collection(removed).doc(doc.id).delete();
            });
          }
        });
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <Flex
      grow="1"
      w="400px"
      justify="start"
      direction="column"
      overflowY="auto"
    >
      {!editList && (
        <Center
          mt={6}
          w="100%"
          bg={themeObj.bg}
          color={themeObj.color}
          py={3}
          borderRadius="lg"
        >
          <VStack>
            <Heading>Your Lists</Heading>
            <Center>View, Rename, or Delete A List</Center>
          </VStack>
        </Center>
      )}
      {!editList && (
        <VStack spacing={2} w="100%" mt={6}>
          {lists.map(item => (
            <EachList
              inputRef={inputRef}
              editList={editList}
              setEditList={setEditList}
              updateCurrentList={updateCurrentList}
              handleDelete={handleDelete}
              key={lists.indexOf(item)}
              setIsLoading={setIsLoading}
              currentList={currentList}
              setCurrentList={setCurrentList}
              themeObj={themeObj}
              item={item}
            />
            //   <Box as="button" borderWidth="1px" px={3} py={1} w="100%">
            //     {item}
            //   </Box>
          ))}
        </VStack>
      )}
      {editList && (
        <Flex w="100%" grow="1">
          <form
            label="Rename List"
            onSubmit={handleSubmit}
            style={{ width: '100%' }}
          >
            <FormControl>
              <Input
                variant="outline"
                autoFocus
                // ref={inputRef}
                type="text"
                id="newName"
                placeholder="Rename List"
                required
                value={newName2}
                onChange={e => setNewName2(e.target.value)}
              />
              <FormHelperText>
                Name must not be the same as another active list
              </FormHelperText>
              <Button
                variant="solid"
                mt={4}
                //   ml={2}
                type="submit"
                aria-label="Rename List"
                color="white"
                //   color={themeObj.colorIcon}
                _hover={{
                  background: `${themeObj.checkScheme}`,
                }} // color="red"
                // bg="red.800"
                bg="black"
                //   bg={themeObj.bgIcon}
              >
                Rename
              </Button>
              <Button
                variant="solid"
                mt={4}
                //   ml={2}
                type="button"
                onClick={() => {
                  setNewName2('');
                  setEditList(false);
                  history.push('/mylists');
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
      )}
    </Flex>
  );
};

export default MyLists;
