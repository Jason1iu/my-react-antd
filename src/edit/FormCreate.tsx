import { Col, Form, Input, Row, Select, Divider, Tooltip, Icon, Radio, Checkbox, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { styledTheme } from '../global';
import { formItemLayout_3_21, formItemLayout_6_18, formItemLayout_9_15 } from '../layout';
import { Dispatch } from 'redux';
import * as Actions from './action';
import { EditReduxState, MenuKey } from './interface';

interface ObjetcBean {
    id: number;
    name: string;
    age: number;
    gender: boolean;
    nation: string;
    native: string;
    work: string;
    graduates: boolean;
}

export interface FormCreateProps extends FormComponentProps {
    dispatch: Dispatch;
    bean?: ObjetcBean;
}

/**
 * 创建Form表单
 */
class FormCreate extends React.Component<FormCreateProps>{

    constructor(props: FormCreateProps) {
        super(props);

        props.dispatch(Actions.updateEditReduxState({ infoKey: MenuKey.mail } as EditReduxState));
    }

    private getSelectOptions = (_dictKey: string) => {
        return [];
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { bean } = this.props;
        return (
            <Form style={{ margin: "5px 10px" }} hideRequiredMark={true}>
                <Row>
                    <Col span={12}>
                        <Form.Item label='姓名' {...formItemLayout_6_18}>
                            {getFieldDecorator('name', {
                                initialValue: bean?.name,
                                rules: [{ required: false, message: '请输入姓名' }]
                            })(<Input autoComplete='' placeholder='请输入姓名...' />)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='性别' {...formItemLayout_6_18}>
                            {getFieldDecorator('gender', {
                                initialValue: bean?.gender,
                                rules: [{ required: true, message: '请选择性别' }]
                            })(
                                <Radio.Group onChange={() => null}>
                                    <Radio value={true}>男</Radio>
                                    <Radio value={false}>女</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Divider style={{ margin: '5px 0px' }}>基本信息</Divider>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item label='民族' {...formItemLayout_6_18}>
                            {getFieldDecorator('nation', {
                                initialValue: bean?.nation,
                            })(
                                <Select placeholder='请选择民族...'>
                                    {this.getSelectOptions('')}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Col span={12}>
                            <Form.Item label='年龄' {...formItemLayout_9_15}>
                                {getFieldDecorator('age', {
                                    initialValue: bean?.age,
                                })(
                                    <InputNumber style={{ width: '100%' }} min={1} max={200} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label=' ' colon={false} {...formItemLayout_9_15}>
                                {getFieldDecorator('graduates', {
                                    initialValue: bean?.graduates,
                                    valuePropName: 'checked',
                                })(
                                    <Checkbox>应届生</Checkbox>
                                )}
                            </Form.Item>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label={
                                <span>
                                    工作经历
                                    &nbsp;
                                    <Tooltip title="最近五年内的工作经历">
                                        <Icon type="question-circle-o" style={{ color: styledTheme.linkColor }} />
                                    </Tooltip>
                                </span>
                            }
                            {...formItemLayout_3_21}>
                            {getFieldDecorator('work', {
                                initialValue: bean?.work,
                            })(
                                <Input.TextArea
                                    autoComplete=''
                                    placeholder='请输入最近五年内的工作经历...'
                                    autoSize={{ minRows: 3, maxRows: 20 }}
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        );
    }
}
export default Form.create<FormCreateProps>()(FormCreate);
