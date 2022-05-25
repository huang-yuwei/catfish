import type { MetaFunction } from '@remix-run/node';
import { authToServer } from './services/api/auth/auth';
import { initApiConnection } from './services/auth';

// Init API connection with server
initApiConnection();

// Auth anonymous to use the App
authToServer();

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Catfish',
  viewport: 'width=device-width,initial-scale=1',
});
