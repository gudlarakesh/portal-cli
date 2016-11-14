import {environment} from '../environments/environment';
export const CONFIG = {
  dev: {}
};

if (environment.production) {
CONFIG.dev = {
  apiUrl: 'https://ca-vision.herokuapp.com/v1-beta'
    };
} else {
  CONFIG.dev = {
    apiUrl: 'https://ca-vision.herokuapp.com/v1-beta'
  };
}
