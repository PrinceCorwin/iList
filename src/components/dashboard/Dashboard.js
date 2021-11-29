import React from 'react';
import { InputGroup, Stack, Flex } from '@chakra-ui/react';
import Loader from '../iList/Loader';
import AddItem from '../iList/AddItem';
import SearchItem from '../iList/SearchItem';
import Content from '../iList/Content';
import Footer from '../iList/Footer';
import { useAuth, db } from '../../hooks/useAuth';
import { useState, useEffect } from 'react';

const Dashboard = ({ bg, color, currentList, setCurrentList }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newItem, setNewItem] = useState('');

  const addItem = async item => {
    const id = items.length ? Number(items[items.length - 1].id) + 1 : 1;
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
      .doc(user.email)
      .collection('stuff')
      .doc(`${myNewItem.id}`);
    await addedDoc
      .set({ desc: myNewItem.desc, checked: false, date: dateStr })
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
    const updatedDoc = db
      .collection('users')
      .doc(user.email)
      .collection('stuff')
      .doc(id);
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
      .doc(user.email)
      .collection('stuff')
      .doc(id);
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

  const itemsCollection = db
    .collection('users')
    .doc(user.email)
    .collection('stuff');

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await itemsCollection.get();

        const listItems = data.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getItems();
  }, []);
  const fetchCurrentList = db.collection('users').doc(user.email);
  useEffect(() => {
    const getCurrentList = async () => {
      try {
        const userList = await fetchCurrentList.get({ currentList });
        setCurrentList(userList.data().currentList);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);

        console.log(err.message);
      }
    };
    getCurrentList();
  }, []);
  return (
    <>
      <Stack mb={3} w="100%" p={3}>
        <InputGroup>
          <AddItem
            newItem={newItem}
            setNewItem={setNewItem}
            handleSubmit={handleSubmit}
          />
        </InputGroup>
        <InputGroup>
          <SearchItem search={search} setSearch={setSearch} />
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
        {isLoading && <Loader />}

        {fetchError && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}

        {!fetchError && !isLoading && (
          <Content
            items={items.filter(item =>
              item.desc.toLowerCase().includes(search.toLowerCase())
            )}
            handleDelete={handleDelete}
            handleCheck={handleCheck}
          />
        )}
      </Flex>
      <Footer bg={bg} color={color} length={items.length} />
    </>
  );
};

export default Dashboard;
