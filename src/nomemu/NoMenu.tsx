import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import { ReduxStoreState } from "../store/interface";
import { AppContent, AppHeader } from '../layout';
import Header from './Header';
import Body from './Body';

interface NoMenuProps extends RouteComponentProps {

}

/**
 * 没有左侧导航栏的界面
 */
class NoMenu extends React.Component<NoMenuProps> {
    render() {
        return (
            <>
                <AppHeader>
                    <Header />
                </AppHeader>
                <AppContent width={'0px'} className="topBorder">
                    <Switch>
                        <Route path={`${this.props.match.path}/tabledata`} render={() => <Body />} />
                        {/* <Route render={() => <>建设中...</>} /> */}
                        <Redirect to={`${this.props.match.path}/tabledata`} />
                    </Switch>
                </AppContent>
            </>
        )
    };
}

export default withRouter(connect((state: ReduxStoreState) => {
    return {
        nomenu: state.nomenu,
    };
})(NoMenu));