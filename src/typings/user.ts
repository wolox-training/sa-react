export interface User {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  locale: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  locale: string;
}

export interface LoginResponse {
  data: LoggedInUser;
}

export interface LoggedInUser {
  id: number;
  email: string;
  provider: string;
  uid: string;
  allowPasswordChange: boolean;
  firstName: string;
  lastName: string;
  locale: string;
}
