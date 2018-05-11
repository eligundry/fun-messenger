import { fetch as _fetch, RequestInit, Response } from 'node-fetch';

export const fetch = (url: string, options: RequestInit = {}): Promise<Response> => {
  const jwt: string|null = window.sessionStorage('jwt');

  if (!options.headers) {
    options.headers = {};
  }

  if (!'Content-Type' in options.headers) {
    options.headers['Content-Type'] = 'application/json';
  }

  if (!options.headers.hasOwnProperty('authorization') && jwt) {
    options.headers.authorization = `Bearer ${jwt}`;
  }

  if (options.body && options.body instanceof Object) {
    options.body = JSON.stringify(options.body);
  }

  return _fetch(url.indexOf('http') !== -1 ? url : window.location.origin + url, options);
};

export default fetch;
