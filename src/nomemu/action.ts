import { call, put } from 'redux-saga/effects';//, select
import { defaultPageSize } from '../global';
import { StateKeys, TAction } from '../store/interface';//ReduxStoreState
import request from '../utils/request';
import { NoMenuReduxState, DetailsBean } from './interface';
import { IPartialType, IApiResultDataType, ICallback } from "../home/interface";
import { updateReduxState, asyncLoadSuccess, asyncLoadFailure } from "../home/action";
import { AppUtils } from "../utils/AppUtils";

const stateKey = StateKeys.nomenu;

/**
 * 更新Redux
 */
export const updateNoMenuReduxState = (payload: IPartialType<NoMenuReduxState> = {}): TAction => updateReduxState<NoMenuReduxState>('updateNoMenuReduxState', stateKey, payload);

/** 
 * 获取列表数据
 * */
export const LoadTableData = (node: string, currentPage: number, callback?: ICallback): TAction => ({
    type: 'LoadTableData',
    stateKey,
    reducer: (state: NoMenuReduxState): NoMenuReduxState => ({
        ...state,
        fetching: true,
        tableData: [],
        currentPage,
    }),
    saga: function* () {
        const defaultBean = {
            tableData: [],
            total: 0,
            fetching: false,
        };
        try {
            const url = `${AppUtils.getContextPath()}/api/${node}/table/infodata`;
            let condition = {};
            const result: IApiResultDataType<{ total: number, infoTableData: DetailsBean[] }> = yield call(request, url, { method: 'GET', body: { ...condition, page: currentPage, limit: defaultPageSize } });
            if (result.success) {
                yield put(asyncLoadSuccess<NoMenuReduxState>(stateKey, {
                    tableData: result.data?.infoTableData,
                    total: result.data?.total,
                    fetching: false,
                }));
                if (callback?.resolve) {
                    callback.resolve();
                }
            }
            else {
                yield put(asyncLoadFailure<NoMenuReduxState>(stateKey, defaultBean));
                if (callback?.reject) {
                    callback.reject();
                }
            }
        }
        catch (e) {
            console.log('LoadTableData saga', e);
            yield put(asyncLoadFailure<NoMenuReduxState>(stateKey, defaultBean));
            if (callback?.reject) {
                callback.reject();
            }
        }
    },
});

