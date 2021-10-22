import * as actions from './actionTypes';

const setEditDetils = (payload) => {
    return {
        type: actions.SET_EDIT_DETAILS,
        payload
    }
}






const setAuth =(payload)=> {
    return{
        type : actions.SET_AUTH,
        payload
    }
}


const  setUsersList =(payload)=>{
    return {
        type :actions.SET_USERS_LIST,
        payload
    }
}


const  setEntryUsers =(payload)=>{
    return {
        type :actions.SET_ENTRY_USERS,
        payload
    }
}

const  setEntryDate =(payload)=>{
    return {
        type :actions.SET_ENTRY_DATE,
        payload
    }
}

const setFlag =(payload) =>{
    return {
        type :actions.SET_FLAG,
        payload
    }
}

const setRemark =(payload) =>{
    return {
        type :actions.SET_REMARK,
        payload
    }
}

export {
    setEditDetils,
    setAuth,
    setUsersList,
    setEntryUsers,
    setEntryDate,
    setFlag,
    setRemark
}