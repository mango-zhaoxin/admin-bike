import React, { Component } from 'react';
import {
    Card,
    Form,
    Input,
    Select,
    Radio,
    InputNumber,
    Switch,
    DatePicker,
    TimePicker,
    Upload,
    Icon,
    Checkbox,
    Button,
    message
} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;


class FormRegister extends Component {

    state = {}

    getBase64 = (img, callback)  => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              userImg: imageUrl,
              loading: false,
            }),
          );
        }
    }

    handleSubmit = () =>  {
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo))
        message.success(`${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.userPwd}`)
    }

    render() {
        const { getFieldDecorator } = this.props.form

        const FormItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 10
            }
        }

        const rowObject = {
            minRows: 4, 
            maxRows: 6
        }

        const offsetLayout = {
            wrapperCol: {
                xs: 24, 
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }

        return (
            <div>
                <Card title="注册表单">
                    <Form>
                        <FormItem label="用户名" {...FormItemLayout}>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem label="密码" {...FormItemLayout}>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                })(
                                    <Input placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...FormItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '1',
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...FormItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18,
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态" {...FormItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: "2",
                                })(
                                    <Select>
                                        <Option value="1">咸鱼一条</Option>
                                        <Option value="2">风华浪子</Option>
                                        <Option value="3">北大才子一枚</Option>
                                        <Option value="4">百度FE</Option>
                                        <Option value="5">创业者</Option>
                                        <Option value="6">找工作</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="兴趣爱好" {...FormItemLayout}>
                            {
                                getFieldDecorator('interest', {
                                    initialValue: ["2", "5"],
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">游泳</Option>
                                        <Option value="2">打篮球</Option>
                                        <Option value="3">踢足球</Option>
                                        <Option value="4">跑步</Option>
                                        <Option value="5">爬山</Option>
                                        <Option value="6">骑行</Option>
                                        <Option value="7">桌球</Option>
                                        <Option value="8">麦霸</Option>
                                        <Option value="9">舞者</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚" {...FormItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Switch></Switch>
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...FormItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2021-4-28')
                                })(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...FormItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '回龙观地铁站'
                                })(
                                    <TextArea r autosize={rowObject}></TextArea>
                                )
                            }
                        </FormItem>
                        <FormItem label="早起时间" {...FormItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker/>
                                )
                            }
                        </FormItem>
                        <FormItem label="头像" {...FormItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                  >
                                    {this.state.userImg ? <img src={this.state.userImg} alt="avatar" style={{ width: '100%' }} /> : <Icon type="plus"/>}
                                  </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('userImg')(
                                   <Checkbox>我已阅读过<a href="#">慕课协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(FormRegister)