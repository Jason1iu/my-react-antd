import { HomeReduxState } from '../home/interface';

/**
 * 所有的stateKey
 */
export enum StateKeys {
    /** home模块 */
    home = "home",
}

/**
 * 所有程序的ReduxState
 */
export interface ReduxStoreState {
    /** 初始模块 */
    [StateKeys.home]: HomeReduxState,
}

/**
 * 定义Action函数
 */
export interface TAction {
    type: string;
    stateKey: StateKeys;
    reducer?: (state: any, action?: any) => any;
    saga?: (action?: any) => void;
    successData?: any;
    failureData?: any;
    success?: (state: any, action?: any) => any;
    failure?: (state: any, action?: any) => any;
}

export const sagaSuccessAction = <TData>(action: any, data?: TData): TAction =>
    ({
        type: action.type + 'Success',
        stateKey: action.stateKey,
        successData: data,
        reducer: action.success
    });

export const sagaFailureAction = <TData>(action: any, data?: TData): TAction => ({
    type: action.type + 'Failure',
    stateKey: action.stateKey,
    failureData: data,
    reducer: action.failure
});