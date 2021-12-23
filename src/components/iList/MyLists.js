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
  Box,
  Heading,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useAuth, db } from '../../hooks/useAuth';
// import NewList from './NewList';
const MyLists = ({
  setIsLoading,
  currentList,
  setAppTheme,
  setCurrentList,
  themeObj,
}) => {
  const inputRef = useRef();
  const [finalListError, setFinalListError] = useState(false);
  const [alertText2, setAlertText2] = useState(null);
  const [isUnique2, setIsUnique2] = useState(true);
  const [newName2, setNewName2] = useState('');
  const history = useHistory();
  const { user } = useAuth();
  const [editList, setEditList] = useState(false);
  const [lists, setLists] = useState([]);
  const checkDoc = db.collection('users').doc(user.uid);

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

    getMyLists();
  }, []);

  const handleDelete = async deletedList => {
    if (lists.length < 2) {
      setFinalListError(true);
      return;
    }
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
              return checkDoc.collection(deletedList).doc(doc.id).delete();
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
            uniqueName = false;
            setAlertText2(`You already have a list named ${newName2}`);
          } else {
            uniqueName = true;
          }
        });
      if (uniqueName) {
        await checkDoc.update({
          mylists: firebase.firestore.FieldValue.arrayUnion(newName2),
        });
        await checkDoc.update({
          mylists: firebase.firestore.FieldValue.arrayRemove(editList),
        });
        console.log('about to update');
        updateLists(newName2, editList);
        setAlertText2(null);
        setNewName2('');
        setEditList(false);
      }
    } catch (err) {
      setAlertText2(err.message);
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
            data.forEach(doc => {
              // add new list
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
          {lists.map(list => (
            <EachList
              setFinalListError={setFinalListError}
              lists={lists}
              inputRef={inputRef}
              editList={editList}
              setEditList={setEditList}
              updateCurrentList={updateCurrentList}
              handleDelete={handleDelete}
              key={lists.indexOf(list)}
              setIsLoading={setIsLoading}
              currentList={currentList}
              setCurrentList={setCurrentList}
              themeObj={themeObj}
              list={list}
            />
            //   <Box as="button" borderWidth="1px" px={3} py={1} w="100%">
            //     {list}
            //   </Box>
          ))}
        </VStack>
      )}
      {finalListError && (
        <Alert status="error" variant="subtle" mt={6} mb={6}>
          <AlertIcon />
          Final List May Only Be Edited, Not Deleted
        </Alert>
      )}
      {editList && (
        <Flex grow="1" justify="center" direction="column">
          <Flex direction="column" h="250px">
            <Heading size="md" py={3}>
              Rename Your List
            </Heading>
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
                  placeholder={`Rename ${editList}`}
                  required
                  value={newName2}
                  onChange={e => setNewName2(e.target.value)}
                  bg={themeObj.bgItem}
                />
                <FormHelperText>
                  New name can not match another existing list
                </FormHelperText>
                <Flex mt={4} w="50%" justify="space-between">
                  <Button
                    variant="solid"
                    //   ml={2}
                    type="submit"
                    aria-label="Rename List"
                    color={themeObj.colorIcon}
                    _hover={{
                      background: `${themeObj.deleteIcon}`,
                    }}
                    bg={themeObj.bgIcon}
                  >
                    Rename
                  </Button>
                  <Button
                    variant="solid"
                    //   ml={2}
                    type="button"
                    onClick={() => {
                      setAlertText2(null);
                      setNewName2('');
                      setEditList(false);
                    }}
                    aria-label="cancel"
                    color="white"
                    //   color={themeObj.colorIcon}
                    _hover={{
                      background: `${themeObj.deleteIcon}`,
                    }} // color="red"
                    // bg="red.800"
                    bg="red"
                    //   bg={themeObj.bgIcon}
                  >
                    Cancel
                  </Button>
                </Flex>
              </FormControl>
              {alertText2 && (
                <Alert status="error" variant="subtle" mt={6} mb={6}>
                  <AlertIcon />
                  {alertText2}
                </Alert>
              )}
            </form>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default MyLists;
