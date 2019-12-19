export interface Action<TState=any, TPayload=any, TSuccess=any, TFailure=any> {
    type: string;
    stateKey: string;
    payload?: TPayload;
    reducer?: ReducerType<TState, TPayload>;
    saga?: any;
    success?: ReducerType<TState, TSuccess>;
    failure?: ReducerType<TState, TFailure>;
}

export type ReducerType<TState=any, TPayload=any> = (state: TState, action: Action<TState, TPayload>) => TState;

export interface IActionCreator<TState=any, TPayload=any, TSuccess=any, TFailure=any> {
    type: string;
    stateKey: string;
    reducer?: ReducerType<TState, TPayload>;
    saga?: any;
    success?: ReducerType<TState, TSuccess>;
    failure?: ReducerType<TState, TFailure>;
    (payload: TPayload): Action<TState, TPayload>;
}

export function actionCreator<TState=any, TPayload=any, TSuccess=any, TFailure=any>(action: Action<TState, TPayload, TSuccess, TFailure>): IActionCreator<TState, TPayload, TSuccess, TFailure> {
    const { type, stateKey, saga, reducer, success, failure } = action;
    return Object.assign(
        (payload: TPayload) => ({ type, payload, stateKey, saga, reducer, success, failure }),
        { type, stateKey, saga, reducer, success, failure }
    );
}

export function successActionCreator<TState=any, TPayload=any>(action: Action<TState, any>): IActionCreator<TState, TPayload> {
    const { type: t, stateKey, success: func } = action;
    const type = t + "-success";
    const reducer = func;
    return Object.assign(
        (payload: TPayload) => ({ type, payload, stateKey, reducer }),
        { type, stateKey, reducer }
    );
}

export function failureActionCreator<TState=any, TPayload=any>(action: Action<TState, any>): IActionCreator<TState, TPayload> {
    const { type: t, stateKey, failure: func } = action;
    const type = t + "-failure";
    const reducer = func;
    return Object.assign(
        (payload: TPayload) => ({ type, payload, stateKey, reducer }),
        { type, stateKey, reducer }
    );
}