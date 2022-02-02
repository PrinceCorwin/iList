import { Flex } from '@chakra-ui/react';
import { ContentNav } from './ContentNav';
const Layout = ({
  editItem,
  setEditItem,
  user,
  setIsLoading,
  setUserColorMode,
  showAbout,
  setShowAbout,
  isLoading,
  appTheme,
  setAppTheme,
  themeObj,
  children,
  currentList,
}) => {
  return (
    <Flex
      bg={themeObj.bgApp}
      overflow="visible"
      position="relative"
      top="0"
      left="0"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      w="100vw"
      maxW="500px"
      border="1px"
      borderColor="teal.600"
      m="auto"
    >
      <ContentNav
        editItem={editItem}
        setEditItem={setEditItem}
        showAbout={showAbout}
        setShowAbout={setShowAbout}
        appTheme={appTheme}
        setAppTheme={setAppTheme}
        user={user}
        setUserColorMode={setUserColorMode}
        themeObj={themeObj}
      />

      {children}
    </Flex>
  );
};

export default Layout;
