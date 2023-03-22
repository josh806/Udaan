import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri:
          window.location.origin + import.meta.env.VITE_AUTH0_RETURN_URL,
      }}
    > */}
    {/* <BrowserRouter> */}
    <App />
    {/* </BrowserRouter> */}
    {/* </Auth0Provider> */}
  </React.StrictMode>
);
