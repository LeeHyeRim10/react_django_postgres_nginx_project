import React, { useContext, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { todoPostSlice, change } from '../../no3_store/slices/todoSlice';
// import { TodoContext } from '../../no0_context/TodoContext';
import { usePostRegisterTodo } from '../../store/hooks/useTodo';

const initialState = {"subject": "", "checked": false }

const TodoInsert = () => {

    // const {state, dispatch} = useContext(TodoContext);
    // const {todoObj} = state ;
    // const {todoObj} = useSelector(state => state.todo);
    // const dispatch = useDispatch();

    const [todo, setTodo] = useState(initialState);
    const registerMutation = usePostRegisterTodo();

    const handleChange = (e) => {
        const {name, value} = e.target;
        // dispatch({type: "change", payload:{name,value}})
        // dispatch(change({name, value}));
        setTodo(prev => ({
          ...prev, [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch({type: "insert"})
        // dispatch(todoPostSlice(todoObj))
        try {
          registerMutation.mutateAsync(todo)
          alert("todo register success") 
        } catch (error) {
          alert("todo 등록 실패 >>>>>>>>>>>") 
        }
    }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="subject" value={todo.subject} onChange={handleChange} required placeholder='할 일 입력'/>
      <button>입력</button>
    </form>
  )
}

export default TodoInsert
