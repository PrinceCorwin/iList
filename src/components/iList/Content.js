import LineItem from './LineItem';
import { List, Flex } from '@chakra-ui/react';

const Content = ({ items, handleCheck, handleDelete }) => {
  // console.log(items.length);
  return (
    <>
      {items.length ? (
        <List spacing="2" mb={3} p={3}>
          {items.map(item => (
            <LineItem
              key={item.id}
              item={item}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          ))}
        </List>
      ) : (
        // <ItemList
        //   items={items}
        //   // handleCheck={handleCheck}
        //   // handleDelete={handleDelete}
        // />
        <p style={{ marginTop: '2rem' }}>Your list is empty</p>
      )}
    </>
  );
};

export default Content;
