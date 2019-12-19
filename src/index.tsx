import './index.less';
import '../public/resources/iconfont/iconfont.css';
import 'whatwg-fetch';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { getContextPath, styledTheme } from './global';
import MainApp from './home';
import { store } from './store/store';
import request from './utils/request';

const webpackPublicPath = getContextPath();
const basename = webpackPublicPath;
const supportsHistory = 'pushState' in window.history;


const App = () => {
    return (
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <BrowserRouter
                    basename={basename}
                    forceRefresh={!supportsHistory}
                    keyLength={12}
                >
                    <ThemeProvider theme={styledTheme}>
                        <MainApp />
                    </ThemeProvider>
                </BrowserRouter>
            </ConfigProvider>
        </Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

const keepAlive = () => {
    request(getContextPath() + `/api/blank`, { method: 'GET' });
}
window.setInterval(keepAlive, 1000 * 60 * 5);