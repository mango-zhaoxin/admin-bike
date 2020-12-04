import React from 'react';
import Child from './Child.js';
import { Button } from 'antd';
import './index.less';

export default class Life extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            count: 0
        }
    }

    handleClick () {
        this.setState({
            count: this.state.count + 1
        })
    }

    handleAdd () {
        this.setState({
            count: this.state.count + 1
        })
    }
    
    render() {
        return (
            <div className="content">
                <p>React 生命周期介绍</p>
                <Button onClick={this.handleClick.bind(this)}>antd 点击一下</Button>
                <button onClick={this.handleClick.bind(this)}>点击一下</button>
                <button onClick={this.handleAdd.bind(this)}>点击一下</button>
                <p>父组件中的count值： {this.state.count}</p>
                <Child count={this.state.count} />
            </div>
        )
    }
}