import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './index.less';
import Util from '../../utils/utils';
import axios from '../../axios';

export default class Header extends Component {
    state = {}

    componentWillMount() {
        this.setState({
            username: "赵鑫"
        });
        setInterval(() => {
            let systime = Util.formateDate(new Date().getTime());
            this.setState({
                systime
            })
        }, 1000);

        this.getWeatherAPIData();
    }

    getWeatherAPIData() {
        // let city = "北京"
        axios.jsonp({
            // url: 'http://api.map.baidu.com/weather/v1/?location=116.40387,39.91489&data_type=all&ak=84qwIG9nwmFZGFMnmF0c6vy2ccor81rQ'
            // url: 'http://api.map.baidu.com/reverse_geocoding/v3/?ak=ccmBPiAa8OZVSsB3yGfQDS0UMdMLmQ2H&output=json&coordtype=wgs84ll&location=31.225696563611,121.49884033194'
            // +encodeURIComponent(city)
            url: 'http://api.map.baidu.com/weather/v1/?district_id=110114&data_type=all&ak=GZ3nhnNBGUU6GkDeI1wMIpDUbw14wUK6',
        }).then((res) => {
            if (res.status === "success") {
                console.log(res);
            }
            // if(res.status == 'success'){
            //     let data = res.results[0].weather_data[0];
            //     this.setState({
            //         dayPictureUrl:data.dayPictureUrl,
            //         weather:data.weather
            //     })
            // }
        })
    }

    render() {
        const { menuType } = this.props;
        return (
            <div className="header">
                <Row className="header-top">
                    {
                       menuType ? <Col span={6} className="logo">
                            <img src="/assets/logo-ant.svg" alt="" />
                            <span>IMooc 通用管理系统</span>
                        </Col> : ""
                    }
                    <Col span= {menuType ? 18 : 24 }>
                        <span>欢迎，{this.state.username}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType ? "" : <Row className="breadcrumb">
                        <Col span="4" className="breadcrumb-title">
                            首页
                        </Col>
                        <Col span="20" className="weather">
                            <span className="date">{this.state.systime}</span>
                            {/* <span className="weather-detail">晴朗</span> */}
                            <span className="weather-img">
                                <img src={this.state.dayPictureUrl} alt="" />
                            </span>
                            <span className="weather-detail">
                                {/* {this.state.weather} */}
                                晴朗
                            </span>
                        </Col>
                    </Row>
                }
            </div>
        )
    }
}