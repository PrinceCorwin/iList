import { useState } from 'react';
import firebase from 'firebase/app';
import EachList from '../components/iList/EachList';

import {
  Button,
  VStack,
  Center,
  Input,
  FormControl,
  FormHelperText,
  Heading,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { db } from '../components/auth/useAuth';
const MyLists = ({
  lists,
  setLists,
  user,
  setIsLoading,
  currentList,
  setCurrentList,
  themeObj,
}) => {
  const [finalListError, setFinalListError] = useState(false);
  const [alertText2, setAlertText2] = useState(null);
  const [newName2, setNewName2] = useState('');
  const history = useHistory();
  const [editList, setEditList] = useState(false);

  const checkDoc = db.collection('users').doc(user.uid);

  const handleDelete = async deletedList => {
    if (lists.length < 2) {
      setFinalListError(true);
      return;
    }
    try {
      // update user preference array on database
      await checkDoc
        .update({
          mylists: firebase.firestore.FieldValue.arrayRemove(deletedList),
        })
        .then(() => {
          console.log('List deleted from listname array on database!');
        });
      // set a new currentList if deleted list is the currentList
      if (currentList === deletedList) {
        const tempLists = lists.filter(item => item !== deletedList);
        setCurrentList(tempLists[0]);
        // update user pref currentlist
        await checkDoc.update({ currentlist: tempLists[0] }).then(() => {
          console.log('Current list successfully updated on database!');
        });
      }
      // delete list from database
      await checkDoc
        .collection(deletedList)
        .get()
        .then(function (collection) {
          if (collection.docs.length) {
            let data = collection.docs;
            // console.log(data);

            // delete old list
            data.map(doc => {
              return checkDoc.collection(deletedList).doc(doc.id).delete();
            });
          }
        })
        .then(() => {
          console.log('List successfully deleted from database!');
        });
    } catch (err) {
      console.log(err.message);
    } finally {
      setLists([...lists].filter(item => item !== deletedList));
    }
  };

  const updateCurrentList = async newList => {
    try {
      await checkDoc.update({ currentlist: newList }).then(() => {
        console.log('Current list successfully updated on database!');
      });
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

  const handleSubmit = async e => {
    e.preventDefault();
    if (!newName2) return;
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
        // add new list to user mylists array on firebase
        await checkDoc
          .update({
            mylists: firebase.firestore.FieldValue.arrayUnion(newName2),
          })
          .then(() => {
            console.log('New list name added to listname array on database!');
          });
        // remove old list name from firebase
        await checkDoc
          .update({
            mylists: firebase.firestore.FieldValue.arrayRemove(editList),
          })
          .then(() => {
            console.log(
              'Old list name removed from listname array on database!'
            );
          });
        if (currentList === editList) {
          setCurrentList(newName2);
        }
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
    const updatedLists = [...origLists.filter(item => item !== removed), added];
    setLists(updatedLists);
    try {
      await checkDoc
        .collection(removed)
        .get()
        .then(function (collection) {
          if (collection.docs.length) {
            let data = collection.docs;
            // add new list with new name with old list's data and delete old list
            data.forEach(doc => {
              // add new list
              checkDoc.collection(added).doc(doc.id).set(doc.data());
              // delete old list
              checkDoc.collection(removed).doc(doc.id).delete();
            });
          }
        })
        .then(() => {
          console.log('List name successfully updated on database!');
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
        <>
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
              <Center>Click List Name to View, Edit, or Delete</Center>
            </VStack>
          </Center>
          <VStack spacing={2} w="100%" my={6}>
            {lists.map(list => (
              <EachList
                finalListError={finalListError}
                setFinalListError={setFinalListError}
                setEditList={setEditList}
                updateCurrentList={updateCurrentList}
                key={lists.indexOf(list)}
                handleDelete={handleDelete}
                themeObj={themeObj}
                list={list}
              />
            ))}
          </VStack>
          <Button
            alignSelf="center"
            w="50%"
            bg={themeObj.bg}
            color={themeObj.color}
            _hover={{ bg: themeObj.color, color: themeObj.bg }}
            onClick={() => history.push('/newlist')}
          >
            Create New List
          </Button>
        </>
      )}

      {finalListError && (
        <Alert status="error" variant="subtle" mt={6} mb={6}>
          <AlertIcon />
          Final List May Only Be Edited, Not Deleted
        </Alert>
      )}
      {editList && (
        <Flex grow="1" justify="center" direction="column" p={6}>
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
                  autoComplete="off"
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
                    type="submit"
                    aria-label="Rename List"
                    colorScheme="green"
                  >
                    Rename
                  </Button>
                  <Button
                    variant="solid"
                    type="button"
                    onClick={() => {
                      setAlertText2(null);
                      setNewName2('');
                      setEditList(false);
                    }}
                    aria-label="cancel"
                    colorScheme="red"
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
