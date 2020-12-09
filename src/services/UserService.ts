import api from '../config/api';
import { ErrorData } from '../typings/response';
import { User, SignUpResponse } from '../typings/user';

export const signup = (user: User) => api.post<SignUpResponse, ErrorData>('/users', user);
