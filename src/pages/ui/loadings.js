import React from 'react'
import { Card, Spin, Icon, Alert } from 'antd'
import './ui.less'
export default class Loadings extends React.Component {

    render() {
        const icon = <Icon type="loading" style={{ fontSize: '24px' }} />
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"></Spin>
                    <Spin style={{ margin: '0 15px' }}></Spin>
                    <Spin size="large"></Spin>
                    <Spin indicator={icon} style={{ margin: '0 0 0 30px' }}></Spin>
                </Card>

                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="react"
                        description="hello"
                        type="info"
                    />
                    <Spin>
                        <Alert
                            message="react"
                            description="hello"
                            type="warning"
                        />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="react"
                            description="hello"
                            type="warning"
                        />
                    </Spin>
                    <Spin indicator={icon}>
                        <Alert
                            message="react"
                            description="hello"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
}