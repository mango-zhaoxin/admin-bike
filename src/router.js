import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Buttons from './pages/ui/buttons';
import Loadings from './pages/ui/loadings';
import Modals from './pages/ui/modals';
import Notice from './pages/ui/notice';
import Messages from './pages/ui/message';
import Tab from './pages/ui/tabs';
import Gallerys from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import LoginForm from './pages/form/login';
import FormRegister from './pages/form/register';
import ChinaProviceCity from './pages/form/chinaprovincecity';
import tableForm from './pages/table/basicTable';
import hightTable from './pages/table/heightTable';
import City from './pages/city';
import Order from './pages/order';
import NoMatch from './pages/noMatch';
import Common from './common';
import OrderDetail from './pages/order/detail'
export default class IRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login} />
                    <Route path="/admin"
                        render={() =>
                            <Admin>
                                <Switch>
                                    <Route path="/admin/ui/buttons" component={Buttons} />
                                    <Route path="/admin/ui/modals" component={Modals} />
                                    <Route path="/admin/ui/loadings" component={Loadings} />
                                    <Route path="/admin/ui/notification" component={Notice} />
                                    <Route path="/admin/ui/messages" component={Messages} />
                                    <Route path="/admin/ui/tabs" component={Tab} />
                                    <Route path="/admin/ui/gallery" component={Gallerys} />
                                    <Route path="/admin/ui/carousel" component={Carousels} />
                                    <Route path="/admin/form/login" component={LoginForm} />
                                    <Route path="/admin/form/reg" component={FormRegister} />
                                    <Route path="/admin/form/provinceCityCounty" component={ChinaProviceCity} />
                                    <Route path="/admin/table/basic" component={tableForm} />
                                    <Route path="/admin/table/high" component={hightTable} />
                                    <Route path="/admin/city" component={City} />
                                    <Route path="/admin/order" component={Order} />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        }>
                    </Route>
                    <Route path="/common"
                        render={() =>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                            </Common>
                        }
                    />
                </App>
            </HashRouter>
        );
    }
}