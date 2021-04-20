import React, { Component } from 'react';
import { HashRouter, Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/main">Main1</Link>
                        </li>
                        <li>
                            <Link to="/abount">Abount1</Link>
                        </li>
                        <li>
                            <Link to="/topic">Topic1</Link>
                        </li>
                        <li>
                            <Link to="/imooc1">imooc1</Link>
                        </li>
                        <li>
                            <Link to="/imooc2">imooc2</Link>
                        </li>
                    </ul>
                    <hr/>
                    {this.props.children}
                </div>
            </HashRouter>
        );
    }
}