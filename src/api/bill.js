import { CREATE_BILL, LIST_BILLS } from '../utils/routes';
import { get, post } from './http';

export const createBill = payload => post(CREATE_BILL, payload);

export const listBill = payload => get(`${LIST_BILLS}?user_account_id=${payload}`);
