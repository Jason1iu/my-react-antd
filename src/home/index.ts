import { StateKeys } from '../store/interface';
import { injectReducer, store } from '../store/store';
import App from './App';
import { HomeReduxState, LoginUser } from './interface';

export const stateKey = StateKeys.home;

export const initialState: HomeReduxState = {
    fetchingUser: true,
    loginUser: { id: -1 } as LoginUser,
    loginUsers: [],
};

injectReducer(store, { stateKey, initialState });

export default App;