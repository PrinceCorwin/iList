import {
  Button,
  Heading,
  Textarea,
  Flex,
  Alert,
  AlertIcon,
  IconButton,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import Backdrop from './Backdrop';
import { motion } from 'framer-motion';

const AddEditModal = ({
  id,
  handleDelete,
  heading,
  themeObj,
  newItem,
  setterItem,
  handleSubmit,
  setterShow,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <>
      <Backdrop />

      <motion.div
        // key="modal"
        className="modal"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ x: '100vw' }}
        style={{
          backgroundColor: themeObj.bgItem,
        }}
      >
        <Heading
          size="md"
          color={themeObj.colorItem}
          mb={3}
          //  key="heading"
        >
          {heading}
        </Heading>
        <Textarea
          // key="texarea"
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
        <Flex mt={3}>
          <Flex
            w="60%"
            justifyContent="space-between"
            align="center"
            // key="flex"
          >
            <Button
              // key="button1"
              size="sm"
              variant="solid"
              aria-label={heading}
              colorScheme="green"
              onClick={handleSubmit}
            >
              {heading}
            </Button>
            <Button
              // key="button2"
              size="sm"
              variant="solid"
              onClick={() => {
                // setShowAlert(false);
                setterShow(null);
              }}
              aria-label="cancel"
              colorScheme="red"
            >
              Cancel
            </Button>
          </Flex>
          <Flex w="40%" justify="end" align="center">
            {heading === 'Edit Item' && (
              <IconButton
                size="lg"
                aria-label={`Delete ${newItem}`}
                variant="outline"
                border="none"
                colorScheme={themeObj.bg}
                icon={<FaTrashAlt />}
                onClick={() => {
                  setShowAlert(true);
                }}
              />
            )}
          </Flex>
        </Flex>
        {showAlert && (
          <Alert status="error" justifyContent="space-between" mt={3}>
            <AlertIcon />
            <AlertTitle>Confirm Delete</AlertTitle>
            {/* <AlertDescription>This Can Not Be Undone!</AlertDescription> */}
            <Button
              // key="button1"
              // justifySelf="end"
              size="sm"
              variant="solid"
              aria-label="Delete Item"
              colorScheme="red"
              onClick={() => {
                handleDelete(id);
                setterShow(null);
              }}
            >
              Delete
            </Button>
          </Alert>
        )}
      </motion.div>
    </>
  );
};

export default AddEditModal;
