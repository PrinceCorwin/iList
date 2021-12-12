import React from 'react';
import { useForm } from 'react-hook-form';
import firebase from 'firebase/app';

import {
  Heading,
  Flex,
  Alert,
  AlertIcon,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAuth, db } from '../../hooks/useAuth';

const ConfirmForm = ({ currentList }) => {
  const { handleSubmit, register, errors, setError, formState } = useForm();

  const { signInWithEmailLink } = useAuth();

  const history = useHistory();

  const location = useLocation();

  const onSubmit = async data => {
    try {
      await signInWithEmailLink(data.email, location.search);

      // checkIfInitialized(data.email);
      // initializeUserDb(data.email);

      history.push('/');
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: error.message,
      });
    }
  };
  // const checkIfInitialized = email => {
  //   const docRef = db.collection('users').doc(email);

  //   docRef
  //     .get()
  //     .then(doc => {
  //       if (doc.exists) {
  //         console.log('Document data:', doc.data());
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log('No such document!');
  //         initializeUserDb(email);
  //       }
  //     })
  //     .catch(error => {
  //       console.log('Error getting document:', error);
  //     });
  // };

  // const initializeUserDb = async email => {
  //   const firstEntry = db.collection('users').doc(email);

  //   await firstEntry
  //     .set({
  //       currentlist: currentList,
  //       mylists: firebase.firestore.FieldValue.arrayUnion('My List'),
  //       currenttheme: 'default',
  //       email: email,
  //     })
  //     .then(() => {
  //       console.log('currentlist successfully written!');
  //     })
  //     .catch(error => {
  //       console.error('Error writing document: ', error);
  //     });
  // };

  return (
    <Flex grow="1" justify="center" direction="column">
      <Heading as="h1" mb={6}>
        Confirm Email
      </Heading>
      {errors.email && (
        <Alert status="error" variant="subtle" mt={6} mb={6}>
          <AlertIcon />
          {errors.email.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input name="email" placeholder="Email" ref={register()} />
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
};

export default ConfirmForm;
