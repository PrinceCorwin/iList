import React from 'react';
import { useForm } from 'react-hook-form';
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

import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const { handleSubmit, register, errors, setError, formState } = useForm();

  const { sendSignInLinkToEmail } = useAuth();

  const onSubmit = async data => {
    try {
      await sendSignInLinkToEmail(data.email);
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  return (
    <Flex grow="1" justify="center" direction="column">
      <Heading as="h1" mb={6}>
        Login
      </Heading>
      {errors.email && (
        <Alert status="error" variant="subtle" mt={6} mb={6}>
          <AlertIcon />
          {errors.email.message}
        </Alert>
      )}
      {formState.isSubmitSuccessful && (
        <Alert status="success" variant="subtle" mt={6} mb={6}>
          <AlertIcon />
          Check your email to complete login!
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

export default LoginForm;
