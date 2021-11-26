import React from 'react';
import { Heading, GridItem, Text } from '@chakra-ui/react';
import ListApp from '../iList/ListApp';
import { useAuth, db } from '../../hooks/useAuth';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
  });

  return (
    <GridItem
      colStart={[1, null, null, 2, null, null]}
      colSpan={[3, null, null, 1, null, null]}
      p={6}
    >
      <Heading as="h1" mb={6}>
        Dashboard
      </Heading>
      <Text fontSize="lg" mb={3}>
        Welcome, {user.email}!
      </Text>
      {/* <Text>{items.length}</Text> */}
      <ListApp
        items={items}
        user={user}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </GridItem>
  );
};

export default Dashboard;
