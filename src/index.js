import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { iListTheme } from './styles/theme';

import './components/iList/index.css';

import App from './App';
import { AuthProvider } from './hooks/useAuth';
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
