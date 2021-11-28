import Loader from './Loader';
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import './index.css';

import { db } from '../../hooks/useAuth';

import { useState, useEffect } from 'react';
// import apiRequest from './apiRequest';

const ListApp = ({ items, user, setItems, fetchError, isLoading }) => {
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

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
    console.log(myNewItem.id);

    console.log(myNewItem);
    const listItems = [...items, myNewItem];
    console.log(listItems);
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

  return (
    <div className="App">
      <main>
        <Header title="i&sdot;Need Stuff!" />
        <AddItem
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />
        <SearchItem search={search} setSearch={setSearch} />

        {isLoading && <Loader />}

        {fetchError && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}

        {!fetchError && !isLoading && (
          <Content
            items={items}
            handleDelete={handleDelete}
            handleCheck={handleCheck}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
};

export default ListApp;
