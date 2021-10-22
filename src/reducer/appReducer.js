import initialState from './initialState';
import * as actions from './actionTypes';

const reducer = (state = initialState, action) => {
    console.log(action.payload);
    switch (action.type) {
        case actions.SET_EDIT_DETAILS: {

            return {
                ...state,
                employeeEditDetails: action.payload
            }
        }

        case actions.SET_AUTH: {
            return {
                ...state,
                isAuthenticated: action.payload
            }
        }

        case actions.SET_USERS_LIST: {
            return {
                ...state,
                userList: action.payload
            }
        }


        case actions.SET_ENTRY_USERS: {
            return {
                ...state,
                entryUser: action.payload
            }
        }


        case actions.SET_ENTRY_DATE: {
            return {
                ...state,
                date: action.payload
            }
        }
        case actions.SET_FLAG: {
            return {
                ...state,
                flag: action.payload
            }
        }

        case actions.SET_REMARK:{
            return {
                ...state,
                remark:action.payload
            }
        }

        default: {
            return state;
        }
    }
}

export default reducer;