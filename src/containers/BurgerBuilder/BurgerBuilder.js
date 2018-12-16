import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

//global prices to use for calculations
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
        totalPrice: 5, //base price
        purchaseable: false, //for enabling/disabling the order now button
        purchasing: false //for determining if we are in the modal or not
    }

    updatePurchaseableState = (updatedIngredients) => {
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        
        //take the key and return the value in a new array,
        //which we then reduce to get the s
        const sum = Object.keys(updatedIngredients)
            .map((ingredientKey)=>{
                return updatedIngredients[ingredientKey]
            })
            .reduce((sum, el) =>{
                return sum + el
            }, 0);

        this.setState({purchaseable: sum > 0});


    }

    purchasingHandler = () =>{
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        alert('You Continued!');
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

        this.updatePurchaseableState(updatedIngredients);

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

        this.updatePurchaseableState(updatedIngredients);

    }

render(){ //required lifecycle method

    //let's add a check here to disable the "LESS" button  of a given Build Control
    //if there are no ingredients to take away
    
    const disabledButtonInfo = {
        ...this.state.ingredients
    }

    for (let key in disabledButtonInfo ){
        disabledButtonInfo[key] =  disabledButtonInfo[key] <= 0
    }


    return(
        <Aux>
            <Modal 
                show={this.state.purchasing} 
                modalClosed={this.purchaseCancelHandler}>
                <OrderSummary  
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    cancel={this.purchaseCancelHandler}
                    continue={this.purchaseContinueHandler}
                 />
            </Modal>
            <Burger 
                ingredients={this.state.ingredients}
            />
            <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledButtonInfo}
                price={this.state.totalPrice}
                purchaseable={!this.state.purchaseable}
                ordered={this.purchasingHandler}
            />

        </Aux>
    )
    }
}

export default BurgerBuilder;