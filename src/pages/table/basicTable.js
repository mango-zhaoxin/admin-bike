import React, { Component } from 'react';
import { Card, Table } from 'antd';

export default class basicTable extends Component {
    state = {}
    componentDidMount() {
        const data = [
            {
                id: '0',
                username: '赵鑫',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2021-04-30',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '1',
                username: 'Jack',
                sex: '1',
                state: '1',
                interest: '1',
                birthday: '2021-04-30',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            },
            {
                id: '0',
                username: 'Lili',
                sex: '2',
                state: '1',
                interest: '1',
                birthday: '2021-04-30',
                address: '北京市海淀区奥林匹克公园',
                time: '09:00'
            }
        ]

        this.setState({
            dataSource: data
        })

    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '性别',
                dataIndex: 'sex',
            },
            {
                title: '状态',
                dataIndex: 'state',
            },
            {
                title: '爱好',
                dataIndex: 'interest',
            },
            {
                title: '生日',
                dataIndex: 'birthday',
            },
            {
                title: '地址',
                dataIndex: 'address',
            },
            {
                title: '早起时间',
                dataIndex: 'time',
            }
        ]
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        pagination={false}
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>
            </div>
        );
    }
}

