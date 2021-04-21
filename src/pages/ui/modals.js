import React from 'react'
import { Card, Modal, Button, Tabs } from 'antd'
import './ui.less';

const { TabPane } = Tabs;

export default class Buttons extends React.Component {

    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,
    };

    handleOpen = (type) => {
        this.setState({
            [type]: true
        })
    };

    handleConfirm = (type) => {
        Modal[type]({
            title: '确认',
            content: '你确定你学会了吗？',
            onOk(){
                console.log('ok');
            },
            onCancel(){
                console.log('cancle');
            }
        })
    }

    render() {
        return (
            <div>

                <Card title="基础模块" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleOpen('showModal1')}>open</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal3')}>距顶部20px弹框</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>

                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
                    <Button type="danger"  onClick={() => this.handleConfirm('error')}>Error</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>Warning</Button>
                </Card>

                <Modal
                    title="React"
                    visible={this.state.showModal1}
                    onCancel={() => {
                        this.setState({
                            showModal1: false
                        })
                    }}
                >
                    <p>欢迎学习慕课新推出的React高级课程 - 共享单车</p>
                </Modal>

                <Modal
                    title="React"
                    visible={this.state.showModal2}
                    okText="好的"
                    cancelText="取消"
                    onCancel={() => {
                        this.setState({
                            showModal2: false
                        })
                    }}
                >
                    <p>欢迎学习慕课新推出的React高级课程 - 共享单车</p>
                </Modal>

                <Modal
                    title="React"
                    visible={this.state.showModal3}
                    style={{top: 20}}
                    onCancel={() => {
                        this.setState({
                            showModal3: false
                        })
                    }}
                >
                    <p>欢迎学习慕课新推出的React高级课程 - 共享单车</p>
                </Modal>

                <Modal
                    title="React"
                    visible={this.state.showModal4}
                    wrapClassName="vertical-center-modal"
                    onCancel={() => {
                        this.setState({
                            showModal4: false
                        })
                    }}
                >
                    <p>欢迎学习慕课新推出的React高级课程 - 共享单车</p>
                </Modal>

                <Card className="card-wrap">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Card>
            </div>

        );
    }
}