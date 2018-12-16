import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import Aux from '../../hoc/Aux';

const Burger = (props) => {

    //transformed ingredients take the key value pairs
    //from the props and returns an array based on the value
    // of the ingredients and the number (key : value)
    //Object.keys returns an array based on the object keys

    let transFormedIngredients = Object.keys(props.ingredients)
        .map((ingredientKey) => {
            console.log(ingredientKey);
            //props.ingredients[ingredientsKey] returns the value from that key
            console.log(props.ingredients[ingredientKey]);
            //now we use the Array method to create a new array of a length that matches the key above
            //spread operator creates a new array based on the current key
            return[...Array(props.ingredients[ingredientKey])] 
                //and finally we map that array with a blank arg and index
                .map((_, index) => {
                    return <BurgerIngredient key={ingredientKey + index} type={ingredientKey}/>
                })
        })
        //after all of this, call reduce on the array to flatten it so we can see
        //if there are any ingredients for the purposes of displaying a message
        // reduce returns a value based on the elements of the array
        // in this case we take each subarray and concat it to the main array
        .reduce((arr,el) =>{
            return arr.concat(el);
        }, []);

    console.log(transFormedIngredients.length);

    if(transFormedIngredients.length === 0) {
        transFormedIngredients  = <p>Please begin adding ingredients.</p>;
    }

    return(
        <Aux>
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
                {transFormedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
        </Aux>
    );
}

export default Burger;