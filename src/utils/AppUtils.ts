import moment from 'moment';
import { match } from 'react-router';
import { isNullOrUndefined } from 'util';

import { LoginUser } from '../home/interface';

export class AppUtils {

    /**
     * 是否管理员
     */
    public static isAdmin = (curUser: LoginUser) => {
        if (isNullOrUndefined(curUser) != null) {
            if (curUser.admin) {
                return true;
            }
        }
        return false;
    }

    /**
     * 是否顶级管理员
     */
    public static isTopAdmin = (curUser: LoginUser) => {
        if (AppUtils.isAdmin(curUser)) {
            const authorities: string[] = curUser.authorities || [];
            return authorities.includes("ROLE_TOPUSER");
        }
        return false;
    }

    /**
     * 获取url中的参数值
     * @param urlParams this.props.match.params
     */
    public static getUrlParamValue<T, Params extends { [K in keyof Params]?: string } = {}>(match: match<Params>, paramName: string, defaultValue: T): T {
        const params: any = match.params;
        if (params[paramName]) {
            const v = params[paramName];
            return v;
        }
        return defaultValue;
    }

    /**
     * 转换为float数字
     * @param value 
     */
    public static getFloatValue(value: any): number {
        if (!isNullOrUndefined(value)) {
            const v = parseFloat('' + value);
            if (Number.isNaN(v)) {
                return 0;
            }
            return v;
        }
        return 0;
    }
    /**
     * 转换为整数
     * @param value 
     */
    public static getIntegerValue(value: any): number {
        if (!isNullOrUndefined(value)) {
            const v = parseInt('' + value, 10);
            if (Number.isNaN(v)) {
                return 0;
            }
            return v;
        }
        return 0;
    }


    /**
     * 格式化时间日期
     */
    public static formatDateTime(date: Date) {
        if (!isNullOrUndefined(date)) {
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
        return "";
    }
    /**
     * 格式化日期
     */
    public static formatDate(date: Date) {
        if (!isNullOrUndefined(date)) {
            return moment(date).format("YYYY-MM-DD");
        }
        return "";
    }
    public static strMapToObj(strMap: Map<string, any>) {
        const obj: any = {};
        for (const key of strMap.keys()) {
            obj[key as any] = strMap.get(key);
        }
        return obj;
    }
    public static strMapToJson(strMap: Map<string, any>) {
        return JSON.stringify(AppUtils.strMapToObj(strMap));
    }

    public static objToStrMap(obj: any) {
        const strMap = new Map();
        for (const k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }
        return strMap;
    }

    public static jsonToStrMap(jsonStr: string) {
        return AppUtils.objToStrMap(JSON.parse(jsonStr));
    }
}