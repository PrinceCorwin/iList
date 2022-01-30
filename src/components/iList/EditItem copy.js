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
      <Flex
        w="100%"
        bg={themeObj.bg}
        direction="column"
        p={6}
        borderRadius="lg"
        alignItems="flex-start"
      >
        <Heading size="lg" color={themeObj.color}>
          Edit Item Description
        </Heading>
        {/* </Center> */}
        <Text
          mb="1rem"
          borderRadius="lg"
          py={3}
          // bg={themeObj.bgItem}
          // color={themeObj.colorItem}
          bg={themeObj.bg}
          color={themeObj.color}
        >
          Item Desc: {newDesc.length ? newDesc : editItem.desc}
        </Text>
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
            <Flex justifyContent="flex-start">
              <Button
                variant="solid"
                mt={8}
                mr={8}
                type="submit"
                aria-label="Rename List"
                // color="#F7FAFC"
                colorScheme="green"
              >
                Update
              </Button>
              <Button
                variant="solid"
                mt={8}
                // mr={3}
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
    </Flex>
  );
};

export default EditItem;
