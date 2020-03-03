import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Switch, Route, Redirect } from 'react-router-dom';
import { Table } from 'antd';
import { TableRowSelection, ColumnProps } from 'antd/lib/table/interface';

import { FullContent, TreePanel, TreeRightContent, ToolBar, ToolBarContent } from '../layout';
import TreeComponent from './TreeComponent';
import DataEdit from './DataEdit';

interface TableDataType {
    id: number;
    key: string;
    name: string;
    age: number;
    address: string;
}

interface DataTableProps {
    [key: string]: any;
}

interface DataTableState {
    [key: string]: any;
}

class DataTable extends React.Component<DataTableProps, DataTableState>{
    private columns: ColumnProps<any>[];
    constructor(props: DataTableProps) {
        super(props);

        this.state = {};

        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                render: (text: React.ReactNode, record: TableDataType) => <Link to={`${props.match.url}/list/${record.id}`}>{text}</Link>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
            },
        ];
    }

    private mainComponent = () => {
        const rowSelection: TableRowSelection<any> = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return (
            <FullContent>
                <TreePanel>
                    <TreeComponent />
                </TreePanel>
                <TreeRightContent className="leftBorder">
                    <ToolBar className="marginLeftAndRight">
                        ToolBar
                    </ToolBar>
                    <ToolBarContent className="topBorder">
                        <Table
                            rowSelection={rowSelection}
                            columns={this.columns}
                            dataSource={data}
                        />
                    </ToolBarContent>
                </TreeRightContent>
            </FullContent>
        );
    }

    render() {
        return (
            <Switch>
                <Route exact={true} path={`${this.props.match.path}/list`} render={() => this.mainComponent()} />
                <Route path={`${this.props.match.path}/list/:id`} render={() => <DataEdit />} />
                <Redirect to={`/react/data/list`} />
            </Switch>
        );
    }
}

export default withRouter(connect<any, any, any>((_state: any) => {
    return {

    }
})(DataTable));

const data: TableDataType[] = [
    {
        id: 1,
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        id: 2,
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        id: 3,
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        id: 4,
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    },
];