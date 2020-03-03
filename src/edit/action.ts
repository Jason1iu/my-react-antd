import { actionCreator, Action } from '../store/actionUtils';
import { StateKeys } from '../store/interface';
import { EditReduxState } from './interface';

export const updateEditReduxState = actionCreator<EditReduxState>({
    type: "updateEditReduxState",
    stateKey: StateKeys.edit,
    reducer: (state: EditReduxState, action: Action<EditReduxState, EditReduxState>): EditReduxState => {
        return {
            ...state,
            ...action.payload,
        }
    },
});

