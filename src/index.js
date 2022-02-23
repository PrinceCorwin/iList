import { ColorModeScript } from '@chakra-ui/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

import './styles/css/index.css';
import './styles/css/app.css';

import App from './App';
import { AuthProvider } from './components/auth/useAuth';
ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider>
      <AuthProvider>
        <App style={{ maxWidth: 100 }} />
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
