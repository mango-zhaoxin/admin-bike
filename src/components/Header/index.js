import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './index.less';
import Util from '../../utils/utils'

export default class Header extends Component {
    state = {}

    componentWillMount () {
        this.setState({
            username: "赵鑫"
        });
        setInterval(() => {
            let systime = Util.formateDate(new Date().getTime());
            this.setState({
                systime
            })
        }, 1000);
    }

    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>欢迎，{ this.state.username }</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span="20" className="weather">
                        <span className="date">{ this.state.systime }</span>
                        <span className="weather-detail">晴朗</span>
                    </Col>
                </Row>
            </div>
        )
    }
}