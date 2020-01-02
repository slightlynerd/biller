import { SIGNUP, LOGIN } from '../utils/routes';
import { post } from './http';

export const signUp = payload => post(SIGNUP, payload);

export const login = payload => post(LOGIN, payload);
