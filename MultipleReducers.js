const redux= require('redux')
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducer = redux.combineReducers

const BUY_CAKE= "BUY_CAKE";
const RE_STOCK_CAKE= "RE_STOCK_CAKE"

const BUY_ICE_CREAM= "BUY_ICE_CREAM"
const RE_STOCK_ICE_CREAM= "RE_STOCK_ICE_CREAM"

function buyCake(){
    return{
        type: BUY_CAKE,
        payload: 1
    }
}

function reStockCake(quantity = 1){
    return{
        type: RE_STOCK_CAKE,
        payload: quantity
    }
}

function buyIceCream(){
    return{
        type: BUY_ICE_CREAM,
        payload: 1
    }
}

function reStockIceCream(quantity= 1){
    return{
        type: RE_STOCK_ICE_CREAM,
        payload: quantity
    }
}

const initialStateCake = {
    noOfCakes: 10
}

const initialIceCream = {
    noOfIceCream: 20
}

function cakeReducer(state=initialStateCake, action){
    switch (action.type){
        case BUY_CAKE:
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
            return state
    }
}

function iceCreamReducer(state= initialIceCream, action){
    switch (action.type){
        case BUY_ICE_CREAM:
            return{
                ...state,
                noOfIceCream: state.noOfIceCream - action.payload
            }

        case RE_STOCK_ICE_CREAM:
            return {
                ...state,
                noOfIceCream: state.noOfIceCream + action.payload
            }

        default:
            return state

    }
}

const rootReducer = combineReducer({
    cake: cakeReducer, // cake: cakeReducer
    iceCream: iceCreamReducer // combine: combineReducer
})

const store = createStore(rootReducer)
console.log("Current state", store.getState())

const unSubcribe = store.subscribe(()=> console.log("Updated state", store.getState()))

const action = bindActionCreators({
    buyCake,
    reStockCake,
    buyIceCream,
    reStockIceCream
}, store.dispatch)

action.buyCake()
action.buyCake()
action.buyCake()

action.buyIceCream()
action.buyIceCream()
action.buyIceCream()

action.reStockCake(13)
action.reStockIceCream(13)
unSubcribe();