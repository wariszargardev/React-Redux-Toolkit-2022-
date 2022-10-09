const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default;
const axios = require("axios")

const FETCH_USER_REQUEST= 'FETCH_USER_REQUEST'
const FETCH_USER_SUCCESS= 'FETCH_USER_SUCCESS'
const FETCH_USER_FAILURE= 'FETCH_USER_FAILURE'

const fetchUserRequest = () =>{
    return{
        type: FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = (data) =>{
    return{
        type: FETCH_USER_SUCCESS,
        payload: data
    }
}

const fetchUserFailure = (error) =>{
    return{
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

const initialState = {
    loading: false,
    data: [],
    error:''
}

const userReducer= (state= initialState, action)=>{
    switch (action.type){
        case FETCH_USER_REQUEST:
            return{
                ...state,
                loading: true,
                error: ''
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state, // in future we add new parameter to state
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                data: []
            }
        default:
            return state
    }
}

const fetchUser = () =>{
    return (dispatch)=>{
        dispatch(fetchUserRequest())

        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response ) =>{
                const  data = response.data;
                dispatch(fetchUserSuccess(data))
            })
            .catch((error)=>{
                dispatch(fetchUserFailure(error.message))
            })
    }
}

const store = createStore(userReducer,
    applyMiddleware(thunkMiddleware)
)

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(fetchUser())

