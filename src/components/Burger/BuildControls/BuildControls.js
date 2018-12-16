import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
//component used to contain a list of build controls returned from the build control component

const BuildControls= (props) => {

    const controlsList = [
        {label: "Salad", type: "salad"},
        {label: "Meat", type: "meat"},
        {label: "Cheese", type: "cheese"},
        {label: "Bacon", type: "bacon"},
    ];

    return(
        <div className="BuildControls">
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controlsList.map((control, index) => {
                return (
                <BuildControl
                 key={index}
                 label={control.label} 
                 type={control.type}
                 added={() => props.ingredientAdded(control.type)}
                 removed={()=>props.ingredientRemoved(control.type)}
                 // access the KEY value of props.disabled or it will always be false
                 //and the button will always be disabled since you'll never match it
                 disabled={props.disabled[control.type]} 
                 />
                )
            })}
        <button
        onClick={props.ordered}
        disabled={props.purchaseable}
        className="OrderButton">Order Now</button>
        </div>
    );
}

export default BuildControls;