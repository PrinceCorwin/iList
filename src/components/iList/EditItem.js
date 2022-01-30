import { useState } from 'react';
import { db } from '../auth/useAuth';

import {
  Button,
  Input,
  Text,
  Center,
  FormControl,
  Flex,
  Heading,
} from '@chakra-ui/react';
import Backdrop from './Backdrop';
import AddEditModal from './AddEditModal';

const EditItem = ({
  user,
  items,
  setItems,
  setEditItem,
  currentList,
  editItem,
  themeObj,
}) => {
  const checkDoc = db.collection('users').doc(user.uid);

  const [newDesc, setNewDesc] = useState(editItem.desc);
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await checkDoc
        .collection(currentList)
        .doc(`${editItem.id}`)
        .update({ desc: newDesc })
        .then(() => {
          console.log('Document successfully updated!');
        });

      const editedList = items.map(item =>
        item.id === editItem.id ? { ...item, desc: newDesc } : item
      );
      setItems(editedList);
      setNewDesc(`${editItem.desc}`);

      setEditItem(null);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <>
      <Backdrop />
      <AddEditModal
        heading="Edit Item"
        show="edit"
        themeObj={themeObj}
        newItem={newDesc}
        setterItem={setNewDesc}
        handleSubmit={handleSubmit}
        setterShow={setEditItem}
      />
    </>
  );
};

export default EditItem;
