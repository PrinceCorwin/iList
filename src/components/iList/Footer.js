import { Flex, Text } from '@chakra-ui/react';
import checkbox3 from '../../images/checkbox3.png';
const Footer = ({ user, bg, color, length }) => {
  const str = user.email;
  const nameParts = str.split('@');
  const emailName = nameParts.length == 2 ? nameParts[0] : null;
  return (
    // <Flex
    //   bg={bg}
    //   color={color}
    //   width="100%"
    //   justifyContent="space-between"
    //   py={1}
    //   px={3}
    // >
    <div
      className="flexrow-between-center w-100 py-1 px-3"
      style={{ color: color, backgroundColor: bg }}
    >
      <div>
        <img className="d-i w-20px" src={checkbox3} alt="iList logo" />
        <p className="d-i"> iLIST</p>
      </div>
      <p>
        {length} {length === 1 ? 'item' : 'items'}
      </p>

      <Text align="end" w="250px" isTruncated>
        {user.email ? emailName : 'Demo Mode'}
      </Text>
    </div>
    // </Flex>
  );
};

export default Footer;
