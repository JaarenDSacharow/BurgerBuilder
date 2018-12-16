import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
    return(
        <header className="Toolbar">
            <div className="DrawerToggle" onClick={props.toggleSideDrawer}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <Logo height="80%" marginBottom="0px"/>
            <nav className="DesktopOnly">
                <NavigationItems />
            </nav>
        </header>
    );
}

export default Toolbar;