import type { User } from 'firebase/auth';
import { getAuth, signInAnonymously } from 'firebase/auth';

export const authToServer = (): Promise<User> => {
  return new Promise((resolve, reject) => {
    try {
      const auth = getAuth();
      signInAnonymously(auth)
        .then((result) => {
          resolve(result.user);
        })
        .catch((error) => {
          throw Error(error.message);
        });
    } catch (error) {
      reject(String(error));
    }
  });
};
