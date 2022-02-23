import Backdrop from './Backdrop';
import {
  Button,
  Input,
  FormControl,
  FormHelperText,
  Heading,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
export const EditListModal = ({
  themeObj,
  handleSubmit,
  editList,
  newName2,
  setNewName2,
  setAlertText2,
  setEditList,
  alertText2,
}) => {
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
        <Heading size="md" py={3}>
          Rename Your List
        </Heading>
        <form
          label="Rename List"
          onSubmit={handleSubmit}
          style={{ width: '100%' }}
        >
          <FormControl>
            <Input
              variant="outline"
              autoFocus
              autoComplete="off"
              type="text"
              id="newName"
              placeholder={`Rename ${editList}`}
              isRequired
              value={newName2}
              onChange={e => setNewName2(e.target.value)}
              bg={themeObj.bgItem}
            />
            <FormHelperText>
              New name can not match another existing list
            </FormHelperText>
            <Flex mt={4} w="70%" justify="space-between">
              <Button
                variant="solid"
                type="submit"
                aria-label="Rename List"
                colorScheme="green"
              >
                Rename
              </Button>
              <Button
                variant="solid"
                type="button"
                onClick={() => {
                  setAlertText2(null);
                  setNewName2('');
                  setEditList(false);
                }}
                aria-label="cancel"
                colorScheme="red"
              >
                Cancel
              </Button>
            </Flex>
          </FormControl>
          {alertText2 && (
            <Alert status="error" variant="subtle" mt={6} mb={6}>
              <AlertIcon />
              {alertText2}
            </Alert>
          )}
        </form>
      </motion.div>
    </>
  );
};
