import { StateKeys } from '../store/interface';
import { EditReduxState } from './interface';

export const stateKey = StateKeys.edit;

export const initState: EditReduxState = {
    fetching: true,
    infoKey: undefined,
};