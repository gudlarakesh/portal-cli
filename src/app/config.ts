import {environment} from '../environments/environment';
export const CONFIG = {
  dev: {}
};

if (environment.production) {
CONFIG.dev = {
  apiUrl: 'https://ca-portal.herokuapp.com/v1-beta'
    };
} else {
  CONFIG.dev = {
    apiUrl: 'http://localhost:3000/v1-beta'
  };
}
