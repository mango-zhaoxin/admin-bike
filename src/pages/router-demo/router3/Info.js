import React, { Component } from "react";


export default class Topic extends Component {
    componentWillReceiveProps(nextProps){  

        // console.log(nextProps.match.params)

        console.log(this.props)

    }
    render () {
        return(
            <div>
                这里是测试动态路由功能。
                {/* 动态路由的值是：{this.props.match.params.value} */}
            </div>
        );
    }
}