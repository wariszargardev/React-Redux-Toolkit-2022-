const redux = require('redux')
const createStore = redux.createStore;

// 1. Define Action
const CAKE_ORDER = 'CAKE_ORDER';

function orderCake(){
    return{
        type: CAKE_ORDER,
        quantity: 1
    }
}

// 2. Define reducer
const initialState = {
    noOfCakes: 10
}

const cakeReducer = (state= initialState, action) =>{
    switch (action.type) {
        case CAKE_ORDER:
            return{
                ...state,
                noOfCakes: state.noOfCakes - 1
            }
        default:
            return state;
    }
}

const store = createStore(cakeReducer);
// store.getState() return current store state
console.log("Initial state", store.getState())

// subscribe is called when ever change in state it will called
const unsubscribe = store.subscribe(()=> console.log("Current state", store.getState()))
// dispatch action to buy cake
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
unsubscribe();