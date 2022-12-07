import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';

export default class Layout extends React.Component {

    constructor (props) {
        super(props);
    }

    render = () => {
        return (
            <div style={{ display: 'flex', height: '100%' }}>
                <Sidebar>
                    <Menu>
                        <img src={require('../../images/foliotracker-logo.png')} className="sidebar-logo"/>
                        <MenuItem routerLink={  <Link to="/"/>            }>Home</MenuItem>
                        <MenuItem routerLink={  <Link to="/portfolios"/>  }>Portfolios</MenuItem>
                        <MenuItem routerLink={  <Link to="/tracking"/>    }>Tracking</MenuItem>
                    </Menu>
                </Sidebar>
                <Outlet />
            </div>
        );
    }

}