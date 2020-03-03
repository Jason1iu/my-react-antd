import React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom';
import { Menu, Button, message } from 'antd';
import { FullContent, ToolBar, ToolBarContent, SpacerDiv, AutoOverFlowPanel } from '../layout';
import { ClickParam } from 'antd/lib/menu';
import FormCreate, { FormCreateProps } from './FormCreate';
import FormSubmit, { FormSubmitProps } from './FormSubmit';
import { MenuKey } from './interface';
import { Dispatch } from 'redux';
import { StateKeys } from '../store/interface';
import { updateEditReduxState } from './action';

interface DataEditProps extends RouteComponentProps {
    infoKey: string;
    dispatch: Dispatch;
}

interface DataEditState {

}

class DataEdit extends React.Component<DataEditProps, DataEditState>{
    public editForm: React.Component<FormCreateProps> | undefined;
    public submitForm: React.Component<FormSubmitProps> | undefined;
    constructor(props: DataEditProps) {
        super(props);
        this.state = {

        };
    }

    // static getDerivedStateFormProps(_nextProps: Readonly<DataEditProps>, _prevState: Readonly<DataEditState>) {
    //     let newState = null;
    //     return newState;
    // }

    public componentWillUnmount() {
        this.props.dispatch(updateEditReduxState({ infoKey: undefined }));
    }

    private handleClick = (param: ClickParam): void => {
        this.props.dispatch(updateEditReduxState({ infoKey: param.key }));
        this.props.history.replace(`${this.props.match.url}/${param.key}`);
    };

    private getToolbarComponent = (): JSX.Element => {
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.props.infoKey]} mode="horizontal">
                <Menu.Item key={MenuKey.mail}>
                    mail
                </Menu.Item>
                <Menu.Item key={MenuKey.app}>
                    app
                </Menu.Item>
                <Menu.Item key="test" disabled={true}>
                    test
                </Menu.Item>
                <Menu.SubMenu
                    title={
                        <span className="submenu-title-wrapper">
                            Submenu
                        </span>
                    }
                >
                    <Menu.ItemGroup title="Item 1">
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="Item 2">
                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </Menu.ItemGroup>
                </Menu.SubMenu>
            </Menu>
        );
    }

    private getOperationBtns = () => {
        return (
            <div className="bottomBorder">
                <Button onClick={this.handleSave}>保存</Button>
                <Button onClick={this.handleBack}>返回</Button>
            </div>
        );
    }

    private handleSave = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        e.preventDefault();
        const { infoKey } = this.props;
        if (infoKey === MenuKey.mail) {
            this.editForm?.props.form.validateFieldsAndScroll({ force: true }, (err: any, values: any) => {
                if (err) {
                    message.warn('有未录入的字段！');
                    return;
                }
                console.log('values:', values);
            });
        }
        else if (infoKey === MenuKey.app) {
            this.submitForm?.props.form.validateFieldsAndScroll({ force: true }, (err: any, values: any) => {
                if (err) {
                    message.warn('有未录入的字段！');
                    return;
                }
                console.log('values:', values);
            });
        }

    }

    private handleBack = (): void => {
        this.props.history.goBack();
    }

    render() {

        const propsFormCreate = {
            wrappedComponentRef: (o: React.Component<FormCreateProps>) => this.editForm = o,
            dispatch: this.props.dispatch,
        }

        const propsFormSubmit = {
            wrappedComponentRef: (o: React.Component<FormSubmitProps>) => this.submitForm = o,
            dispatch: this.props.dispatch,
        }

        return (
            <FullContent className="leftBorder">
                <ToolBar className="flexRow">
                    {this.getToolbarComponent()}
                    <SpacerDiv className="bottomBorder" />
                    {this.getOperationBtns()}
                </ToolBar>
                <ToolBarContent>
                    <Switch>
                        <Route exact={true} path={`${this.props.match.path}/${MenuKey.mail}`} render={() => (
                            <AutoOverFlowPanel>
                                <FormCreate {...propsFormCreate} />
                            </AutoOverFlowPanel>
                        )} />
                        <Route exact={true} path={`${this.props.match.path}/${MenuKey.app}`} render={() => (
                            <AutoOverFlowPanel>
                                <FormSubmit {...propsFormSubmit} />
                            </AutoOverFlowPanel>
                        )} />
                        <Redirect to={`${this.props.match.url}/${MenuKey.mail}`} />
                    </Switch>
                </ToolBarContent>
            </FullContent>
        );
    }
}

export default withRouter(connect<any, any, any>((state: any) => {
    const { infoKey } = state[StateKeys.edit];
    return {
        infoKey,
    }
})(DataEdit));