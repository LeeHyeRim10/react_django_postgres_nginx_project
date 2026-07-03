import React, { createContext, useReducer } from 'react'

export const TodoContext = createContext();

const initState = {
  todoList: [
    { id: 1, subject: "HTML 공부", checked: true },
    { id: 2, subject: "CSS 공부", checked: false },
    { id: 3, subject: "REACT 공부", checked: true },
    { id: 4, subject: "Python 공부", checked: false },
  ],
  todoObj: { id: "", subject: "", checked: false }
}


const reducer = (state, action) => {
  switch (action.type) {
    case "change":
      return {
        ...state,
        todoObj: {
          ...state.todoObj,
          [action.payload.name]: action.payload.value
        }
      }
    case "insert": {
      const newId =
        state.todoList.length > 0
          ? Math.max(...state.todoList.map(item => item.id)) + 1
          : 1;

      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            ...state.todoObj,
            id: newId,
            checked: false
          }
        ],
        todoObj: { id: "", subject: "", checked: false }
      };
    } case "update": {
      return {
        ...state,
        todoList: state.todoList.map(i =>
          i.id === action.payload.id ?
            { ...i, subject: action.payload.value, checked: false }
            : i
        )
      }
    } case "delete": {
      return {
        ...state,
        todoList: state.todoList.filter(i =>
          i.id !== action.payload
        )
      }
    } case "toggle": {
      return {
        ...state,
        todoList: state.todoList.map(i => (
          i.id === action.payload ?
            { ...i, checked: !i.checked }
            : i
        ))
      }
    }
    default:
      return state;
  }
}


const TodoProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider
