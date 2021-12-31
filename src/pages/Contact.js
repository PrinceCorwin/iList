import { useState } from 'react';
import { db } from '../components/auth/useAuth';
import { useHistory } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Textarea,
  Button,
  Text,
  Heading,
  Flex,
  Center,
} from '@chakra-ui/react';
const Contact = ({ user, themeObj }) => {
  const [feedback, setFeedback] = useState('');
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    const newItemDate = new Date();
    const dateStr = `${
      newItemDate.getMonth() + 1
    }/${newItemDate.getDate()}/${newItemDate.getFullYear()}`;

    const newFeedback = {
      user: user.email,
      desc: feedback,
      date: dateStr,
    };
    await db
      .collection('feedback')
      .add(newFeedback)
      .then(() => {
        console.log('Document successfully written!');
      });
    try {
    } catch (err) {
      console.log(err.message);
    } finally {
      setShowAlert(true);
    }
  };

  const handleInputChange = e => {
    let inputValue = e.target.value;
    setFeedback(inputValue);
  };
  return (
    <Center flexDir="column" flexGrow={1}>
      {showAlert && (
        <Alert status="success" mb={3}>
          <AlertIcon />
          <AlertTitle mr={2}>Comment Sent!</AlertTitle>
          <AlertDescription>Thank you for your feedback</AlertDescription>
        </Alert>
      )}
      <Flex
        // color="black"
        // bg={themeObj.color}
        direction="column"
        justify="center"
        align="center"
        p={6}
        border="2px solid lightgrey"
      >
        <Heading mb={2}>Contact Us</Heading>
        <Text mb={6}>We take all feedback, good or bad, seriously</Text>
        <form
          label="Contact Us"
          onSubmit={handleSubmit}
          style={{ width: '100%' }}
        >
          <Flex direction="column" justify="center" align="center">
            <Textarea
              isRequired
              //   bg="white"
              w="350px"
              value={feedback}
              onChange={handleInputChange}
              placeholder="Type issue or suggestion here"
              size="lg"
            />
            <Flex mt={4} w="75%" justify="space-between">
              <Button
                variant="solid"
                type="submit"
                aria-label="Submit suggestion"
                colorScheme="green"
              >
                Submit
              </Button>
              <Button
                variant="solid"
                type="button"
                onClick={() => {
                  setFeedback('');
                  setShowAlert(false);
                  history.push('/');
                }}
                aria-label="cancel"
                colorScheme="red"
              >
                Cancel
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Center>
  );
};

export default Contact;
