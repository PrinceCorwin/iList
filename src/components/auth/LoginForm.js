import { useForm } from 'react-hook-form';
import iListLogo from '../../images/checkbox2.png';
import {
  Text,
  Image,
  Center,
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
import { iListTheme } from '../../styles/theme';

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
      <Flex mb={6} direction="column" justify="center" align="center">
        <Flex justify="center" alignItems="flex-end" p={3}>
          <Image mr={3} htmlWidth="40px" src={iListLogo} alt="iList logo" />
          <Heading lineHeight="100%" as="h2" size="lg">
            iLIST - Personal List App
          </Heading>
        </Flex>
        <Text p={2}>Make a List, Check it Once</Text>
        <Text>
          Login to create your custom lists available across all devices
        </Text>
      </Flex>
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
          <Input autoFocus name="email" placeholder="Email" ref={register()} />
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
