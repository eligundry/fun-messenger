export enum AUTHENTICATION {
  LOGGING_IN = 'LOGGING_IN',
  LOGGED_IN = 'LOGGED_IN',
  LOGGING_IN_HAS_FAILED = 'LOGGING_IN_HAS_FAILED',
  LOG_OUT = 'LOG_OUT',
  SIGNING_UP = 'SIGNING_UP',
  SIGNED_UP = 'SIGNED_UP',
  SIGNING_UP_HAS_FAILED = 'SIGNING_UP_HAS_FAILED',
}

export interface AuthenticationResponse {
  access_token: string;
}

export interface UserResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface SignUpPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
