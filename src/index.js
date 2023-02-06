import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import store from './stores/_stores'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()
root.render(
  <QueryClientProvider client={queryClient}>
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter basename={'https://yonghwan1231.github.io/portfolio'}>
          <App />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </QueryClientProvider >
);
