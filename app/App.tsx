import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  ScrollRestoration,
} from '@remix-run/react';
import { GlobalStyle } from '~/styles/global';

export const App = () => {
  return (
    <html lang="ja">
      <head>
        <Meta />
        <Links />
        {typeof document === 'undefined' ? '__STYLES__' : null}
      </head>
      <body>
        <GlobalStyle />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};
