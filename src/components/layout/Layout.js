import { Flex } from '@chakra-ui/react';
import Nav from './Nav';
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
      overflow="hidden"
      position="relative"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      w="100%"
      maxW="500px"
      border="1px"
      borderColor="teal.600"
      m="auto"
    >
      {/* <Nav
        user={user}
        setIsLoading={setIsLoading}
        setShowAbout={setShowAbout}
        isLoading={isLoading}
        appTheme={appTheme}
        setAppTheme={setAppTheme}
        themeObj={themeObj}
        currentList={currentList}
      /> */}
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
