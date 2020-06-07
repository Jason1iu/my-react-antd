import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';

const keys: Array<any> = [];
const modules: Array<any> = [];

const registerModule = (m: any) => {
    if (!m.stateKey) {
        throw new Error(`模块没有定义stateKey`);
    }
    if (!m.initState) {
        throw new Error(`模块${m.stateKey}没有定义initState`);
    }
    modules.push(m);
    keys.push(m.stateKey);
    return m;
}

//不使用combineReducers,提供默认的defaultReducer
const defaultReducer = (state: any, action: any): any => {
    let hasChanged = false;
    const nextState: any = state ? { ...state } : {};
    if (action.reducer && action.stateKey) {
        const key = action.stateKey;
        const previousStateForKey = state[key];
        const nextStateForKey = action.reducer(previousStateForKey, action);
        nextState[key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
}

/** 如果是开发阶段，则加载Redux开发工具 */
let composeEnhancer = compose;
if (process.env.NODE_ENV != 'production') {
    composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const initStore = () => {
    const originalState: any = {}; //初始state状态,如不需要bindCreator,可以不设置actions
    modules.forEach(m => { originalState[m.stateKey] = m.initState });
    const sagaMiddleware = createSagaMiddleware(); //创建saga中间件	
    const store = createStore(defaultReducer, originalState,
        composeEnhancer(applyMiddleware(sagaMiddleware))
    ); //创建redux-store    
    function* sagaAction(action: any) {
        if (action.saga) {
            yield action.saga(action);
        }
    } //默认的saga函数
    sagaMiddleware.run(function* () {
        yield takeEvery((action: any) => action.saga, sagaAction);
    }); //运行saga线程		
    return { store };
}

export { registerModule, initStore }