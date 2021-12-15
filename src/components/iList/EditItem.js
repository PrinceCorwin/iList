import React, { useState } from 'react';
import { db } from '../../hooks/useAuth';

import {
  Button,
  Input,
  Center,
  FormControl,
  Flex,
  Heading,
} from '@chakra-ui/react';

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

  const [newDesc, setNewDesc] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(editItem);
      console.log(newDesc);
      console.log(currentList);
      console.log(editItem.id);
      await checkDoc
        .collection(currentList)
        .doc(`${editItem.id}`)
        .update({ desc: newDesc });

      const editedList = items.map(item =>
        item.id === editItem.id ? { ...item, desc: newDesc } : item
      );
      setItems(editedList);
      console.log(editedList);
      setNewDesc(`${editItem.desc}`);

      setEditItem(null);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <Flex w="100%" grow="1" direction="column" p={6}>
      <Center
        mb="1rem"
        borderRadius="lg"
        p={3}
        bg={themeObj.bg}
        color={themeObj.color}
      >
        <Heading size="md">Edit Item Description</Heading>
      </Center>
      <Center
        mb="1rem"
        borderRadius="lg"
        p={3}
        bg={themeObj.bgItem}
        color={themeObj.colorItem}
      >
        {newDesc.length ? newDesc : editItem.desc}
      </Center>
      <form
        label="New Item Description"
        onSubmit={handleSubmit}
        style={{ width: '100%' }}
      >
        <FormControl>
          <Input
            required
            variant="outline"
            autoFocus
            // ref={inputRef}
            type="text"
            id="newDesc"
            color="{themeObj.colorItem}"
            bg={themeObj.bgItem}
            placeholder="New Item Description"
            required
            value={newDesc}
            onChange={e => setNewDesc(e.target.value)}
          />
          <Flex mt={4} w="50%" justify="space-between">
            <Button
              variant="solid"
              mt={4}
              type="submit"
              aria-label="Rename List"
              color={themeObj.colorIcon}
              _hover={{
                background: `${themeObj.deleteIcon}`,
              }}
              bg={themeObj.bgIcon}
            >
              Update
            </Button>
            <Button
              variant="solid"
              mt={4}
              type="button"
              onClick={() => {
                setEditItem(null);
                setNewDesc(`${editItem.desc}`);
              }}
              aria-label="cancel"
              color={themeObj.colorIcon}
              _hover={{
                background: `${themeObj.deleteIcon}`,
              }}
              bg="red"
            >
              Cancel
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Flex>
  );
};

export default EditItem;
