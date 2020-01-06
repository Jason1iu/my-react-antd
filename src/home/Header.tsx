import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { AppTitleSpan } from '../layout';
import { ReduxStoreState } from '../store/interface';

class Header extends React.Component<any, any>{
    render() {
        return (
            <div>
                <AppTitleSpan>React+Antd各项功能管理界面</AppTitleSpan>
            </div>
        );
    }
}

export default withRouter(connect((_state: ReduxStoreState) => {
    return {

    }
})(Header));