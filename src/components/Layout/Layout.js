import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

//this component is merely a wrapper that returns props.children (see how it's used in APP)
// this is so we can have a universal layout for all child components
// it also includes all navigation and default layouts

//I changed it to a container so I can handle the 
//opening and closing of the sidedrawer component

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerToggle= () => {
        this.setState({
            showSideDrawer: !this.state.showSideDrawer
        })
    }

    render() {
        return(
            <Aux>
                <Toolbar toggleSideDrawer={this.sideDrawerToggle} />
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    clicked={this.sideDrawerClosedHandler} />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;