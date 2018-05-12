export enum AUTHENTICATION {
  LOGGING_IN = 'LOGGING_IN',
  LOGGED_IN = 'LOGGED_IN',
  LOGGING_IN_HAS_FAILED = 'LOGGING_IN_HAS_FAILED',
  LOG_OUT = 'LOG_OUT',
}

export interface AuthenticationResponse {
  access_token: string;
}
