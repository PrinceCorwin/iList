import Loader from './Loader';
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import './index.css';

import { db } from '../../hooks/useAuth';
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
// import apiRequest from './apiRequest';

const ListApp = ({ items, fetchError, isLoading }) => {
  // const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  // const [fetchError, setFetchError] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // const itemsCollection = db
  //   .collection('users')
  //   .doc(user.email)
  //   .collection('stuff');
  // itemsCollection
  //   .get()
  //   .then(doc => {
  //     if (doc.exists) {
  //       console.log('Document data:', doc.data().desc);
  //       setItems(doc.data().desc);
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log('No such document!');
  //     }
  //   })
  //   .catch(error => {
  //     console.log('Error getting document:', error);
  //   });

  // useEffect(() => {
  //   const getItems = async () => {
  //     try {
  //       const data = await itemsCollection.get();

  //       const listItems = data.docs.map(doc => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setItems(listItems);
  //       setFetchError(null);
  //     } catch (err) {
  //       setFetchError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getItems();
  // }, [itemsCollection]);

  // const addItem = async item => {
  //   const id = items.length ? Number(items[items.length - 1].id) + 1 : 1;
  //   const newItemDate = new Date();
  //   const dateStr = `${
  //     newItemDate.getMonth() + 1
  //   }/${newItemDate.getDate()}/${newItemDate.getFullYear()}`;

  //   const myNewItem = {
  //     id: id,
  //     checked: false,
  //     desc: item,
  //     date: dateStr,
  //     author: 'Steve',
  //   };
  //   // console.log(myNewItem);
  //   // const listItems = [...items, myNewItem];
  //   // setItems(listItems);

  //   await setDoc(doc(db, 'Items', `${myNewItem.id}`), {
  //     desc: myNewItem.desc,
  //     author: 'Steve',
  //     checked: false,
  //     date: dateStr,
  //   });
  // };

  // const handleCheck = async id => {
  //   // const listItems = items.map((item) =>
  //   //   item.id === id ? { ...item, checked: !item.checked } : item
  //   // );
  //   // setItems(listItems);
  //   const myItem = items.filter(item => item.id === id);
  //   // console.log(myItem[0].checked);
  //   const updatedDoc = doc(db, 'Items', id);

  //   await updateDoc(updatedDoc, {
  //     checked: !myItem[0].checked,
  //   });
  // };

  // const handleDelete = async id => {
  //   // const listItems = items.filter((item) => item.id !== id);
  //   // setItems(listItems);
  //   const deletedDoc = doc(db, 'Items', id);
  //   await deleteDoc(deletedDoc);
  // };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   if (!newItem) return;
  //   addItem(newItem);
  //   setNewItem('');
  // };

  return (
    <main>
      {isLoading && <Loader />}

      {fetchError && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}

      {!fetchError && !isLoading && <Content items={items} />}
    </main> // <div className="App">
    //   <Header title="i&sdot;Need Stuff!" />
    //   <AddItem
    //     newItem={newItem}
    //     setNewItem={setNewItem}
    //     handleSubmit={handleSubmit}
    //   />
    //   <SearchItem search={search} setSearch={setSearch} />
    //   <main>
    //     {isLoading && <Loader />}
    //     {fetchError && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}
    //     {!fetchError && !isLoading && (
    //       <Content
    //         items={items.filter(item =>
    //           item.desc.toLowerCase().includes(search.toLowerCase())
    //         )}
    //         handleDelete={handleDelete}
    //         handleCheck={handleCheck}
    //       />
    //     )}
    //   </main>
    //   <Footer length={items.length} />
    // </div>
  );
};

export default ListApp;
