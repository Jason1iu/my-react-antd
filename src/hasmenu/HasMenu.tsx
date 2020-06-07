import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';

import { ReduxStoreState } from "../store/interface";
import { AppContent, AppHeader, AppSider } from '../layout';
import Header from './Header';
import Sider from './Sider';
import DataTable from '../edit';

interface HasMenuProps extends RouteComponentProps {

}

class HasMenu extends React.Component<HasMenuProps, any> {
    render() {
        return (
            <>
                <AppHeader>
                    <Header />
                </AppHeader>
                <AppSider className="topBorder">
                    <Sider />
                </AppSider>
                <AppContent className="topBorder leftBorder">
                    <Switch>
                        <Route path={`/react/data`} render={() => <DataTable />} />
                        <Route render={() => <>建设中...</>} />
                    </Switch>
                </AppContent>
            </>
        )
    };
}

export default withRouter(connect((state: ReduxStoreState) => {
    return {
        home: state.home,
    };
})(HasMenu));