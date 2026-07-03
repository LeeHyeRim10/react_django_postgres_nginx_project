import React, { useContext, useEffect } from 'react'
import TodoListChild from './TodoListChild'
import { useAllGetTodo } from '../../store/hooks/useTodo';
// import { useDispatch, useSelector } from 'react-redux'
// import { todoAllGetSlice } from '../../no3_store/slices/todoSlice';
// import { TodoContext } from '../../no0_context/TodoContext'


const TodoList = () => {

  // const {state} = useContext(TodoContext);
  // const {todoList} = state;
  // const {todoList} = useSelector(state => state.todo);
  // const dispatch = useDispatch();

  const {data: todoList=[], isLoading, error} = useAllGetTodo();
  if(isLoading) return <h3>Loading ......</h3>
  if (error) return <h3>{error.message}</h3>

  // useEffect(() => {
  //   dispatch(todoAllGetSlice());
  // }, [dispatch, todoList])

  return (
    <div>
      {todoList?.map(item => (
        <TodoListChild key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default TodoList
