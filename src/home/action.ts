import { call, put } from 'redux-saga/effects';

import {
    Action, actionCreator, failureActionCreator, successActionCreator
} from '../store/actionUtils';
import { StateKeys } from '../store/interface';
import { AppUtils } from '../utils/AppUtils';
import request from '../utils/request';
import { HomeReduxState, LoginUser } from './interface';

export const fetchLoginUser = actionCreator<HomeReduxState>({
    type: "fetchLoginUser",
    stateKey: StateKeys.home,
    reducer: (state: HomeReduxState): HomeReduxState => {
        return {
            ...state,
            fetchingUser: true,
        }
    },
    saga: function* (action: Action<HomeReduxState>) {
        try {
            const url = `${AppUtils.getContextPath()}/api/loginuser`;
            const o: any = yield call(request, url, { method: 'GET' });
            if (o.currentUser) {
                const a = successActionCreator(action)(o);
                yield put(a);
            }
            else {
                yield put(failureActionCreator(action)({}));
            }
        }
        catch (err) {
            console.log('fetchLoginUser saga', err);
            yield put(failureActionCreator(action)({}));
        }
    },
    success: (state: HomeReduxState, action: Action<HomeReduxState, any>) => {
        const {
            currentUser: loginUser = {} as LoginUser,
            users: loginUsers = [],
        } = action.payload || {};

        return {
            ...state,
            loginUser,
            loginUsers,
            fetchingUser: false,
        };
    },
    failure: (state: HomeReduxState) => {
        return {
            ...state,
            fetchingUser: false,
        };
    },
});

