import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { throws } from 'assert';


const INGREDIENT_PRICES = {
    salad : 0.2,
    cheese: 0.3,
    meat: 1.0,
    bacon: 0.3
}
//the main stateful class component (container)
// keep state and handlers in containers.

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5 //base price
    }

    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        //update state immutably by making a copy with the spread operator
        // since we're dealing with an entire object
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = newCount;

        //now update the price based on the constant above

        const oldPrice = this.state.totalPrice;
        const priceAdd = INGREDIENT_PRICES[type]; //reference a key, not a property :/

        const newPrice = oldPrice + priceAdd;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice : newPrice
        });


    }

    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        // to prevent sending a -1 array key to the burger component
        // do nothing to update the amount of ingredients if a user
        //tries to remove an ingredient whose count is 0
        if (oldCount <= 0) {
            return;
        }
        const newCount = oldCount - 1;
        //update state immutably by making a copy with the spread operator
        // since we're dealing with an entire object
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = newCount;

        //now update the price based on the constant above

        const oldPrice = this.state.totalPrice;

        // to prevent sending a deduction when there are no ingredients
        let priceToRemove = 0;
        if (oldCount !==0) {
            priceToRemove = INGREDIENT_PRICES[type]; //reference a key, not a property :/
        }
        
        const  newPrice = oldPrice - priceToRemove;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice : newPrice
        });

    }

render(){ //required lifecycle method

    //let's add a check here to disable a button if there 
    //are no ingredients to take away

    const disabledButtonInfo = {
        ...this.state.ingredients
    }

    for (let key in disabledButtonInfo ){
        disabledButtonInfo[key] =  disabledButtonInfo[key] <= 0
    }


    return(
        <Aux>
            <Burger 
                ingredients={this.state.ingredients}
            />
            <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledButtonInfo}
                price={this.state.totalPrice}
            />
            <div>Purchase Button</div>
        </Aux>
    )
    }
}

export default BurgerBuilder;