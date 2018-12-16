import React from 'react';
import './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) => {
    return(
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div style={{
                //inline styles to display based on the show prop
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
            className="Modal"
            >
                {props.children}
            </div>
        </Aux>
    )

}

export default Modal;