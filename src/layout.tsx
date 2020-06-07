// import React from 'react';
import styled from 'styled-components';
import { FormItemProps } from 'antd/lib/form/FormItem';

export const FullContent = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    overflow: hidden;
`;

export const AppHeader = styled.div<{ height?: string }>`
    min-height: ${props => props.height || `${props.theme.titleHeight}px`};
    height: ${props => props.height || `${props.theme.titleHeight}`};
    line-height: ${props => props.height || `${props.theme.titleHeight}px`};
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    overflow: hidden;
    background: #ffffff;
    justifyContent: center;
    textAlign: center;
`;

export const AppTitleSpan = styled.span`
    font-family: 楷体;
    font-size: 24px;
    color: #000000 !important;
    font-weight: 700;
`;

export const AppTitleDiv = styled.div`
    font-family: 楷体;
    font-size: 24px;
    font-weight: 700;
    /*chrome私有样式，加前缀，文字显示背景图片*/
    -webkit-background-clip: text;
    animation: move 5s infinite;
    /*设置背景渐变色*/
    background-image: linear-gradient(to right, red, orange, yellow, green, blue, violet, blue, green, yellow, orange, red);
    /*文字颜色设为透明*/
    color: transparent;
`;

export const AppSider = styled.div<{ width?: string, top?: string }>`
    position: absolute;
    top: ${props => props.top || `${props.theme.titleHeight}px`};
    bottom: 0px;
    left: 0px;
    width: ${props => props.width || `${props.theme.navWidth}px`};
    background: #ffffff;
    overflow: hidden;
`;

export const AppContent = styled.div<{ width?: string, top?: string }>`
    position: absolute;
    top: ${props => props.top || `${props.theme.titleHeight}px`};
    bottom: 0px;
    left: ${props => props.width || `${props.theme.navWidth}px`};
    right: 0px;
    overflow: hidden;
`;
/** 树形 */
export const TreePanel = styled.div<{ width?: string }>`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    width: ${props => props.width || `${props.theme.treeWidth}px`};
    background: #ffffff;
    overflow: auto;
`;
/** 树形右侧内容 */
export const TreeRightContent = styled.div<{ left?: string }>`
	position: absolute;
	left: ${props => props.left || `${props.theme.treeWidth}px`};
	margin-left: 0px;
	top: 0px; 
	bottom: 0px;
	right: 0px;
	overflow: hidden;
`;
/** 工具条 */
export const ToolBar = styled.div<{ height?: string, top?: string }>`
	min-height:${props => props.height || `${props.theme.toolbarHeight}px`};
	height:${props => props.height || `${props.theme.toolbarHeight}px`};
	line-height:${props => props.height || `${props.theme.toolbarHeight}px`};
	position: absolute;
	left:0px;
	top: ${props => props.top || "0px"};
	right: 0px;
	overflow:hidden;
	background: #ffffff;
`;
/** 有工具条的内容占满 */
export const ToolBarContent = styled.div<{ top?: string }>`
	position: absolute;
	left:0px;
	top: ${props => props.top || `${props.theme.toolbarHeight}px`};
	bottom: 0px;
	right: 0px;
	overflow: hidden;
	background: #ffffff;
`;

export const SpacerDiv = styled.div`
    flex: 1 1 0%;
    flex-basis: 0%;
`;

export const AutoOverFlowPanel = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: #ffffff;
    overflow: auto;
    width: 100%;
    height: 100%;
`;

export const formItemLayout_4_20: FormItemProps = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    style: { marginBottom: '6px' },
};

export const formItemLayout_8_16: FormItemProps = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
    style: { marginBottom: '6px' },
};

export const formItemLayout_12_12: FormItemProps = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
    style: { marginBottom: '6px' },
};

export const formItemLayout_3_21: FormItemProps = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
    style: { marginBottom: '6px' },
};

export const formItemLayout_6_18: FormItemProps = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    style: { marginBottom: '6px' },
};

export const formItemLayout_9_15: FormItemProps = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
    style: { marginBottom: '6px' },
};