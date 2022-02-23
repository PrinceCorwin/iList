import { useState, useEffect } from 'react';
import { theme } from './components/iList/Theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import ConfirmForm from './components/auth/ConfirmForm';
import PrivateRoute from './components/layout/PrivateRoute';
import Dashboard from './components/layout/Dashboard';
import NewList from './pages/NewList';
import MyLists from './pages/MyLists';
import Contact from './pages/Contact';
import DeleteAccount from './components/iList/DeleteAccount';
import NotFound from './pages/NotFound';
import { useColorModeValue } from '@chakra-ui/react';
import { db, useAuth } from './components/auth/useAuth';

function App() {
  const [fetchError, setFetchError] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [userColorMode, setUserColorMode] = useState('dark');
  const [userInit, setUserInit] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [loaderLoading, setLoaderLoading] = useState(true);
  const [currentList, setCurrentList] = useState('My List');
  const [appTheme, setAppTheme] = useState('default');
  const [lists, setLists] = useState([]);
  const { user } = useAuth();

  // create global theme object
  const themeColors = theme[appTheme];
  const themeObj = {
    bgApp: useColorModeValue(themeColors.bgAppLight, themeColors.bgAppDark),

    bg: useColorModeValue(themeColors.bgLight, themeColors.bgDark),

    color: useColorModeValue(themeColors.colorLight, themeColors.colorDark),

    bgIcon: useColorModeValue(themeColors.bgIconLight, themeColors.bgIconDark),

    colorIcon: useColorModeValue(
      themeColors.colorIconLight,
      themeColors.colorIconDark
    ),

    strike: useColorModeValue(
      themeColors.strikeLineLight,
      themeColors.strikeLineDark
    ),

    strikeText: useColorModeValue(
      themeColors.strikeTextLight,
      themeColors.strikeTextDark
    ),

    colorItem: useColorModeValue(
      themeColors.colorItemLight,
      themeColors.colorItemDark
    ),

    added: useColorModeValue(themeColors.addedLight, themeColors.addedDark),

    bgItem: useColorModeValue(themeColors.bgItemLight, themeColors.bgItemDark),

    checkScheme: useColorModeValue(
      themeColors.checkSchemeLight,
      themeColors.checkSchemeDark
    ),

    deleteIcon: useColorModeValue(
      themeColors.deleteIconLight,
      themeColors.deleteIconDark
    ),

    deleteOutline: useColorModeValue(
      themeColors.deleteOutlineLight,
      themeColors.deleteOutlineDark
    ),
  };
  // end theme object

  const checkDoc = user ? db.collection('users').doc(user.uid) : null;

  // get user prefs
  useEffect(() => {
    const getUserPrefs = async () => {
      try {
        // fetch user prefs and set pref states
        const userPrefs = await checkDoc.get();
        setAppTheme(userPrefs.data().currenttheme);
        setLists(userPrefs.data().mylists);
        setUserColorMode(userPrefs.data().colorMode);
        setCurrentList(userPrefs.data().currentlist);
        // console.log('app useEffect');
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);

        console.log(err.message);
      } finally {
        // setLoaderLoading(false);
        // setIsLoading(false);
      }
    };
    // setIsLoading(false);
    userInit && getUserPrefs();

    // getMyLists();
  }, [userInit]);

  return (
    <Router>
      <Layout
        editItem={editItem}
        setEditItem={setEditItem}
        setUserColorMode={setUserColorMode}
        user={user}
        showAbout={showAbout}
        setShowAbout={setShowAbout}
        appTheme={appTheme}
        setAppTheme={setAppTheme}
        themeObj={themeObj}
      >
        <Switch>
          <PrivateRoute exact path="/">
            <Dashboard
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              showAdd={showAdd}
              setShowAdd={setShowAdd}
              editItem={editItem}
              setEditItem={setEditItem}
              appTheme={appTheme}
              setUserInit={setUserInit}
              setUserColorMode={setUserColorMode}
              user={user}
              setShowAbout={setShowAbout}
              showAbout={showAbout}
              setAppTheme={setAppTheme}
              setIsLoading={setIsLoading}
              // loaderLoading={loaderLoading}
              // setLoaderLoading={setLoaderLoading}
              isLoading={isLoading}
              fetchError={fetchError}
              setFetchError={setFetchError}
              themeObj={themeObj}
              currentList={currentList}
              setCurrentList={setCurrentList}
            />
          </PrivateRoute>

          <PrivateRoute path="/newlist">
            <NewList
              lists={lists}
              setLists={setLists}
              user={user}
              setAppTheme={setAppTheme}
              setIsLoading={setIsLoading}
              themeObj={themeObj}
              currentList={currentList}
              setCurrentList={setCurrentList}
            />
          </PrivateRoute>
          <PrivateRoute path="/mylists">
            <MyLists
              lists={lists}
              setLists={setLists}
              user={user}
              setIsLoading={setIsLoading}
              themeObj={themeObj}
              currentList={currentList}
              setCurrentList={setCurrentList}
            />
          </PrivateRoute>
          <PrivateRoute path="/contact">
            <Contact
              lists={lists}
              setLists={setLists}
              user={user}
              setIsLoading={setIsLoading}
              themeObj={themeObj}
              currentList={currentList}
              setCurrentList={setCurrentList}
            />
          </PrivateRoute>
          <PrivateRoute path="/delete_account">
            <DeleteAccount
              lists={lists}
              setLists={setLists}
              user={user}
              setAppTheme={setAppTheme}
              setIsLoading={setIsLoading}
              themeObj={themeObj}
              currentList={currentList}
              setCurrentList={setCurrentList}
            />
          </PrivateRoute>

          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/confirm">
            <ConfirmForm />
          </Route>
          {/* if no other route is found by now, the <NotFound> component will render */}
          <Route>
            <NotFound
              themeObj={themeObj}
              setAppTheme={setAppTheme}
              setIsLoading={setIsLoading}
            />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
