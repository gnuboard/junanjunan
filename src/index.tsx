import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import theme from './theme';
import { store } from './store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <QueryClientProvider client={client}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <RouterProvider router={router} />
        </ChakraProvider>
      </QueryClientProvider>
    </ReduxProvider>
  </React.StrictMode>
);