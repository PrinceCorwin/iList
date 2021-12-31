import { Box, Image, Center } from '@chakra-ui/react';
import checkMark from '../../images/checkbox3.png';
const ThemeListItem = ({ appTheme, applyTheme, chosenTheme }) => {
  return (
    <Box
      _hover={{ fontWeight: 'semibold' }}
      // as="button"
      w="100%"
      onClick={() => {
        applyTheme(chosenTheme.name.toLowerCase());
      }}
    >
      <Center
        position="relative"
        // w="100%"
        color={chosenTheme.color}
        bg={chosenTheme.bg}
      >
        {chosenTheme.name}
        {appTheme === chosenTheme.name.toLowerCase() && (
          <Image
            position="absolute"
            top="50%"
            transform="translateY(-50%)"
            right="5px"
            w="20px"
            src={checkMark}
            // alt="Checkmark"
          />
        )}
      </Center>
    </Box>
  );
};

export default ThemeListItem;
