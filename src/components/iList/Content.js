import LineItem from './LineItem';
import { motion } from 'framer-motion';
import { List } from '@chakra-ui/react';
const Content = ({
  themeObj,
  items,
  handleCheck,
  handleDelete,
  setEditItem,
}) => {
  // console.log(items);
  const variants = {
    // initial: {
    //   opacity: 1,
    // },
    animate: {
      transition: { when: 'beforeChildren', staggerChildren: 0.07 },
    },
  };
  const childVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  return (
    <>
      {items.length ? (
        <motion.ul
          className="w-100"
          variants={variants}
          initial="initial"
          animate="animate"
        >
          <List spacing="3" mb={3} p={3}>
            {items.map(item => (
              <motion.li key={item.id} variants={childVariants}>
                <LineItem
                  border-bottom="10px"
                  setEditItem={setEditItem}
                  themeObj={themeObj}
                  item={item}
                  handleCheck={handleCheck}
                  handleDelete={handleDelete}
                />
              </motion.li>
            ))}
          </List>
        </motion.ul>
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
