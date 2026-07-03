import React, { createContext, useReducer } from 'react'

export const EmployeeContext = createContext();

const initEmpSt = [
  {id : "1", name : "John", email : "testttt@tttt.com", job: "frontend", pay: 600},
  {id : "2", name : "qqqq", email : "qqqq@tttt.com", job: "backend", pay: 600},
  {id : "3", name : "wwww", email : "wwww@tttt.com", job: "db", pay: 600},
  {id : "4", name : "eeee", email : "eeee@tttt.com", job: "ai", pay: 600}
]

const initEmp = {
  id : '', name : '', email : '', job : '', pay : null
}

const initState = {
  empTable : initEmpSt,
  emp : initEmp,
  mode : '',
  selectedId : ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case "select":
      return {
        ...state,
        selectedId : action.payload
      }
    case "set_emp" : 
      return {
        ...state,
        emp : action.payload
      }
    case "register" :
      return {
        ...state,
        empTable : [
          ...state.empTable,
          {
            ...action.payload.emp,
            id : action.payload.newId
          }
        ]
      }
      case "update" :
        return {
          ...state,
          empTable : state.empTable.map(item => (
            item.id === action.payload.id ?
            action.payload : item
          ))
        }
      case "delete" :
        return {
          ...state,
          empTable : state.empTable.filter(item => (
            item.id !== state.selectedId
          ))
        }
      case "mode" :
        return {
          ...state,
          mode : action.payload
        }
      default: 
        return state ;
  }
}








const EmployeeProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initState);
  return (
    <EmployeeContext.Provider value={{state, dispatch}}>
      {children}
    </EmployeeContext.Provider>
  )
}

export default EmployeeProvider
