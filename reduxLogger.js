const redux = require('redux')
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.createStore;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();


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
                noOfCakes: state.noOfCakes - action.quantity
            }
        default:
            return state;
    }
}

const store = createStore(cakeReducer, applyMiddleware(logger));

store.dispatch(orderCake())
