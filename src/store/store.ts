import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';

import { Action } from './actionUtils';

interface Module {
    stateKey: string;
    initialState: any;
}

const modules: Module[] = [{ stateKey: 'initial', initialState: {} }];

const createReducer = (initialState: any) => {
    return (state: any = initialState, action: Action<any, any>): any => {
        if (action.reducer && state.__inner_stateKey === action.stateKey) {
            return action.reducer(state, action);
        }
        return state;
    };
}

let composeEnhancer = compose;
if (process.env.NODE_ENV != 'production') {
    composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const createReduxStore = () => {
    const originalState: any = {}; //初始state状态,如不需要bindCreator,可以不设置actions
    const defaultReducer: any = {};
    modules.forEach(m => {
        const initialState = { ...m.initialState, __inner_stateKey: m.stateKey };
        originalState[m.stateKey] = initialState;
        defaultReducer[m.stateKey] = createReducer(initialState);
    });

    const sagaMiddleware = createSagaMiddleware(); //创建saga中间件
    const middlewares = [sagaMiddleware];

    //创建redux-store  
    const store = createStore(combineReducers(defaultReducer), originalState,
        composeEnhancer(
            applyMiddleware(...middlewares),
        )
    );

    //默认的saga函数 
    function* sagaAction(action: any) {
        if (action.saga) {
            yield action.saga(action);
        }
    }

    //运行saga线程
    sagaMiddleware.run(function* () {
        yield takeEvery((action: any) => action.saga, sagaAction);
    });

    return store;
}

const injectReducer = (store: any, { stateKey, initialState }: Module) => {

    const index = modules.findIndex(m => m.stateKey === stateKey);
    if (index !== -1)
        return;
    modules.push({ stateKey, initialState });
    const reducers: any = {};
    modules.forEach(m => {
        const initialState = { ...m.initialState, __inner_stateKey: m.stateKey };
        reducers[m.stateKey] = createReducer(initialState);
    });
    store.replaceReducer(combineReducers(reducers));
}

const store = createReduxStore();

export {
    injectReducer,
    store,
}