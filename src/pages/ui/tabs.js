import React from 'react';
import { Card, Icon, Tabs, message } from 'antd';
import './ui.less';

const { TabPane } = Tabs;

export default class Tab extends React.Component {

    newTabIndex = 0;

    callback = (key) => {
        message.info("HI, 您选择了页签：" + key)
    }

    componentWillMount() {
        const panes = [
            {
                title: 'Tab 1',
                content: '恭喜你，React课程晋级成功',
                key: '1'
            },
            {
                title: 'Tab 2',
                content: 'Hello World',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: '加油呀',
                key: '3'
            },
        ]
        this.setState({
            panes: panes,
            activeKey: panes[0].key
        })
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: `Tab${this.newTabIndex++}`, key: activeKey });
        this.setState({ panes, activeKey });
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };

    render() {
        return (
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">恭喜你，React课程晋级成功</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>hello world</TabPane>
                        <TabPane tab="Tab 3" key="3">加油呀</TabPane>
                    </Tabs>
                </Card>

                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane key="1" tab={<span><Icon type="plus" />Tab 1</span>}>恭喜你，React课程晋级成功</TabPane>
                        <TabPane key="2" tab={<span><Icon type="edit" />Tab 2</span>}>hello world</TabPane>
                        <TabPane key="3" tab={<span><Icon type="delete" />Tab 3</span>}>加油呀</TabPane>
                    </Tabs>
                </Card>

                <Card title="Tab-增加删除" className="card-wrap">
                    <Tabs
                        type="editable-card"
                        activeKey={this.state.activeKey}
                        onChange={this.onChange}
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((panel) => {
                                return <TabPane key={panel.key} tab={panel.title}>{panel.content}</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>

        );
    }
}