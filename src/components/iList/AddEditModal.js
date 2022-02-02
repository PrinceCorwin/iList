import { Button, Heading, Textarea, Flex } from '@chakra-ui/react';
import Backdrop from './Backdrop';
import { motion } from 'framer-motion';

const AddEditModal = ({
  heading,
  themeObj,
  newItem,
  setterItem,
  handleSubmit,
  setterShow,
}) => {
  return (
    <>
      <Backdrop />

      <motion.div
        key="modal"
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ x: '100vw' }}
        style={{
          display: 'flex',
          borderRadius: '5px',
          backgroundColor: themeObj.bgItem,
          flexDirection: 'column',
          width: '400px',
          position: 'absolute',
          zIndex: 2000,
          padding: '20px 20px',
          top: '100px',
          left: '20px',
        }}
        // borderRadius={5}
        // direction="column"
        // // label="Add Item"
        // // onSubmit={handleSubmit}
        // bg={themeObj.bgItem}
        // // mx={3}
        // w="400px"
        // py={3}
        // px={4}
        // position="absolute"
        // zIndex="2000"
        // top="100px"
        // left="20px"
      >
        {/* <InputGroup> */}
        <Heading size="md" color={themeObj.colorItem} mb={3} key="heading">
          {heading}
        </Heading>
        <Textarea
          key="texarea"
          bg={themeObj.bgItem}
          color={themeObj.colorItem}
          autoFocus
          autoComplete="off"
          id="addItem"
          placeholder="Item Description"
          isRequired
          value={newItem}
          onChange={e => setterItem(e.target.value)}
        />
        <Flex w="60%" justifyContent="space-between" mt={3} key="flex">
          <Button
            key="button1"
            size="sm"
            variant="solid"
            aria-label="Rename List"
            colorScheme="green"
            onClick={handleSubmit}
          >
            {heading}
          </Button>
          <Button
            key="button2"
            size="sm"
            variant="solid"
            onClick={() => {
              setterShow(null);
            }}
            aria-label="cancel"
            colorScheme="red"
          >
            Cancel
          </Button>
        </Flex>
      </motion.div>
    </>
  );
};

export default AddEditModal;
