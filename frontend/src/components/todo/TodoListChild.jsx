import React, { useContext, useState } from 'react'
import {
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdRemoveCircleOutline
} from "react-icons/md"
// import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useDeleteTodo, usePutUpdateTodo } from '../../store/hooks/useTodo'
// import { todoDeleteSlice, todoPutSlice, todoTogglePutSlice, toggle } from '../../no3_store/slices/todoSlice'
// import { todoDeleteApi, todoTogglePutApi } from '../../no3_store/apis/todo.api'
// import { TodoContext } from '../../no0_context/TodoContext'

const TodoListChild = ({item}) => {

    // const {state, dispatch} = useContext(TodoContext);
    // const dispatch = useDispatch();
    const [editing, setEditing] = useState(false)
    const [todo, setTodo] = useState(item)
    const updateMutation = usePutUpdateTodo();
    const deleteMutation = useDeleteTodo();
    

    
    const handleToggle = () => {
        // dispatch({type:"toggle", payload: item.id})
        // dispatch(toggle(item.id)) html 단에 바로 호출
        try {
            setTodo(prev => ({...prev, checked: !todo.checked}))
            updateMutation.mutateAsync({...todo, checked: !todo.checked})
            //setEditing(false)
            alert("토글이 됩니다요")
        } catch (error) {
            alert("ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ")
        }
    }

    const handleUpdate = () => {
        // dispatch({type:"update", payload: {id:item.id, value}})
        // dispatch(todoPutSlice({...item, subject: value}));
        if (todo.subject.trim()!== "") {
            try {
                updateMutation.mutateAsync(todo)
                setEditing(false)    
                alert("수정이 됩니다요")
            } catch (error) {
                alert("수정ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ")
            }
            
        }
    }

    const handleDelete = () => {
        // dispatch({type:"delete", payload: item.id})
        // dispatch(remove(item.id)) // html단에 바로 호출
    }


  return (
    <div>
        <div onClick={handleToggle}>
            {
                todo.checked ? 
                <MdCheckBox/> : <MdCheckBoxOutlineBlank/>    
            }
        </div>
        <div>
            {
                editing ?
                <input 
                type="text" 
                name="subject"
                value={todo.subject} 
                onChange={(e) => setTodo(prev => ({...prev, [e.target.name] : e.target.value}))} 
                onBlur={handleUpdate} 
                onKeyDown={(e) => {if (e.key==="Enter") handleUpdate() ;        
                }} autoFocus
            />
            :
            <Checked $checked = {todo && todo.checked} onDoubleClick={() => setEditing(true)}>
                {item && item.subject}
            </Checked>
            }        
        </div>
        <div onClick={() => deleteMutation.mutateAsync(item.id)}>
            <MdRemoveCircleOutline/>
        </div>
    </div>
  )
}

export default TodoListChild

const Checked = styled.div`
    text-decoration: ${({$checked}) =>
        ($checked ? "line-through" : "none")
    } 
`
