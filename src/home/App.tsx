import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/**
 * 应用程序界面，统一加载用户、代码字典、任务
 * @param props 
 */
const App: FunctionComponent = (_props: any) => {
    
    return (
        <div>运行成功！</div>
    );
}

export default withRouter(connect((_state: any) => {
    return {
        
    };
})(App));