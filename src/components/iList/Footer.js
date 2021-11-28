import { Flex } from '@chakra-ui/react';

const Footer = ({ length }) => {
  return (
    <Flex width="100%" justifyContent="space-between" p={3}>
      <p>
        {length} List {length === 1 ? 'item' : 'items'}
      </p>
      <p>Copyright &copy; 2021 </p>
    </Flex>
  );
};

export default Footer;
