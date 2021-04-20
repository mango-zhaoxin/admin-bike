import React, { Component } from 'react';
import { Menu } from 'antd';
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import MenuConfig from '../../config/menuConfig'
import './index.less';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

export default class NavLeft extends Component {
    componentWillMount () {
        const menuTreeNode = this.renderMenu(MenuConfig);

        this.setState({
            menuTreeNode
        })
    }

    // 菜单渲染
    renderMenu = (data) => {
        console.log(data);
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <Link to={item.key}>{ item.title }</Link>
            </Menu.Item>
        })
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Imooc MS</h1>
                </div>

                <Menu theme="dark">
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}