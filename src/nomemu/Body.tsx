import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, RouteComponentProps } from 'react-router-dom';
import SplitPane from 'react-split-pane';

import { ReduxStoreState, StateKeys } from "../store/interface";
import { ToolBarContent, ToolBar, FullContent, SpacerDiv } from '../layout';
import TableView from './TableView';
import { Tooltip, Button, Icon, Popover, Divider } from "antd";
import { AppUtils } from "../utils/AppUtils";
import { Dispatch } from "redux";
import { IHomeReduxState, ITreeNode } from "../home/interface";
import { NoMenuReduxState } from "./interface";
import SsoTree from "./SsoTree";
import { updateIHomeReduxState } from "../home/action";
import { updateNoMenuReduxState, LoadTableData } from "./action";

interface BodyProps extends RouteComponentProps {
    dispatch: Dispatch;
    home: IHomeReduxState;
    nomenu: NoMenuReduxState;
}

/**
 * 
 */
class Body extends React.Component<BodyProps> {

    componentDidMount() {
        // this.props.dispatch();
    }

    onFocusTreeNodeChange = (selectedNode: ITreeNode, selectedKeys: string[]) => {
        this.props.dispatch(updateIHomeReduxState({
            ssoSelectedKeys: selectedKeys,
            ssoSelectedNode: selectedNode,
        }));
    }

    onExpandTreeNode = (expandKeys: string[]) => {
        this.props.dispatch(updateIHomeReduxState({
            ssoExpandedKeys: expandKeys,
        }));
    }

    getQueryForm = () => {
        return (<div style={{ overflow: "hidden" }}>
            <div style={{ maxHeight: '590px', backgroundColor: '#F5F5F5', overflowY: 'auto', padding: "0px 20px 10px 20px " }}>
                {/* <QueryForm
                    wrappedComponentRef={(form: any) => this.queryForm = form}
                    bean={this.getQueryCondition()}
                    node={this.getOrgId(this.props)}
                    jiesuanType={this.props.htjiesuan.cur_jiesuanType}
                    onFieldValueChange={this.onFieldValueChange}
                /> */}
            </div>
            <Divider style={{ marginBottom: 0, marginTop: 0 }} />
            <div className="flexRow" style={{ margin: '10px 20px 10px 20px' }}>
                <Button style={{ marginRight: 8 }} onClick={() => { }}>
                    重置
                 </Button>
                <SpacerDiv />
                <Button type="primary" onClick={() => { this.onQuery(); this.onShowQueryForm(); }} style={{ marginRight: 10 }}>
                    确定
                </Button>
                <Button onClick={() => { this.onShowQueryForm() }} style={{ marginRight: 0 }}>
                    取消
                </Button>
            </div>
        </div>);
    }

    onShowQueryForm = () => {
        this.props.dispatch(updateNoMenuReduxState({ showquery: !this.props.nomenu.showquery }));
    }

    onQuery = () => {
        this.props.dispatch(LoadTableData(
            this.props.home.ssoSelectedKeys[0],
            this.props.nomenu.currentPage,
        ));
    }

    render() {
        return (
            <FullContent>
                <SplitPane
                    split="vertical"
                    minSize={0}
                    pane1Style={{ display: true ? 'block' : 'none' }}
                    resizerStyle={{ display: true ? 'block' : 'none' }}
                    defaultSize={AppUtils.getSplitDefaultSize()}
                    onChange={(size: number) => { localStorage.setItem('splitPos', size + ''); }}
                >
                    <div>
                        <FullContent className="overflowAuto flexColumn whiteBgColor" >
                            <SsoTree
                                onFocusTreeNodeChange={this.onFocusTreeNodeChange}
                                onExpandTreeNode={this.onExpandTreeNode}
                                treeData={this.props.home.ssoTreeData}
                                selectedKeys={this.props.home.ssoSelectedKeys}
                                expandedKeys={this.props.home.ssoExpandedKeys}
                            />
                        </FullContent>
                    </div>
                    <div>
                        <FullContent>
                            <ToolBar className="toolbarNoBorder leftBorder">
                                <span className="link"><b>{this.props.home.ssoSelectedNode?.text}</b></span>
                                <div className="flexColumn rightBorder" />
                                <Tooltip title="查询">
                                    <Popover
                                        overlayClassName="nopaddingPop"
                                        placement="bottom"
                                        content={this.getQueryForm()}
                                        title="请填写查询条件"
                                        trigger="click"
                                        visible={!!this.props.nomenu?.showquery}
                                        onVisibleChange={this.onShowQueryForm}
                                    >
                                        <Button type="primary" ghost={true} disabled={false} onClick={this.onShowQueryForm} >
                                            <Icon type="search" />
                                        </Button>
                                    </Popover>
                                </Tooltip>
                                <Tooltip title="导出Excel">
                                    <Button disabled={false} type="primary" ghost={true} onClick={() => null}>
                                        <Icon type="file-excel" />
                                    </Button>
                                </Tooltip>
                            </ToolBar>
                            <ToolBarContent>
                                <Switch>
                                    <Route path={`${this.props.match.path}`} render={() => <TableView />} />
                                    <Route render={() => <>建设中...</>} />
                                </Switch>
                            </ToolBarContent>
                        </FullContent>
                    </div>
                </SplitPane>
            </FullContent>
        )
    };
}

export default withRouter(connect((state: ReduxStoreState) => {
    return {
        nomenu: state[StateKeys.nomenu],
        home: state[StateKeys.home],
    };
})(Body));