import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import ConfirmForm from './components/auth/ConfirmForm';
import PrivateRoute from './components/route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import NewList from './components/iList/NewList';
import MyLists from './components/iList/MyLists';
import DeleteAccount from './components/iList/DeleteAccount';
import NotFound from './components/layout/NotFound';
import { useColorModeValue } from '@chakra-ui/react';
import { iListTheme } from './styles/theme';
import { db, useAuth } from './hooks/useAuth';

function App() {
  const [fetchError, setFetchError] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showHow, setShowHow] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loaderLoading, setLoaderLoading] = useState(true);
  const [currentList, setCurrentList] = useState('My List');
  const [appTheme, setAppTheme] = useState('default');

  // these variables give the actual color value instead of the color name. Required for certain instances like colorscheme when the name won't work
  const checkSchemeDark = iListTheme.colors[appTheme].checkSchemeDark;
  const checkSchemeLight = iListTheme.colors[appTheme].checkSchemeLight;
  const strikeLineDark = iListTheme.colors[appTheme].strikeLineDark;
  const strikeLineLight = iListTheme.colors[appTheme].strikeLineLight;
  const strikeTextDark = iListTheme.colors[appTheme].strikeTextDark;
  const strikeTextLight = iListTheme.colors[appTheme].strikeTextLight;
  const colorItemDark = iListTheme.colors[appTheme].colorItemDark;
  const colorItemLight = iListTheme.colors[appTheme].colorItemLight;
  const bgDark = iListTheme.colors[appTheme].bgDark;
  const bgLight = iListTheme.colors[appTheme].bgLight;
  const bgItemDark = iListTheme.colors[appTheme].bgItemDark;
  const bgItemLight = iListTheme.colors[appTheme].bgItemLight;

  const { user } = useAuth();

  const checkDoc = user ? db.collection('users').doc(user.uid) : null;

  useEffect(() => {
    const getUserPrefs = async () => {
      console.log('ran again');
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
  const themeObj = {
    bg: useColorModeValue(bgLight, bgDark),

    color: useColorModeValue(`${appTheme}.colorLight`, `${appTheme}.colorDark`),

    bgIcon: useColorModeValue(
      `${appTheme}.bgIconLight`,
      `${appTheme}.bgIconDark`
    ),

    colorIcon: useColorModeValue(
      `${appTheme}.colorIconLight`,
      `${appTheme}.colorIconDark`
    ),

    strike: useColorModeValue(strikeLineLight, strikeLineDark),

    strikeText: useColorModeValue(strikeTextLight, strikeTextDark),

    colorItem: useColorModeValue(colorItemLight, colorItemDark),

    added: useColorModeValue(`${appTheme}.addedLight`, `${appTheme}.addedDark`),

    bgItem: useColorModeValue(bgItemLight, bgItemDark),

    checkScheme: useColorModeValue(checkSchemeLight, checkSchemeDark),

    deleteIcon: useColorModeValue(
      `${appTheme}.deleteIconLight`,
      `${appTheme}.deleteIconDark`
    ),

    deleteOutline: useColorModeValue(
      `${appTheme}.deleteOutlineLight`,
      `${appTheme}.deleteOutlineDark`
    ),
  };

  // end theme object
  return (
    <Router>
      <Layout
        user={user}
        setIsLoading={setIsLoading}
        setShowHow={setShowHow}
        setShowAbout={setShowAbout}
        isLoading={isLoading}
        setAppTheme={setAppTheme}
        themeObj={themeObj}
        currentList={currentList}
      >
        <Switch>
          <PrivateRoute exact path="/">
            <Dashboard
              user={user}
              showHow={showHow}
              setShowHow={setShowHow}
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
              user={user}
              setIsLoading={setIsLoading}
              themeObj={themeObj}
              currentList={currentList}
              setCurrentList={setCurrentList}
            />
          </PrivateRoute>

          <PrivateRoute path="/delete_account">
            <DeleteAccount
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
