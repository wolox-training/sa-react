import api from '../config/api';
import { ErrorData, ErrorResponse } from '../typings/response';
import { User, SignUpResponse, AuthCredentials, LoginResponse } from '../typings/user';

export const signup = (user: User) => api.post<SignUpResponse, ErrorData>('/users', user);

export const login = (credentials: AuthCredentials) =>
  api.post<LoginResponse, ErrorResponse>('/users/sign_in', credentials);
