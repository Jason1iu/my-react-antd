// import React from 'react';
import styled from 'styled-components';

export const AppHeader = styled.div<{ height?: string }>`
    min-height: ${props => props.height ? props.height : props.theme.titleHeight}px;
    height: ${props => props.height ? props.height : props.theme.titleHeight};
    line-height: ${props => props.height ? props.height : props.theme.titleHeight}px;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    overflow: hidden;
    background: #ffffff;
    justifyContent: center;
    textAlign: center;
`;

export const AppSider = styled.div<{ width?: string, top?: string }>`
    position: absolute;
    top: ${props => props.top ? props.top : props.theme.titleHeight}px;
    bottom: 0px;
    left: 0px;
    width: ${props => props.width ? props.width : props.theme.navWidth}px;
    background: #ffffff;
    overflow: hidden;
`;

export const AppContent = styled.div<{ width?: string, top?: string }>`
    position: absolute;
    top: ${props => props.top ? props.top : props.theme.titleHeight}px;
    bottom: 0px;
    left: ${props => props.width ? props.width : props.theme.navWidth}px;
    right: 0px;
    overflow: hidden;
`;

export const TreePanel = styled.div<{ width?: string }>`
    position: absolute;
    top: 0px;
    bottom: 0px;
    letf: 0px;
    width: ${props => props.width ? props.width : props.theme.treeWidth}px;
    background: #ffffff;
    overflow: auto;
`;

export const AppTitleSpan = styled.span`
    font-family: 楷体;
    font-size: 24px;
    color: #000000 !important;
    font-weight: 700;
`;