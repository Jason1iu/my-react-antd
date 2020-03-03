import { StateKeys } from '../store/interface';
import { injectReducer, store } from '../store/store';
import DataTable from './DataTable';
import { EditReduxState } from './interface';

export const stateKey = StateKeys.edit;

export const initialState: EditReduxState = {
    fetching: true,
    infoKey: undefined,
};

injectReducer(store, { stateKey, initialState });

export default DataTable;