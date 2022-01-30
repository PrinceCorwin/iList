import { useForm } from 'react-hook-form';
import iListLogo from '../../images/checkbox2.png';
import { useHistory } from 'react-router-dom';
import {
  Center,
  Text,
  Image,
  Heading,
  Flex,
  Alert,
  AlertIcon,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';

import { useAuth } from './useAuth';

const LoginForm = () => {
  const { handleSubmit, register, errors, setError, formState } = useForm();
  const history = useHistory();

  const { sendSignInLinkToEmail, signInAnonymously } = useAuth();

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

  const onDemo = async () => {
    try {
      await signInAnonymously();

      history.push('/');
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: error.message,
      });
    }
  };

  return (
    <Flex
      w="100%"
      // p={6}
      grow="1"
      // bg="blue"
      justify="center"
      align="center"
      // maxWidth="350px"
      direction="column"
    >
      <Flex
        mb={6}
        // bg="green"
        direction="column"
        // justify="center"
        // align="center"
      >
        <Flex justify="flex-start" align="center" p={3}>
          <Image mr={3} htmlWidth="40px" src={iListLogo} alt="iList logo" />
          <Heading lineHeight="100%" as="h2" size="lg">
            iLIST - Personal List App
          </Heading>
        </Flex>
        <Text textAlign="center" p={2}>
          Make a List, Check it Once
        </Text>
        {/* <Text>
          Login to create your custom lists available across all devices
        </Text> */}
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
          <Alert status="info" my={3} py={1} px={3}>
            <AlertIcon />
            We will never share or sell your info
          </Alert>
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
      <Text fontStyle="italic" mt={6}>
        Or, give iLIST a test run...
      </Text>
      <Flex mt={3} align="center" p={3} bg="lightgray" borderRadius="lg">
        <Button
          colorScheme="red"
          onClick={() => {
            onDemo();
            // signInAnonymously();
          }}
        >
          Demo
        </Button>
        <Flex
          direction="column"
          justify="center"
          align="center"
          p={3}
          color="black"
        >
          <Text>User data will not be saved.</Text>
          <Text> Account deleted after 2 hours.</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginForm;
