import React from "react";
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Main from '../router1/Main';
import Abount from '../router1/Abount';
import Topic from '../router1/Topic'
import Home from './Home';

export default class IRouter extends React.Component {
    render() {
        return (
            <Router>
                <Home>
                    <Route exact={true} path="/" component={Main}></Route>
                    <Route path="/abount" component={Abount}></Route>
                    <Route path="/topic" component={Topic}></Route>
                </Home>
            </Router>
        );
    }
}