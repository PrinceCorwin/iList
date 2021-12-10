import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import ConfirmForm from './components/auth/ConfirmForm';
import PrivateRoute from './components/route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import NewList from './components/iList/NewList';
import MyLists from './components/iList/MyLists';

import NotFound from './components/layout/NotFound';
// import { useState } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import { iListTheme } from './styles/theme';
import { useAuth, db } from './hooks/useAuth';

function App() {
  const { user } = useAuth();
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loaderLoading, setLoaderLoading] = useState(true);
  const [currentList, setCurrentList] = useState('My List');
  const [appTheme, setAppTheme] = useState('minimal');

  // create global theme object
  const checkSchemeDark = iListTheme.colors[appTheme].checkSchemeDark;
  const checkSchemeLight = iListTheme.colors[appTheme].checkSchemeLight;
  const strikeLineDark = iListTheme.colors[appTheme].strikeLineDark;
  const strikeLineLight = iListTheme.colors[appTheme].strikeLineLight;
  const strikeTextDark = iListTheme.colors[appTheme].strikeTextDark;
  const strikeTextLight = iListTheme.colors[appTheme].strikeTextLight;
  const colorItemDark = iListTheme.colors[appTheme].colorItemDark;
  const colorItemLight = iListTheme.colors[appTheme].colorItemLight;

  // const fetchCurrentList = db.collection('users').doc(user.email);

  // useEffect(() => {
  //   // console.log('UE2');
  //   // console.log(currentList);
  //   const getCurrentTheme = async () => {
  //     try {
  //       const userList = await fetchCurrentList.get();
  //       console.log(userList.data().currenttheme);
  //       setAppTheme(userList.data().currenttheme);
  //       // setIsLoading(false);

  //       setFetchError(null);
  //     } catch (err) {
  //       setFetchError(err.message);

  //       console.log(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getCurrentTheme();
  // }, []);

  const themeObj = {
    bg: useColorModeValue(`${appTheme}.bgLight`, `${appTheme}.bgDark`),

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

    bgItem: useColorModeValue(
      `${appTheme}.bgItemLight`,
      `${appTheme}.bgItemDark`
    ),

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
        isLoading={isLoading}
        setAppTheme={setAppTheme}
        themeObj={themeObj}
        currentList={currentList}
      >
        <Switch>
          <PrivateRoute exact path="/">
            <Dashboard
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
              setIsLoading={setIsLoading}
              themeObj={themeObj}
              currentList={currentList}
              setCurrentList={setCurrentList}
            />
          </PrivateRoute>
          <PrivateRoute path="/mylists">
            <MyLists
              setIsLoading={setIsLoading}
              themeObj={themeObj}
              currentList={currentList}
              setCurrentList={setCurrentList}
            />{' '}
          </PrivateRoute>

          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/confirm">
            <ConfirmForm currentList={currentList} />
          </Route>
          {/* if no other route is found by now, the <NotFound> component will render */}
          <Route>
            <NotFound themeObj={themeObj} />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
