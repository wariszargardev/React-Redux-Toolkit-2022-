const redux = require('redux')
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;

// 1. Define Action
const CAKE_ORDER= 'CAKE_ORDER';
const RE_STOCK_CAKE= 'RE_STOCK_CAKE';

function orderCake(){
    return{
        type: CAKE_ORDER,
        payload: 1
    }
}

function reStockCake(quantity = 1){
    return{
        type: RE_STOCK_CAKE,
        payload: quantity
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
                noOfCakes: state.noOfCakes - action.payload
            }
        case RE_STOCK_CAKE:
            return {
                ...state,
                noOfCakes: state.noOfCakes + action.payload
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
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(reStockCake(13))

const action = bindActionCreators({orderCake, reStockCake} , store.dispatch)
action.orderCake()
action.orderCake()
action.orderCake()
action.reStockCake(13)

unsubscribe();