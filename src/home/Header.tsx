import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { AppTitleSpan } from '../layout';
import { ReduxStoreState } from '../store/interface';

class Header extends React.Component<any, any>{
    render() {
        return (
            <div className="marginLeftAndRight">
                <AppTitleSpan>React+Antd各项功能管理界面</AppTitleSpan>
            </div>
        );
    }
}

export default withRouter<any>(connect((_state: ReduxStoreState) => {
    return {

    }
})(Header));