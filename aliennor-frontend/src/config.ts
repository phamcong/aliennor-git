const isDev = true // process.env.NODE_ENV === 'development';
const isLocal = true // process.env.SERVER_LOCATION === 'local'; // set via .env file

const apiEndpoints = {
  dev: 'https://aliennor.herokuapp.com/api',
  // dev: 'http://localhost:8080/api',
  /*prodLocal: 'http://localhost:8080',*/
  prodLocal: 'https://aliennor.herokuapp.com',
  prodOnline: 'https://glacial-shore-18891.herokuapp.com'
};

const prodEndpoint = isLocal ? apiEndpoints.prodLocal : apiEndpoints.prodOnline;

export const config = {
  themoviedb: {
    apiKey: '737d47b7285bab76358e9cbe46b76b35',
    endpoint: 'https://api.themoviedb.org/3'
  },
  api: isDev ? apiEndpoints.dev : prodEndpoint,
  dev_api_url: 'http://localhost:8080/api/ecocases'
};
