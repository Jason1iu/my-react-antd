import React from 'react';
import { AppTitleDiv } from '../layout';
import { connect } from 'react-redux';

import { ReduxStoreState, StateKeys } from '../store/interface';
import { IHomeReduxState } from "../home/interface";

interface IHeaderProps {
    home: IHomeReduxState;
}

class Header extends React.Component<IHeaderProps> {
    render() {
        return (
            <div className="marginLeftAndRight flexRow">
                <div style={{ margin: 'auto 2px' }}>
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" alt="" height="35" />
                </div>
                <AppTitleDiv>
                    React+Antd各项功能管理界面
                </AppTitleDiv>
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