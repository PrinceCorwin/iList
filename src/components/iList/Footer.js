import { Flex } from '@chakra-ui/react';

const Footer = ({ bg, color, length }) => {
  return (
    <Flex
      bg={bg}
      color={color}
      width="100%"
      justifyContent="space-between"
      py={1}
      px={3}
    >
      <p>
        {length} List {length === 1 ? 'item' : 'items'}
      </p>
      <p>iList &copy; 2021 </p>
    </Flex>
  );
};

export default Footer;
