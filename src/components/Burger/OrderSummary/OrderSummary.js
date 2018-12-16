import React from 'react';
import './OrderSummary.css';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

    //create an array with the object's keys, again
    const ingredientSummary = Object.keys(props.ingredients)
        .map((ingredientKey, index) => {
            return(
                //now use that key and the corresponding value for it for display
                <li key={ingredientKey}><span style={{textTransform:'capitalize'}}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}</li>
            )
        });
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Delicious burger with the follwing ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: ${props.price.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.cancel} btnType={"Danger"}>Cancel</Button>
            <Button clicked={props.continue} btnType={"Success"}>Continue</Button>
        </Aux>
    )
}

export default OrderSummary;