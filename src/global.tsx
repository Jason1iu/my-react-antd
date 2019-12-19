import React from 'react';
import { isNullOrUndefined } from 'util';

export const styledTheme = {
    linkColor: '#1890ff',
    linkHoverColor: '#903e59',
    btnColor: 'rgba(64, 169, 255, 1)',
    btnColor2: 'rgb(0, 27, 160)',
    titleHeight: 45,
    treeWidth: 260,
    navWidth: 160,
    marginWidth: 3,
    toolbarHeight: 48,
};

/**
 * 设置路径
 */
export function getContextPath() {
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
 * 设置左侧树隐藏与显示
 */
export const appnav_collapsed_key = "__appnav_collapsed";
export const apptree_collapsed_key = "__apptree_collapsed";

/**
 * 设置每页显示100条记录
 */
export function getPageSize() {
    return 100;
}

/**
 * 审批状态:-1-拟稿,0-审批中,1-审批通过,2-未通过,3-终止审批,4-申请修改,
 */
export const FlowStatus = {
    /*-1-拟稿 */
    Nigao: -1,
    /*0-审批中 */
    Shenpizhong: 0,
    /*1-审批通过 */
    Shenpitongguo: 1,
    /*2-未通过 */
    Shenpiweitongguo: 2,
    /*3-终止审批 */
    Zhongzhishenpi: 3,
    /*4-申请修改 */
    shenqingxiugai: 4,
}

/**
 * 审批状态含义
 * @param {number} code 审批状态代码
 * @returns {string}
 */
export function getApprovalStatusMean(code: number) {
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
            return "";
    }
}

/**
 * 设置不同审批状态文本显示颜色
 * @param {number} status 审批状态代码
 * @returns {string}
 */
export function getFlowStatusColor(status: number) {
    let color = '';
    switch (status) {
        case FlowStatus.Nigao:
            color = 'orange';
            break;
        case FlowStatus.Shenpizhong:
            color = 'blue';
            break;
        case FlowStatus.Shenpitongguo:
            color = 'green';
            break;
        case FlowStatus.Shenpiweitongguo:
            color = 'red';
            break;
        case FlowStatus.Zhongzhishenpi:
            color = 'red';
            break;
        case FlowStatus.shenqingxiugai:
            color = 'brown';
            break;
        case 5:
            color = 'orange';
            break;
        default:
            color = "";
    }
    return color;
}

/**
 * 设置不同审批状态对应的显示内容：颜色标识+文本
 * @param {number} status 审批状态代码
 */
export function renderStatus(status: number) {
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
    return "未知状态";
}

/**
 * 判断审批状态是否为-1拟稿、2未通过或3终止审批，以便修改或提交
 * @param {number} status 
 * @returns {boolean}
 */
export function isNigaoOrWeitongguoOrZhongzhi(status: number) {
    if (isNullOrUndefined(status)) {
        return false;
    }
    return status === FlowStatus.Nigao || status === FlowStatus.Shenpiweitongguo || status === FlowStatus.Zhongzhishenpi;
}