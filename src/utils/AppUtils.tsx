import { Badge } from 'antd';
import moment from 'moment';
import React from 'react';
import { match } from 'react-router';
import { isNullOrUndefined } from 'util';

import { defaultPageSize, FlowStatus } from '../global';
import { LoginUser } from '../home/interface';

/**
 * 程序中所用到的公共方法工具类
 */
export class AppUtils {

    /**
     * 设置路径
     */
    public static getContextPath() {
        if (undefined !== typeof (window as any).contextPath)
            return (window as any).contextPath;

        const o: any = document.querySelector("meta[name='contextPath']");
        let url = '';
        if (o && o.content)
            url = o.content;
        if (url.length && url.charAt(url.length - 1) == '/') {
            url = url.substr(0, url.length - 1);
        }
        return url;
    }

    /**
     * 是否管理员
     */
    public static isAdmin(curUser: LoginUser): boolean {
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
    public static isTopAdmin(curUser: LoginUser): boolean {
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
     * 格式化日期时间
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

    /**
     * 根据文件名称后缀判断是不是图片格式
     */
    public static isImageByFilename(filename: string = ''): boolean {
        let isImage = false;
        if (!isNullOrUndefined(filename)) {
            const imageFormat: string[] = ['bmp', 'jpg', 'jpeg', 'png', 'tif', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF', 'webp']
            const i = filename.lastIndexOf('.');
            const f = filename.slice(i + 1).toLowerCase();
            isImage = imageFormat.includes(f);
        }
        return isImage;
    }

    /**
     * 根据文件类型判断是不是图片格式
     */
    public static isImageByFiletype(filetype: string = ''): boolean {
        let isImage = false;
        if (!isNullOrUndefined(filetype)) {
            isImage = (filetype + '').startsWith('image/');
        }
        return isImage;
    }

    /**
     * 给对象数组数据源增加序号xh字段，从1开始
     */
    public static addXuhao(data: any[] = [], start?: number): any[] {
        let i = isNullOrUndefined(start) ? 1 : start;
        if (data.length > 0) {
            return data.map(d => ({ ...d, xh: i++ }));
        }
        return [];
    }

    /**
     * 给对象数组数据源增加序号xh字段，默认从1开始且单页最多显示100条记录，根据page排序
     */
    public static addXh(data: any[] = [], page?: number, pageSize?: number): any[] {
        const currentPage = isNullOrUndefined(page) ? 1 : page;
        const currentPageSize = isNullOrUndefined(pageSize) ? defaultPageSize : pageSize;
        let i = (currentPage - 1) * currentPageSize + 1;
        if (data.length > 0) {
            return data.map(d => ({ ...d, xh: i++ }));
        }
        return [];
    }

    //判断对象obj为{}或者undefiend
    public static isEmptyObjectOrUndefiend(obj: object = {}): boolean {
        return Object.keys(obj).length == 0;
    }

    /**
     * 审批状态含义
     * @param {number} code 审批状态代码
     * @returns {string}
     */
    public static getApprovalStatusMean(code: number): string {
        switch (code) {
            case FlowStatus.Nigao:
                return "拟稿";
            case FlowStatus.Shenpizhong:
                return "审批中";
            case FlowStatus.Shenpitongguo:
                return "通过";
            case FlowStatus.Shenpiweitongguo:
                return "未通过";
            case FlowStatus.Zhongzhishenpi:
                return "终止审批";
            case FlowStatus.shenqingxiugai:
                return "申请修改";
            default:
                return "未知状态";
        }
    }

    /**
     * 设置不同审批状态对应的显示内容：颜色标识+文本
     * @param {number} status 审批状态代码
     */
    public static renderBadgeApprovalStatus(status: number) {
        switch (status) {
            case FlowStatus.Nigao:
                return <Badge text="拟稿" color='orange' status="default" />;
            case FlowStatus.Shenpizhong:
                return <Badge text="审批中" color='blue' status="processing" />;
            case FlowStatus.Shenpitongguo:
                return <Badge text="通过" color='green' status="success" />;
            case FlowStatus.Shenpiweitongguo:
                return <Badge text="未通过" color='red' status="error" />;
            case FlowStatus.Zhongzhishenpi:
                return <Badge text="终止审批" color='red' status="warning" />;
            case FlowStatus.shenqingxiugai:
                return <Badge text="申请修改" color='brown' status="default" />;
        }
        return <Badge text="未知状态" status="default" />;
    }

    /**
     * 设置不同审批状态对应的显示内容：颜色标识+文本
     * @param {number} status 审批状态代码
     */
    public static renderApprovalStatus(status: number) {
        switch (status) {
            case FlowStatus.Nigao:
                return <span style={{ color: 'orange' }}>拟稿</span>;
            case FlowStatus.Shenpizhong:
                return <span style={{ color: 'blue' }}>审批中</span>;
            case FlowStatus.Shenpitongguo:
                return <span style={{ color: 'green' }}>通过</span>;
            case FlowStatus.Shenpiweitongguo:
                return <span style={{ color: 'red' }}>未通过</span>;
            case FlowStatus.Zhongzhishenpi:
                return <span style={{ color: 'red' }}>终止审批</span>;
            case FlowStatus.shenqingxiugai:
                return <span style={{ color: 'brown' }}>申请修改</span>;
        }
        return <span>未知状态</span>;
    }

    /**
     * 判断审批状态是否为-1拟稿、2未通过或3终止审批，以便修改或提交
     * @param {number} status 
     * @returns {boolean}
     */
    public static isNigaoOrWeitongguoOrZhongzhi(status: number): boolean {
        if (isNullOrUndefined(status)) {
            return false;
        }
        return status === FlowStatus.Nigao || status === FlowStatus.Shenpiweitongguo || status === FlowStatus.Zhongzhishenpi;
    }

}