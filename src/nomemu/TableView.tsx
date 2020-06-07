import React from 'react';
import { Table } from 'antd';
import { connect } from "react-redux";
import { ReduxStoreState } from "../store/interface";
import { Dispatch } from "redux";
import { ColumnProps, PaginationConfig } from "antd/lib/table";
import { DetailsBean, NoMenuReduxState } from "./interface";
import { LoadTableData } from "./action";
import { IHomeReduxState } from "../home/interface";
import { defaultPageSize } from "../global";
import { AppUtils } from "../utils/AppUtils";

interface TableItemBean extends DetailsBean {
    xh: number;
}

interface TableViewProps {
    dispatch: Dispatch;
    nomenu: NoMenuReduxState;
    home: IHomeReduxState;
}

interface TableViewState {
    loading: boolean;
}

class TableView extends React.Component<TableViewProps, TableViewState> {
    private columns: Array<ColumnProps<TableItemBean>>
    constructor(props: TableViewProps) {
        super(props);

        this.state = {
            loading: false,
        };

        this.columns = [
            {
                title: '序号',
                dataIndex: 'xh',
                width: '60px',
                align: 'center',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: true,
                width: '80px',
                align: 'left',
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                width: '80px',
                align: 'center',
                render: (v: boolean) => <span>{v ? '男' : '女'}</span>
            },
            {
                title: 'Age',
                dataIndex: 'age',
                width: '60px',
                align: 'center',
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday',
                width: '160px',
                align: 'center',
                render: (v: Date) => AppUtils.formatDateTime(v),
            },
            {
                title: 'Email',
                dataIndex: 'email',
                width: '200px',
                align: 'left',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                // width: '200px',
                align: 'left',
            },
        ];
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.props.dispatch(LoadTableData(
            this.props.home.ssoSelectedKeys[0],
            this.props.nomenu.currentPage,
        ));
    }

    handleTableChange = (pagination: PaginationConfig) => {
        this.props.dispatch(LoadTableData(
            this.props.home.ssoSelectedKeys[0],
            pagination.current ?? this.props.nomenu.currentPage,
        ));
    };

    render() {
        const pagination: PaginationConfig = {
            total: this.props.nomenu.total ?? 0,
            current: this.props.nomenu.currentPage ?? 1,
            pageSize: defaultPageSize,
            hideOnSinglePage: true,
        };

        return (
            <div className="flexColumn" style={{ width: '100%', height: '100%' }}>
                <Table
                    size={"small"}
                    bordered={true}
                    columns={this.columns}
                    rowKey={record => record.id + ''}
                    dataSource={AppUtils.addXh(this.props.nomenu.tableData, this.props.nomenu.currentPage, defaultPageSize)}
                    pagination={pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default connect((state: ReduxStoreState) => {
    return {
        nomenu: state.nomenu,
        home: state.home,
    }
})(TableView);