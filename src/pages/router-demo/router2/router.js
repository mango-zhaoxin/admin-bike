import React from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import Main from './Main';
import Abount from '../router1/Abount';
import Topic from '../router1/Topic'
import Home from './Home';

export default class IRouter extends React.Component {
    render() {
        return (
            <Router>
                <Home>
                    <Route path="/main" render={() =>
                        <Main>
                             <Route path="/main/a" component={Abount}></Route>
                        </Main>
                    }></Route>
                    <Route path="/abount">
                        <Abount />
                    </Route>
                    <Route path="/topic">
                        <Topic />
                    </Route>
                </Home>
            </Router>
        );
    }
}