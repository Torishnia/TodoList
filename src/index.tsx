import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App/App';
import Layout from './layout/Layout';
import { todos } from './data';
import './index.css';

function initStartValue() {
  const todosFromLS = localStorage.getItem('todoItems') || '';
  const todosCount = todosFromLS ? JSON.parse(todosFromLS).length > 0 : false;

  if (!todosCount) localStorage.setItem('todoItems', JSON.stringify(todos));
}

initStartValue();

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
