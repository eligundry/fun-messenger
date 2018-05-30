import * as node_fetch from 'node-fetch';

export const fetch = (url: string, options: node_fetch.RequestInit = {}): Promise<node_fetch.Response> => {
  const jwt: string|null = window.sessionStorage.getItem('jwt');

  if (!options.headers) {
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  if (!options.headers['Content-Type']) {
    options.headers['Content-Type'] = 'application/json';
  }

  if (!options.headers['authorization'] && jwt) {
    options.headers.authorization = `Bearer ${jwt}`;
  }

  if (options.body && options.body instanceof Object) {
    options.body = JSON.stringify(options.body);
  }

  return window.fetch(
    url.includes('http') ? url : window.location.origin + url,
    options
  );
};

export default fetch;
