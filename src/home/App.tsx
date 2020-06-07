import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, RouteComponentProps, Redirect } from 'react-router-dom';

import { ReduxStoreState, StateKeys } from "../store/interface";
import NoMenu from '../nomemu/NoMenu';
import { Dispatch } from "redux";
import { fetchLoginUser } from "./action";
import { IHomeReduxState } from "./interface";
import { Spin } from "antd";

interface HomeAppProps extends RouteComponentProps {
    dispatch: Dispatch;
    home: IHomeReduxState;
}

class HomeApp extends React.Component<HomeAppProps, any> {

    componentDidMount() {
        this.props.dispatch(fetchLoginUser({}));
    }

    render() {
        if (this.props.home.fetchingUser) {
            return (
                <div style={{ textAlign: "center" }} >
                    <Spin tip="加载中..." />
                </div>
            );
        }

        return (
            <>
                <Switch>
                    {/* <Route path={`/react/hasmenu`} render={() => <HasMemu />} /> */}
                    <Route path={`/react/nomenu`} render={() => <NoMenu />} />
                    {/* <Route render={() => <>建设中...</>} /> */}
                    <Redirect to={`/react/nomenu`} />
                </Switch>
            </>
        )
    };
}

export default withRouter(connect((state: ReduxStoreState) => {
    return {
        home: state.home,
        nomenu: state.nomenu,
        system: state[StateKeys.system],
    };
})(HomeApp));