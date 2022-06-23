import { 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_RESET 
} from "../constants/UserConstants";
import axios from 'axios';
import { toast } from 'react-toastify';

// LOGIN
export const login = (email, password) => async (dispatch) => {
    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000
    }
    try {
        dispatch({type: USER_LOGIN_REQUEST});

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const {data} = await axios.post(
            `/api/users/login`, 
            {email, password}, 
            config
        );

        if(!data.isAdmin === true) {
            toast.error("You are not Admin", ToastObjects);
            dispatch({
                type: USER_LOGIN_FAIL
            })
        } else {
            dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        }

        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if(message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({ 
            type: USER_LOGIN_FAIL,
            payload: message,

        });
    }
};

// LOGOUT
export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({type: USER_LOGOUT});
    dispatch({type: USER_LIST_RESET});
};

// GET ALL USER
export const listUser = () => async (dispatch, getState) => {
    try {
        dispatch({type: USER_LIST_REQUEST});

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.get(
            `/api/users`,
            config
        );

        dispatch({type: USER_LIST_SUCCESS, payload: data});
        
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if(message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({ 
            type: USER_LIST_FAIL,
            payload: message,

        });
    }
};



