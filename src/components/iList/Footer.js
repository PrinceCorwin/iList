import { Flex, Text } from '@chakra-ui/react';

const Footer = ({ user, bg, color, length }) => {
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
      <Text align="end" w="250px" isTruncated>
        {user.email ? user.email : 'Demo Mode'}
      </Text>
    </Flex>
  );
};

export default Footer;
