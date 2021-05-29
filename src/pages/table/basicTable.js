import React, { Component } from 'react';
import { Card, Table } from 'antd';
import axios from '../../axios';
// import axios from "axios";

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

        const dataSource2 = []

        this.setState({
            dataSource: data,
            dataSource2: dataSource2
        });

        this.request();
    }

    // 动态获取mock数据
    request  = () => {
        // 方式一：直接使用axios进行请求
        // const baseUrl = 'https://www.fastmock.site/mock/f5ebc7863fe48c5ac46e232eaa9700bb/mockapi'
        // axios.get(baseUrl + '/table/list').then((res) => {
        //     console.log(JSON.stringify(res))
        //     if(res.status === 200 && res.data.code === 0) {
        //         this.setState({
        //             dataSource2: res.data.result
        //         })
        //     }
        // })

        // 方式二：使用封装的axios进行请求
        axios.ajax({
            url: '/table/list',
            data:{
                params:{
                    page: 1
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    dataSource2: res.result
                })
            }
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
                 <Card title="动态数据渲染表格" style={{margin: '10px 0'}}>
                    <Table
                        bordered
                        pagination={false}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                    />
                </Card>
            </div>
        );
    }
}

