export interface HomeReduxState {
    fetchingUser: boolean;
    loginUser: LoginUser;       //当前登录用户
    loginUsers: LoginUser[];
}

export interface LoginUser {
    id: number;
    modifytime?: Date;
    companyId: string;
    companyFullName?: string;
    type: number;           /* 授权对象类型 0 人员 1 岗位 */
    userId: number;         /* 授权对象id，根据hrUserType来决定为人员id还是岗位id */
    disabled: boolean;      /* 用户状态 1 停用 0 正常 */
    username: string;
    position: string;
    authorities: string[];
    admin: boolean;            // 是否管理员
    authMap: string;    // Map的Json字符串
}