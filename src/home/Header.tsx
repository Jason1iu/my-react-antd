import React from 'react';
import { connect } from 'react-redux';

import { AppTitleSpan } from '../layout';
import { ReduxStoreState, StateKeys } from '../store/interface';
import { IHomeReduxState } from "./interface";

interface IHeaderProps {
    home: IHomeReduxState;
}

class Header extends React.Component<IHeaderProps> {
    render() {
        return (
            <div className="marginLeftAndRight">
                <AppTitleSpan>React+Antd各项功能管理界面</AppTitleSpan>
                <div className="spacer">&nbsp;</div>
                <div>您好：{this.props.home.loginUser?.username}</div>
            </div>
        );
    }
}

export default connect((state: ReduxStoreState) => {
    return {
        home: state[StateKeys.home],
    }
})(Header);