import React from 'react'

const TodoTemplate = ({children}) => {
  return (
    <div>
        <div>일정관리</div>
        <div>
        {children}
        </div>
    </div>
  )
}

export default TodoTemplate
