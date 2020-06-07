import { StateKeys } from '../store/interface';
import { NoMenuReduxState } from './interface';

export const stateKey = StateKeys.nomenu;

export const initState: NoMenuReduxState = {
    fetching: true,
    total: 0,
    currentPage: 1,
    tableData: [],
    showquery: false,
};