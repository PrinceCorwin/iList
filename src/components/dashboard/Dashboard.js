import React, { useState, useEffect } from 'react';
import { InputGroup, Stack, Flex } from '@chakra-ui/react';
import firebase from 'firebase/app';
import EditItem from '../iList/EditItem';
import Loader from '../iList/Loader';
import AddItem from '../iList/AddItem';
import SearchItem from '../iList/SearchItem';
import Content from '../iList/Content';
import Footer from '../iList/Footer';
import { useAuth, db } from '../../hooks/useAuth';
import 'firebase/firestore';

const Dashboard = ({
  setAppTheme,
  loaderLoading,
  setLoaderLoading,
  setIsLoading,
  isLoading,
  fetchError,
  setFetchError,
  themeObj,
  currentList,
  setCurrentList,
}) => {
  console.log(currentList);
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState(null);

  const [newItem, setNewItem] = useState('');

  const checkDoc = db.collection('users').doc(user.uid);

  const itemsCollection = db
    .collection('users')
    .doc(user.uid)
    .collection(currentList);

  // initialize new user
  useEffect(() => {
    checkIfInitialized();
    const getUserPrefs = async () => {
      try {
        const userList = await checkDoc.get();
        setCurrentList(userList.data().currentlist);
        setAppTheme(userList.data().currenttheme);

        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);

        console.log(err.message);
      } finally {
        setLoaderLoading(false);
        setIsLoading(false);
      }
    };
    getUserPrefs();
  }, []);

  const checkIfInitialized = () => {
    const docRef = db.collection('users').doc(user.uid);

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
          initializeUserDb();
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  };

  const initializeUserDb = async () => {
    const firstEntry = db.collection('users').doc(user.uid);

    await firstEntry
      .set({
        currentlist: currentList,
        mylists: firebase.firestore.FieldValue.arrayUnion('My List'),
        currenttheme: 'default',
        email: user.email,
      })
      .then(() => {
        console.log('currentlist successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await itemsCollection.orderBy('id').get();

        const listItems = data.docs.map(doc => ({
          ...doc.data(),
          // id: doc.id,
        }));
        console.log(listItems);

        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoaderLoading(false);
      }
    };
    getItems();
  }, [currentList]);

  const addItem = async item => {
    const id = items.length ? Number(items[items.length - 1].id) + 1 : 1;
    console.log(id);
    const newItemDate = new Date();
    const dateStr = `${
      newItemDate.getMonth() + 1
    }/${newItemDate.getDate()}/${newItemDate.getFullYear()}`;

    const myNewItem = {
      id: id,
      checked: false,
      desc: item,
      date: dateStr,
    };
    const listItems = [...items, myNewItem];
    setItems(listItems);
    const addedDoc = db
      .collection('users')
      .doc(user.uid)
      .collection(currentList)
      .doc(`${myNewItem.id}`);
    await addedDoc
      // .set({ desc: myNewItem.desc, checked: false, date: dateStr })
      .set({ ...myNewItem })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  };

  const handleCheck = async id => {
    const listItems = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    const myItem = items.filter(item => item.id === id);
    console.log(myItem);

    const updatedDoc = db
      .collection('users')
      .doc(user.uid)
      .collection(currentList)
      .doc(`${id}`);
    console.log('here');

    await updatedDoc
      .update({
        checked: !myItem[0].checked,
      })
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch(error => {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };
  const handleDelete = async id => {
    const listItems = items.filter(item => item.id !== id);
    setItems(listItems);
    const deletedDoc = db
      .collection('users')
      .doc(user.uid)
      .collection(currentList)
      .doc(`${id}`);
    await deletedDoc
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  };

  return (
    <>
      {editItem && (
        <EditItem
          items={items}
          setItems={setItems}
          currentList={currentList}
          user={user}
          editItem={editItem}
          setEditItem={setEditItem}
          themeObj={themeObj}
        />
      )}

      {!editItem && (
        <>
          <Stack mb={3} w="100%" p={3}>
            <InputGroup>
              <AddItem
                themeObj={themeObj}
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
              />
            </InputGroup>
            <InputGroup>
              <SearchItem
                themeObj={themeObj}
                search={search}
                setSearch={setSearch}
              />
            </InputGroup>
          </Stack>
          <Flex
            w="100%"
            flexDirection="column"
            flexGrow="1"
            justifyContent="flex-start"
            align-items="center"
            overflowY="auto"
          >
            {(isLoading || loaderLoading) && <Loader />}

            {fetchError && (
              <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>
            )}

            {!fetchError && !loaderLoading && !isLoading && (
              <Content
                setEditItem={setEditItem}
                themeObj={themeObj}
                items={items.filter(item =>
                  item.desc.toLowerCase().includes(search.toLowerCase())
                )}
                handleDelete={handleDelete}
                handleCheck={handleCheck}
              />
            )}
          </Flex>
        </>
      )}

      <Footer bg={themeObj.bg} color={themeObj.color} length={items.length} />
    </>
  );
};

export default Dashboard;
