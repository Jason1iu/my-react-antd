export interface NoMenuReduxState {
    fetching: boolean;
    total: number;
    currentPage: number;
    tableData: DetailsBean[];
    showquery: boolean;
}

export interface DetailsBean {
    id: number;
    name: string;
    gender: boolean;
    age: number;
    birthday: Date;
    email: string;
    address: string;
}