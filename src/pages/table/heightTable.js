import React, { Component } from 'react';
import { Card, message, Modal, Table, Button, Badge } from 'antd';
import axios from '../../axios';
export default class heightTable extends Component {
    state = {};

    params = {
        page: 1
    }

    componentDidMount () {
        this.request()
    }

    request () {
        axios.ajax({
            url: '/table/high/list',
            data:{
                params:{
                    page: this.params.page
                },
                isShowLoading: true,
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.list.map((item, index) => {
                    item.key = index
                })
                this.setState({
                    dataSource: res.result.list
                })
            }
        })
    }

    handleChange = (pagination, filters, sorter) => {
        console.log(sorter, 'sorter')
        this.setState({
            sortOrder: sorter.order
        })
    }

    // 删除操作
    handleDelete = (item) => {
        const id = item.id;
        Modal.info({
            title: '删除',
            content: `您确定要删除id为${id}的数据吗?`,
            onOk: () => {
                message.success('删除成功');
                this.request();
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

        const columns3 = [
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
                render (sex) {
                    return sex === 1 ? "男" : "女"
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                sorter: (a, b) => {
                    return a.age - b.age
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '状态',
                dataIndex: 'state',
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

        const columns4 = [
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
                render (sex) {
                    return sex === 1 ? "男" : "女"
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                sorter: (a, b) => {
                    return a.age - b.age
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '状态',
                dataIndex: 'state',
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
                render (interest) {
                    let config = {
                        "1": <Badge status="success" text="成功"/>,
                        "2": <Badge status="error" text="报错"/>,
                        "3": <Badge status="default" text="正常"/>,
                        "4": <Badge status="processing" text="进行中"/>,
                        "5": <Badge status="warning" text="警告"/>,
                        "6": <Badge status="warning" text="警告"/>,
                        "7": <Badge status="warning" text="警告"/>,
                        "8": <Badge status="warning" text="警告"/>,
                    }
                    return config[interest]
                }
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
                title: '操作',
                render: (text, item) => {
                    return <Button size="small" type="primary" onClick={() => this.handleDelete(item)}>删除</Button>
                }
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
                        scroll={{y:400}}
                    />
                </Card>
                <Card title="左侧固定" style={{margin: '10px 0'}}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ x: 1600 }}
                    />
                </Card>
                <Card title="年龄排序" style={{margin: '10px 0'}}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" style={{margin: '10px 0'}}>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}