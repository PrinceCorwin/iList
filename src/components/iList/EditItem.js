import { useState } from 'react';
import { db } from '../auth/useAuth';
import AddEditModal from './AddEditModal';

const EditItem = ({
  handleDelete,
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
  const handleUpdate = async e => {
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
      <AddEditModal
        id={editItem.id}
        handleDelete={handleDelete}
        heading="Edit Item"
        themeObj={themeObj}
        newItem={newDesc}
        setterItem={setNewDesc}
        handleSubmit={handleUpdate}
        setterShow={setEditItem}
      />
    </>
  );
};

export default EditItem;
