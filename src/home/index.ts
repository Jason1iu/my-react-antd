import { StateKeys } from '../store/interface';
import { injectReducer, store } from '../store/store';
import App from './App';
import { HomeReduxState } from './interface';

export const stateKey = StateKeys.home;

export const initialState: HomeReduxState = {
    fetchingUser: true,
    loginUser: undefined,
    loginUsers: [],
};

injectReducer(store, { stateKey, initialState });

export default App;