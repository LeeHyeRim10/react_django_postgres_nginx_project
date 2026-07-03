import React, { createContext, useReducer } from 'react'

export const UserContext = createContext();

const initUser = [
  {id : 1, username: "ttt", password : "1111"},
  {id : 1, username: "qqq", password : "1111"},
  {id : 1, username: "www", password : "1111"},
  {id : 1, username: "eee", password : "1111"},
]

const initState = {
  users : initUser ,
  username : "",
  isLogin : false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "login":
            return {
                ...state,
                isLogin : true,
                username : action.payload
            }
        case "logout" : {
            return {
                ...state,
                isLogin : false, 
                username : ""
            }
        }
        case "register":
            return {
                ...state,
                users : [
                    ...state.users,
                    {
                        id : action.payload.id,
                        username : action.payload.user.username,
                        password : action.payload.user.password
                    }
                ]
            }
        default:
            return state;
    }
}

const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState);
  return (
    <UserContext.Provider value = {{state, dispatch}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
