import React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Main';
import Abount from '../router1/Abount';
import Topic from '../router1/Topic'
import Home from './Home';
import Info from './Info';
import NoMatch from './NoMatch';

export default class IRouter extends React.Component {
    render() {
        return (
            <Router>
                <Home>
                    <Switch>
                        <Route path="/main" render={() =>
                            <Main>
                                <Route path="/main/:value">
                                    <Info />
                                </Route>
                            </Main>
                        }></Route>
                        <Route path="/abount">
                            <Abount />
                        </Route>
                        <Route path="/topic">
                            <Topic />
                        </Route>
                        <Route>
                            <NoMatch />
                        </Route>
                    </Switch>
                </Home>
            </Router>
        );
    }
}