import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux'
import './SideDrawer.css';

const SideDrawer = (props) => {

    let attachedClasses = ["SideDrawer", "Close"];

    if(props.open){
        attachedClasses = ["SideDrawer", "Open"];
    }

    return (
        <Aux>
        <Backdrop show={props.open} clicked={props.clicked }/>
        <div className={attachedClasses.join(' ')}>
            <Logo height="11%" marginBottom="32px"/>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    );
}


export default SideDrawer;