import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AppContent, AppHeader, AppSider } from '../layout';
import Header from './Header';
import Sider from './Sider';

/**
 * 应用程序界面，统一加载用户、代码字典、任务
 * @param props 
 */
const App: FunctionComponent = (_props: any) => {

    return (
        <>
            <AppHeader>
                <Header />
            </AppHeader>
            <AppSider className="topBorder">
                <Sider />
            </AppSider>
            <AppContent className="topBorder leftBorder">
                AppContent
            </AppContent>
        </>
    );
}

export default withRouter(connect((_state: any) => {
    return {

    };
})(App));