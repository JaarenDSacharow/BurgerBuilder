import React from 'react';
import Aux from '../../hoc/Aux';
import './Layout.css';

//this component is merely a wrapper that returns props.children (see how it's used in APP)
// this is so we can have a universal layout for all child components
// it also includes all navigation and default layouts

const layout = (props) => {
    return(
    <Aux>
        <div >Toolbar, Sidedrawer, Backdrop</div>
        <main className="Content">
            {props.children}
        </main>
    </Aux>
    )
}

export default layout;