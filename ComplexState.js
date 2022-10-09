const redux = require('redux')
const createStore = redux.createStore;
const produce = require('immer').produce
// 1. Define Action
const UPDATE_CITY_NAME = 'UPDATE_CITY_NAME';

function updateCity(city){
    return{
        type: UPDATE_CITY_NAME,
        payload: city
    }
}

// 2. Define reducer
const initialState = {
    name: "Muhammad Waris",
    age: 25,
    email: "waris@gmail.com",
    address:{
        street: "Kohlowala",
        city: "Lahore",
        province: "Pakistan",
        zipCode: 12345
    }
}

const updateCityNameReducer = (state= initialState, action) =>{
    switch (action.type) {
        case UPDATE_CITY_NAME:
            // return{
                // ...state,
                // address: {
                //     ...state.address,
                //     city: action.payload
                // }
            // }

            return produce(state, (draft)=>{
                draft.address.city= action.payload
            })
        default:
            return state;
    }
}

const store = createStore(updateCityNameReducer);
// store.getState() return current store state
console.log("Initial state", store.getState())

// subscribe is called when ever change in state it will called
const unsubscribe = store.subscribe(()=> console.log("Current state", store.getState()))
// dispatch action to buy cake
store.dispatch(updateCity("Sargodha"))
unsubscribe();