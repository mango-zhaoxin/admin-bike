import React from 'react';

export default class Child extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            count: 0
        }
    }

    componentWillMount () {
        console.log('will mount');
    }

    componentDidMount () {
        console.log('did mount');
    }

    componentWillReceiveProps (newPorps) {
        console.log(newPorps);
        console.log('will receive props' + newPorps.count);
    }

    shouldComponentUpdate () {
        console.log('should update');
        return true;
    }

    componentWillUpdate () {
        console.log('will update');
    }

    componentDidUpdate () {
        console.log('did update');
    }

    render() {
        return (
            <div>
                <p>这里是子组件</p>
                <p>子组件中的count值：{this.props.count}</p>
            </div>
        )
    }
}