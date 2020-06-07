export interface IHomeReduxState {
    fetchingUser: boolean;
    loginUser: ILoginUser;       //当前登录用户
    loginUsers?: ILoginUser[];
    ssoTreeData: ITreeNode[];
    ssoSelectedKeys: string[];
    ssoExpandedKeys: string[];
    ssoSelectedNode: ITreeNode;
}

export interface ILoginUser {
    id: number;
    modifytime?: Date;
    companyId: string;
    companyFullName: string;
    type: number;           /* 授权对象类型 0 人员 1 岗位 */
    userId: number;         /* 授权对象id，根据hrUserType来决定为人员id还是岗位id */
    disabled: boolean;      /* 用户状态 1 停用 0 正常 */
    username: string;
    position: string;
    authorities: string[];
    admin: boolean;            // 是否管理员
    authMap: string;    // Map的Json字符串
}

/**
 * 树形节点
 */
export interface ITreeNode {
    /** 节点Id */
    id: string;
    /** 节点文字 */
    text: string;
    /** 是否叶子节点 */
    leaf: boolean;
    /** 子节点 */
    children?: ITreeNode[];
}

/**
 * 设置指定对象属性全部为可选
 */
export type IPartialType<T> = Partial<{ [key in keyof T]: T[key] }>;

/**
 * api接口返回的数据格式
 */
export interface IApiResultDataType<T = any> {
    success?: boolean;
    data?: T;
    message?: string;
}

/**
 * 异步请求回调函数
 */
export interface ICallback<V = any, D = any> {
    fetching?: boolean;              // 请求完成之后是否关闭加载中，默认关闭。在其他地方组合异步加载时，可设置为true以防止加载中抖动
    resolve?: (o?: V) => void;       // 成功之后回调
    reject?: (o?: D) => void;        // 失败之后回调
}