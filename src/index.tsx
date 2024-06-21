import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './router';
import theme from './theme';
import { store, persistor } from './store/store';


const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <QueryClientProvider client={client}>
          <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <RouterProvider router={router} />
          </ChakraProvider>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);