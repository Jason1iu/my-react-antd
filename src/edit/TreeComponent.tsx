import React from 'react';
import { Tree } from 'antd';
import { AntTreeNodeExpandedEvent, AntTreeNodeSelectedEvent, AntTreeNodeCheckedEvent } from 'antd/lib/tree/Tree';

const { TreeNode } = Tree;

interface treeDataType {
    title: string;
    key: string;
    children?: treeDataType[];
}

export default class TreeComponent extends React.Component {

    state = {
        expandedKeys: ['0-0-0', '0-0-1'],
        autoExpandParent: true,
        checkedKeys: ['0-0-0'],
        selectedKeys: [],
    };

    private handleExpand = (expandedKeys: string[], _info: AntTreeNodeExpandedEvent) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    private handleCheck = (checkedKeys: string[] | { checked: string[]; halfChecked: string[]; }, _e: AntTreeNodeCheckedEvent) => {
        this.setState({ checkedKeys });
    };

    private handleSelect = (selectedKeys: string[], _e: AntTreeNodeSelectedEvent) => {
        this.setState({ selectedKeys });
    };

    private renderTreeNodes = (data: treeDataType[]) =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });

    render() {
        return (
            <Tree
                checkable={false}
                onExpand={this.handleExpand}
                expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
                onCheck={this.handleCheck}
                checkedKeys={this.state.checkedKeys}
                onSelect={this.handleSelect}
                selectedKeys={this.state.selectedKeys}
            >
                {this.renderTreeNodes(treeData)}
            </Tree>
        );
    }
}

const treeData: treeDataType[] = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    { title: '0-0-0-0', key: '0-0-0-0' },
                    { title: '0-0-0-1', key: '0-0-0-1' },
                    { title: '0-0-0-2', key: '0-0-0-2' },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    { title: '0-0-1-0', key: '0-0-1-0' },
                    { title: '0-0-1-1', key: '0-0-1-1' },
                    { title: '0-0-1-2', key: '0-0-1-2' },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
];