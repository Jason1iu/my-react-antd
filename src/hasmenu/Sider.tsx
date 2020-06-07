import { Menu, Icon } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { ReduxStoreState } from '../store/interface';
import { Link } from 'react-router-dom';

// const { SubMenu } = Menu;

const Sider: React.FC = () => {

    return (
        <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={['viewEdit']}
            defaultOpenKeys={['viewEdit']}
            mode="inline"
        >
            <Menu.Item key="viewEdit">
                <Link to={`/react/data`}>
                    <Icon type="schedule" />
                    <span>查看编辑</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="report">
                <Link to={`/react/report`}>
                    <Icon type="table" />
                    <span>统计报表</span>
                </Link>
            </Menu.Item>
            {/* <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="appstore" />
                            <span>Navigation Two</span>
                        </span>
                    }
                >
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu
                    key="sub4"
                    title={
                        <span>
                            <Icon type="setting" />
                            <span>Navigation Three</span>
                        </span>
                    }
                >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu> */}
        </Menu>
    );
}

export default withRouter<any>(connect((_state: ReduxStoreState) => {
    return {

    }
})(Sider));