import {environment} from '../environments/environment';
export const CONFIG = {
  dev: {}
};

if (environment.production) {
CONFIG.dev = {
  apiUrl: 'https://localhost:3000'
    };
} else {
  CONFIG.dev = {
    apiUrl: 'http://localhost:3000/v1-beta'
  };
}
