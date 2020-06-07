import { call, put } from 'redux-saga/effects';

import {
    Action, actionCreator, failureActionCreator, successActionCreator
} from '../store/actionUtils';
import { StateKeys, TAction } from '../store/interface';
import { AppUtils } from '../utils/AppUtils';
import request from '../utils/request';
import { IHomeReduxState, ILoginUser, IPartialType, ITreeNode } from './interface';

export const fetchLoginUser = actionCreator<IHomeReduxState>({
    type: "fetchLoginUser",
    stateKey: StateKeys.home,
    reducer: (state: IHomeReduxState): IHomeReduxState => {
        return {
            ...state,
            fetchingUser: true,
        }
    },
    saga: function* (action: Action<IHomeReduxState>) {
        try {
            const url = `${AppUtils.getContextPath()}/api/login`;
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
    success: (state: IHomeReduxState, action: Action<IHomeReduxState, { currentUser: ILoginUser, users: ILoginUser[] }>) => {
        const {
            currentUser: loginUser = {} as ILoginUser,
            users: loginUsers = [],
        } = action.payload || {};

        //构造属性结构数据
        const rootNode: ITreeNode = {
            id: loginUser.companyId,
            text: loginUser.companyFullName,
            leaf: false,
            children: [],
        };

        return {
            ...state,
            loginUser,
            loginUsers,
            ssoTreeData: [rootNode],
            ssoSelectedKeys: [rootNode.id],
            ssoExpandedKeys: [rootNode.id],
            ssoSelectedNode: rootNode,
            fetchingUser: false,
        };
    },
    failure: (state: IHomeReduxState) => {
        return {
            ...state,
            fetchingUser: false,
        };
    },
});

//更新HomeRedux
export const updateIHomeReduxState = (payload: IPartialType<IHomeReduxState> = {}): TAction => ({
    type: "updateIHomeReduxState",
    stateKey: StateKeys.home,
    reducer: (state: IHomeReduxState): IHomeReduxState => {
        return {
            ...state,
            ...payload,
        }
    },
});

//异步请求成功，更新Redux
export const asyncLoadSuccess = <T = any>(stateKey: StateKeys, payload: IPartialType<T> = {}): TAction => updateReduxState<T>('asyncLoadSuccess', stateKey, payload);
//异步请求失败，更新Redux
export const asyncLoadFailure = <T = any>(stateKey: StateKeys, payload: IPartialType<T> = {}): TAction => updateReduxState<T>('asyncLoadFailure', stateKey, payload);
//更新Redux
export const updateReduxState = <T = any>(type: string, stateKey: StateKeys, payload: IPartialType<T> = {}): TAction => ({
    type,
    stateKey,
    reducer: (state: T): T => ({
        ...state,
        ...payload,
    }),
});