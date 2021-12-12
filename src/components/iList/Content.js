import LineItem from './LineItem';
import { List } from '@chakra-ui/react';
const Content = ({
  themeObj,
  items,
  handleCheck,
  handleDelete,
  setEditItem,
}) => {
  return (
    <>
      {items.length ? (
        <List spacing="2" mb={3} p={3}>
          {items.map(item => (
            <LineItem
              setEditItem={setEditItem}
              themeObj={themeObj}
              key={item.id}
              item={item}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
            />
          ))}
        </List>
      ) : (
        <p
          style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Your list is empty
        </p>
      )}
    </>
  );
};

export default Content;
