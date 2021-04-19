import React, { Component } from 'react';
import { HashRouter, Link } from 'react-router-dom';


export default class Home extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Main1</Link>
                        </li>
                        <li>
                            <Link to="/abount">Abount1</Link>
                        </li>
                        <li>
                            <Link to="/topic">Topic1</Link>
                        </li>
                    </ul>
                    <hr/>
                    {this.props.children}
                </div>
            </HashRouter>
        );
    }
}