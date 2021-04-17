import React from 'react';
import Child from './Child.js';
import './index.less';

export default class Life extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            count: 0
        }
    }

    componentWillMount () {
        console.log('父组件 - will mount');
    }

    componentDidMount () {
        console.log('父组件 - did mount');
    }

    componentWillReceiveProps (newPorps) {
        console.log(newPorps);
        console.log('父组件 - will receive props' + newPorps.count);
    }

    shouldComponentUpdate () {
        console.log('父组件 - should update');
        return true;
    }

    componentWillUpdate () {
        console.log('父组件 - will update');
    }

    componentDidUpdate () {
        console.log('父组件 - did update');
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
                <button onClick={this.handleClick.bind(this)}>点击一下</button>
                <button onClick={this.handleAdd.bind(this)}>点击一下</button>
                <p>父组件中的count值： {this.state.count}</p>
                <Child count={this.state.count} />
            </div>
        )
    }
}