import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
    userLoginReducer, 
    userListReducer
} from './reducers/UserReducers';
import { 
    productListReducer,
    productDeleteReducer, 
    productCreateReducer,
    productEditReducer,
    productUpdateReducer
} from './reducers/ProductReducers';
import {
    orderListReducer,
    orderDetailsReducer,
    orderDeliveredReducer
} from './reducers/OrderReducers';


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,
    productList: productListReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productEdit: productEditReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,
    orderDelivered: orderDeliveredReducer,
});

// LOGIN
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: {userInfo: userInfoFromLocalStorage},
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;