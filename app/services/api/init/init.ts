import type { FirebaseApp } from 'firebase/app';
import { getApp, initializeApp } from 'firebase/app';
import { API_CONFIG } from '~/services/api/common/config';

export const initApiConnection = (): FirebaseApp => {
  let app: FirebaseApp;

  try {
    app = getApp();
  } catch (e) {
    app = initializeApp(API_CONFIG);
  }

  return app;
};
