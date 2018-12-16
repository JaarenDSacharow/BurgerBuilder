import React, {Component} from 'react';
import './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    //without shouldComponentUpdate, you'll trigger a rerender
    //EVERYTIME state changes in the build control component.
    // this lifecycle method improves performance by only rerendering
    //if the right props change, in this case, we only want the modal
    //to trigger a renender if it is visible.

    //NOTE: because this component has children, you have to check for that too
    // if you want to display the spinner in the ORDERSUMMARY child component.
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentDidUpdate() {
        console.log('[Modal] will update');
    }

    render(){
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div style={{
                    //inline styles to display based on the show prop
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}
                className="Modal"
                >
                    {this.props.children}
                </div>
            </Aux>
        )
    
    }

}

export default Modal;