import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { iListTheme } from './styles/theme';

import './styles/css/index.css';
import './styles/css/app.css';

import App from './App';
import { AuthProvider } from './components/auth/useAuth';
ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={iListTheme}>
      <AuthProvider>
        <App style={{ maxWidth: 100 }} />
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
