import { Tree, Icon } from 'antd';
import React, { Component } from 'react';

import request from '../utils/request';
import { isNullOrUndefined } from 'util';
import { AppUtils } from "../utils/AppUtils";

interface SsoTreeProps {
    onSelectTreeNode?: (selectedNode: any, selectedKeys: string[]) => void;         //双击选择
    onFocusTreeNodeChange?: (selectedNode: any, selectedKeys: string[]) => void;    //当前焦点TreeNode改变
    onExpandTreeNode?: (expandKeys: string[]) => void;                              //展开的节点发生变化
    treeData?: any[];
    expandedKeys?: string[];
    selectedKeys?: string[];
    statusData?: any;
}

interface SsoTreeState {
    treeData: any[];
    expandedKeys: string[];
    selectedKeys: string[];
}

export default class SsoTree extends Component<SsoTreeProps, SsoTreeState>{
    constructor(props: SsoTreeProps) {
        super(props);
        if (!isNullOrUndefined(props.treeData) && !isNullOrUndefined(props.expandedKeys) && !isNullOrUndefined(props.selectedKeys)) {
            this.state = { treeData: props.treeData, expandedKeys: props.expandedKeys, selectedKeys: props.selectedKeys };
        }
        else {
            this.state = { treeData: [{ id: '0', text: '集团公司', leaf: false }], expandedKeys: ["0"], selectedKeys: ["0"] };
        }
    }

    renderTreeNodes = (data: any[]): any => {
        return data.map((item) => {
            let icon: any = undefined;
            let style = {};
            let text = item.text;
            const statusData = this.props.statusData;
            if (!isNullOrUndefined(statusData)) {
                if (statusData[item.id] == 1) {
                    style = { color: 'red' };
                    text = <span style={style}>{item.text}</span>;
                }
            }
            if ((item.id).startsWith('T') || (item.id).startsWith('C') || item.id == '0') {
                icon = <div style={style} className="iconfont icon-company" />;
            }
            else if ((item.id).startsWith('c')) {
                icon = <div style={style} className="iconfont icon-department" />;
            }
            else if ((item.id).startsWith('G')) {
                icon = <Icon style={style} type="project" />
            }
            else if ((item.id).startsWith('D')) {
                icon = <div style={style} className="iconfont icon-department" />;
            }
            else if ((item.id).startsWith('P')) {
                icon = <div style={style} className="iconfont icon-position" />;
            }
            if (item.children) {
                return (
                    <Tree.TreeNode icon={icon} title={text} key={item.id} isLeaf={item.leaf} {...{ data: item }}>
                        {this.renderTreeNodes(item.children)}
                    </Tree.TreeNode>
                );
            }
            else {
                return <Tree.TreeNode icon={icon} title={text} key={item.id} isLeaf={item.leaf} {...{ data: item }} />;
            }
        });
    }

    renderLeafTreeNodes = (data: any[]): any => {
        if (data?.length && data[0].children?.length) {
            const childData = data[0].children;
            this.renderTreeNodes(childData);
        }
    }

    onLoadTreeData = (treeNode: any): any => {
        return new Promise((resolve) => {
            if (treeNode.props.isLeaf && treeNode.props.children) {
                resolve();
            }
            else {
                const url = `${AppUtils.getContextPath()}/api/ssoTree/${treeNode.props.eventKey}`;
                return request(url, {
                    method: 'GET'
                }).then((res: any) => {
                    if (res?.success) {
                        treeNode.props.data.children = res?.data?.ssotree.map((s: any) => {
                            let sanji: any = {};
                            if (s.sanji) {
                                sanji = { sanji: s.sanji };
                            }
                            return { ...{ fullName: s.fullName, text: s.text, id: s.id, leaf: s.leaf }, ...sanji };
                        });
                    }

                    //重新render
                    this.setState({
                        treeData: [...this.state.treeData],
                    });
                    resolve();
                });
            }
            return;
        });
    }

    onSelectTreeNode = (selectedKeys: any[], _info: any) => {
        if (_info.selected) {
            this.setState({ selectedKeys });
            if (this.props.onFocusTreeNodeChange) {
                this.props.onFocusTreeNodeChange({ ..._info.node.props.data }, selectedKeys);
            }
        }
    }

    onExpandTreeNode = (expandedKeys: any[]) => {
        this.setState({ expandedKeys });
        if (this.props.onExpandTreeNode) {
            this.props.onExpandTreeNode(expandedKeys);
        }
    }

    onDoubleClick = (_e: any, _node: any) => {
        this.setState({ selectedKeys: [_node.props.data.id] });
        if (this.props.onSelectTreeNode) {
            this.props.onSelectTreeNode({ ..._node.props.data }, [_node.props.data.id]);
        }
    }

    render() {
        return (
            <Tree
                showIcon={true}
                showLine={false}
                loadData={this.onLoadTreeData}
                selectedKeys={this.state.selectedKeys}
                expandedKeys={this.state.expandedKeys}
                onSelect={this.onSelectTreeNode}
                onExpand={this.onExpandTreeNode}
                onDoubleClick={this.onDoubleClick}
            >
                {this.renderTreeNodes(this.state.treeData)}
            </Tree>
        );
    }
}
