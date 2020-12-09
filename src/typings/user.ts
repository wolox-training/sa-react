export interface User {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  locale: string;
}

export interface SignUpResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  locale: string;
}
