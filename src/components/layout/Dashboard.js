import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { SearchIcon, AddIcon } from '@chakra-ui/icons';
import firebase from 'firebase/app';
import EditItem from '../iList/EditItem';
import Loader from '../iList/Loader';
import SearchItem from '../iList/SearchItem';
import Content from '../iList/Content';
import About from '../iList/About';
import Footer from '../iList/Footer';
import { db } from '../auth/useAuth';
import 'firebase/firestore';
import AddEditModal from '../iList/AddEditModal';
const Dashboard = ({
  showSearch,
  setShowSearch,
  showAdd,
  setShowAdd,
  editItem,
  setEditItem,
  setUserInit,
  user,
  showAbout,
  setShowAbout,
  setIsLoading,
  isLoading,
  setFetchError,
  themeObj,
  currentList,
}) => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  // const [editItem, setEditItem] = useState(null);

  const [newItem, setNewItem] = useState('');

  const checkDoc = db.collection('users').doc(user.uid);

  const itemsCollection = db
    .collection('users')
    .doc(user.uid)
    .collection(currentList);

  // initialize new user
  useEffect(() => {
    const checkIfInitialized = async () => {
      try {
        checkDoc.get().then(doc => {
          if (doc.exists) {
            setUserInit(true);
          } else {
            // doc.data() will be undefined in this case
            console.log('Initializing new user!');
            initializeUserDb();
          }
        });

        // setFetchError(null);
      } catch (err) {
        console.log(err.message);
      }
    };
    checkIfInitialized();
  }, []);

  // const checkIfInitialized = () => {
  //   checkDoc
  //     .get()
  //     .then(doc => {
  //       if (doc.exists) {
  //         setUserInit(true);
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log('Initializing new user!');
  //         initializeUserDb();
  //       }
  //     })
  //     .catch(error => {
  //       console.log('Error getting document:', error);
  //     });
  // };

  const initializeUserDb = async () => {
    await checkDoc
      .set({
        currentlist: currentList,
        mylists: firebase.firestore.FieldValue.arrayUnion('My List'),
        currenttheme: 'default',
        email: user.email,
        colormode: 'light',
        createdate: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log('initialUser successfully written!');
      })
      .then(setUserInit(true))
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await itemsCollection.orderBy('id', 'desc').get();

        // console.log(data.docs.length);

        const listItems = data.docs.map(doc => ({
          ...doc.data(),
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
  }, [currentList]);

  const addItem = async item => {
    const id = items.length ? Number(items[0].id) + 1 : 1;
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
    const listItems = [myNewItem, ...items];
    setItems(listItems);
    const addedDoc = checkDoc.collection(currentList).doc(`${myNewItem.id}`);
    await addedDoc
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

    // const updatedDoc = db
    //   .collection('users')
    //   .doc(user.uid)
    //   .collection(currentList)
    //   .doc(`${id}`);

    const updatedDoc = checkDoc.collection(currentList).doc(`${id}`);

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
    const deletedDoc = checkDoc.collection(currentList).doc(`${id}`);
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
    showAdd && setShowAdd(false);
    showSearch && setShowSearch(false);
  };

  return (
    <>
      {showAbout && <About setShowAbout={setShowAbout} themeObj={themeObj} />}

      {!showAbout && (
        <>
          <AnimatePresence>
            {editItem && (
              <EditItem
                handleDelete={handleDelete}
                items={items}
                setItems={setItems}
                currentList={currentList}
                user={user}
                editItem={editItem}
                setEditItem={setEditItem}
                themeObj={themeObj}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showAdd && (
              <AddEditModal
                heading="Add Item"
                themeObj={themeObj}
                newItem={newItem}
                setterItem={setNewItem}
                handleSubmit={handleSubmit}
                setterShow={setShowAdd}
              />
            )}
          </AnimatePresence>
          {showSearch && (
            <SearchItem
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              themeObj={themeObj}
              search={search}
              setSearch={setSearch}
            />
          )}
          <Flex
            w="100%"
            flexDirection="column"
            flexGrow="1"
            justifyContent="flex-start"
            align-items="center"
            overflowY="auto"
          >
            {isLoading && <Loader />}

            {!isLoading && (
              <>
                <Flex
                  bg={themeObj.bgApp}
                  position="sticky"
                  top="0"
                  justifyContent="space-between"
                  py={3}
                  zIndex={988}
                >
                  <Heading px={3} as="h1" w="100%">
                    {currentList}
                  </Heading>
                  <Flex>
                    <IconButton
                      size="sm"
                      m={1}
                      variant="ghost"
                      aria-label="Add Item"
                      icon={<AddIcon />}
                      onClick={() => {
                        setShowAdd(!showAdd);
                      }}
                    />
                    <IconButton
                      size="sm"
                      m={1}
                      variant="ghost"
                      aria-label="Search Items"
                      icon={<SearchIcon />}
                      onClick={() => {
                        setShowSearch(!showSearch);
                      }}
                    />
                  </Flex>
                </Flex>
                <Content
                  setEditItem={setEditItem}
                  themeObj={themeObj}
                  items={items.filter(item =>
                    item.desc.toLowerCase().includes(search.toLowerCase())
                  )}
                  handleDelete={handleDelete}
                  handleCheck={handleCheck}
                />
              </>
            )}
          </Flex>
        </>
      )}

      <Footer
        user={user}
        bg={themeObj.bg}
        color={themeObj.color}
        length={items.length}
      />
    </>
  );
};

export default Dashboard;
