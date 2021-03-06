import {
  Button,
  Heading,
  Textarea,
  Flex,
  Alert,
  AlertIcon,
  IconButton,
  AlertTitle,
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
        className="modal"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ x: '100vw' }}
        style={{
          backgroundColor: themeObj.bgItem,
        }}
      >
        <Heading size="md" color={themeObj.colorItem} mb={3}>
          {heading}
        </Heading>
        <Textarea
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
        <Flex mt={3} alignItems="center" justifyContent="space-around">
          <Button
            size="sm"
            variant="solid"
            aria-label={heading}
            colorScheme="green"
            onClick={handleSubmit}
          >
            {heading}
          </Button>
          <Button
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
        {showAlert && (
          <Alert status="error" justifyContent="space-between" mt={3}>
            <AlertIcon />
            <AlertTitle>Confirm Delete</AlertTitle>

            <Button
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
