import { useState } from 'react';
import { db } from '../auth/useAuth';

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
            variant="outline"
            autoFocus
            autoComplete="off"
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
              // color="#F7FAFC"
              colorScheme="green"
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
              // color="#F7FAFC"
              // _hover={{
              //   background: `${themeObj.deleteIcon}`,
              // }}
              colorScheme="red"
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
