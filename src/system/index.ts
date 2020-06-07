import { StateKeys } from '../store/interface';
import { ISystemReduxState } from './interface';

export const stateKey = StateKeys.system;

export const initState: ISystemReduxState = {
    fetching: true,
};
