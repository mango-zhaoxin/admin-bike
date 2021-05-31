import React, { Component } from 'react';
import { Card, message, Modal, Table, Button, Divider } from 'antd';
import axios from '../../axios';
import Utils from './../../utils/utils';

export default class heightTable extends Component {
    state = {};

    params = {
        page: 1
    }

    componentDidMount () {
        this.request()
    }

    request () {
        let _this = this;
        axios.ajax({
            url: '/table/list',
            data:{
                params:{
                    page: this.params.page
                },
                isShowLoading: true,
            }
        }).then((res) => {
            if (res.code == 0) {
                res.result.list.map((item, index) => {
                    item.key = index
                })
                this.setState({
                    dataSource: res.result.list
                })
            }
        })
    }

    render () {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
            },
            {
                title: '用户名',
                dataIndex: 'username',
                width: 80,
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                render (sex) {
                    return sex === 1 ? "男" : "女"
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 120,
                render (state) {
                    let config = {
                        "1": "咸鱼一条",
                        "2": "风华浪子",
                        "3": "北大才子",
                        "4": "百度FE",
                        "5": "创业者",
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 120,
                render (interest) {
                    let config = {
                        "1": "游泳",
                        "2": "打篮球",
                        "3": "踢足球",
                        "4": "跑步",
                        "5": "爬山",
                        "6": "骑行",
                        "7": "桌球",
                        "8": "麦霸",
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120,
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 120,
            }
        ]

        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                fixed: "left"
            },
            {
                title: '用户名',
                dataIndex: 'username',
                width: 80,
                fixed: "left"
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                render (sex) {
                    return sex === 1 ? "男" : "女"
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                render (state) {
                    let config = {
                        "1": "咸鱼一条",
                        "2": "风华浪子",
                        "3": "北大才子",
                        "4": "百度FE",
                        "5": "创业者",
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                render (interest) {
                    let config = {
                        "1": "游泳",
                        "2": "打篮球",
                        "3": "踢足球",
                        "4": "跑步",
                        "5": "爬山",
                        "6": "骑行",
                        "7": "桌球",
                        "8": "麦霸",
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 80,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 80,
                fixed: 'right'
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 80,
                fixed: 'right'
            }
        ]
        return (
            <div>
                <Card title="头部固定">
                    <Table
                        bordered
                        pagination={false}
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{y:400}}
                    />
                </Card>
                <Card title="左侧固定" style={{margin: '10px 0'}}>
                    <Table
                        bordered
                        pagination={false}
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ x: 1600 }}
                    />
                </Card>
            </div>
        )
    }
}