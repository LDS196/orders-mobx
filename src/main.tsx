import { ThemeProvider } from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reflect-metadata';

import App from '~/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme="light">
    <App />
  </ThemeProvider>,
);
