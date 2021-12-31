import { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
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
import { iListTheme } from './styles/theme';
import { db, useAuth } from './components/auth/useAuth';

function App() {
  const [fetchError, setFetchError] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loaderLoading, setLoaderLoading] = useState(true);
  const [currentList, setCurrentList] = useState('My List');
  const [appTheme, setAppTheme] = useState('default');
  const [lists, setLists] = useState([]);
  const { user } = useAuth();

  const checkDoc = user ? db.collection('users').doc(user.uid) : null;

  // get user current list pref
  useEffect(() => {
    const getMyLists = async () => {
      try {
        const userLists = await (await checkDoc.get()).data().mylists;
        setLists(userLists);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    user && getMyLists();
  }, [currentList]);

  // get user theme pref
  useEffect(() => {
    const getUserPrefs = async () => {
      try {
        const userList = await checkDoc.get();
        setAppTheme(userList.data().currenttheme);

        // setFetchError(null);
      } catch (err) {
        // setFetchError(err.message);

        console.log(err.message);
      } finally {
        // setLoaderLoading(false);
        setIsLoading(false);
      }
    };
    // setIsLoading(false);
    user && getUserPrefs();

    // getMyLists();
  }, [user]);

  // create global theme object
  const themeColors = iListTheme.colors[appTheme];
  const themeObj = {
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

  return (
    <Router>
      <Layout
        user={user}
        setIsLoading={setIsLoading}
        setShowAbout={setShowAbout}
        isLoading={isLoading}
        appTheme={appTheme}
        setAppTheme={setAppTheme}
        themeObj={themeObj}
        currentList={currentList}
      >
        <Switch>
          <PrivateRoute exact path="/">
            <Dashboard
              user={user}
              setShowAbout={setShowAbout}
              showAbout={showAbout}
              setAppTheme={setAppTheme}
              setIsLoading={setIsLoading}
              loaderLoading={loaderLoading}
              setLoaderLoading={setLoaderLoading}
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
