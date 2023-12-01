import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App/App';
import Layout from './layout/Layout';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>
);
