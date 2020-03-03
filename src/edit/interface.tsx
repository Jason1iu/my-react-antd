//未在此处声明的变量将不能被使用
export interface EditReduxState {
    fetching: boolean;
    infoKey?: string;       //Form详情页的Menukey值
}

export enum MenuKey {
    mail = 'mail',
    app = 'app',
}