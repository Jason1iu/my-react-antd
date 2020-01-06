import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { ReduxStoreState } from '../store/interface';

class Sider extends React.Component<any, any>{
    render() {
        return (
            <div>
                Sider
            </div>
        );
    }
}

export default withRouter(connect((_state: ReduxStoreState) => {
    return {

    }
})(Sider));