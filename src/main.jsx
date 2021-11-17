import React from 'react';
import ReactDOM from 'react-dom';
import { createClient, Provider } from 'urql';
import './index.css';
import App from './App';

const client = createClient({
  url: 'https://glorious-grub-83.hasura.app/v1/graphql',
  fetchOptions: {
    headers: {
      'x-hasura-admin-secret':
        '5rDuLhhJfExDevIi8JoLafItLYX36TtbpLHC1z17ZcO4epWzccDfV5aRp5ogMJBS',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
