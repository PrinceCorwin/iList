import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import ConfirmForm from './components/auth/ConfirmForm';
import PrivateRoute from './components/route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/layout/NotFound';
import { useState } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
function App() {
  const [currentList, setCurrentList] = useState('');

  const bg = useColorModeValue('teal.500', 'teal.200');
  const color = useColorModeValue('white', 'gray.800');
  return (
    <Router>
      <Layout bg={bg} color={color} currentList={currentList}>
        <Switch>
          <PrivateRoute exact path="/">
            <Dashboard
              bg={bg}
              color={color}
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
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
