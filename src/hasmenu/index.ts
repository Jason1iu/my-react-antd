import { StateKeys } from '../store/interface';
import { HomeReduxState } from './interface';

export const stateKey = StateKeys.hasmenu;

export const initState: HomeReduxState = {
    fetchingUser: true,
    loginUser: undefined,
    loginUsers: [],
};