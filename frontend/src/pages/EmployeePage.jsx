import React, { useContext, useEffect, useReducer, useState } from 'react'
import EmployeeList from '../components/employee/EmployeeList'
import EmployeeTable from '../components/employee/EmployeeTable'
import EmployeeRegist from '../components/employee/EmployeeRegist'
import EmployeeUpdate from '../components/employee/EmployeeUpdate'
import styled from 'styled-components'
// import { useDispatch, useSelector } from 'react-redux'
// import { EmployeeContext } from '../no0_context/EmployeeContext'
// import { setEmp, setMode } from '../no3_store/slices/employSlice'
// import { employeeDeleteSlice } from '../no3_store/slices/employSlice'
import { useAllGetEmployee, useDeleteEmployee } from '../store/hooks/useEmployee'


const EmployeePage = () => {
  // const {state, dispatch} = useContext(EmployeeContext);
  // const {selectedId, empTable, mode} = state ;
  // const { empTable, selectedId, emp, mode } = useSelector(state => state.emp);
  // const dispatch = useDispatch();


  // useEffect(() => {
  //   const newEmp = empTable.filter(item => item.id ===selectedId)[0] ;

  //   selectedId &&
  //   dispatch(setEmp(newEmp)) // payload선언 x, thunk(middleware)가 만들어서 payload 자동 생성
  // }, [selectedId, empTable])

  const [selectedId, setSelectedId] = useState(null);
  const deleteMutation = useDeleteEmployee();
  const [mode, setMode] = useState("addEmp")

  const handleDelete = async () => {

    if (!selectedId) {
      alert("삭제할 데이터 선택 >>>>>>>") ;
      return ;
    }
    try {
        await deleteMutation.mutate(selectedId)
        alert("삭제 >>>>>>>>>")
        setSelectedId(null)
    } catch (error) {
        alert("직원 삭제 실패")
    }
    // dispatch(employeeDeleteSlice(selectedId))
  }

  return (
    <div>
      <EmployeeList selectedId={selectedId} setSelectedId={setSelectedId}/>
      <EmployeeTable selectedId={selectedId}/>
      <div>
        <button onClick={() => setMode("addEmp")}>등록</button>
        <button onClick={() => setMode("update")}>수정</button>
        <button onClick={() => setMode("remove")}>삭제</button>
      </div>
      {
        mode === "addEmp" ? <EmployeeRegist/>
        : mode === "update" ? <EmployeeUpdate onClick={ () => {
            if(!selectedId) {
                alert("수정할 고용인 선택")
                return;
            }
        }
        } selectedId={selectedId}/>
        : <Button onClick={handleDelete}>데이터 삭제 ?</Button>
      } 
      
      
    </div>
  )
}

export default EmployeePage

const Container = styled.form`
    width : 100% ;
    height : 100vh ;

    display : flex ;
    flex-direction : column ;
    justify-content : center ;
    align-items : center ;

    background : #f1f5f9 ;

`
const Title = styled.h2`
    text-align : center ;
    margin-bottom : 32px ;
    color : #1e293b ; 
    font-size : 28px ; 

`
const Box = styled.div`
    width : 400px ;
    background : #f9fbfe ;
    padding : 40px ;
    border-radius : 16px ;
    box-shadow : 0 4px 20px rgba(0,0,0,0.08) ;
    margin : 3px ;

    display : flex ;
    flex-direction : column ;
`
const Input = styled.input`
    width : 100% ;
    padding : 14px 16px ;
    margin-bottom : 16px ;
    border : 1px solid #dbe4ee ;
    font-size : 16px ;
    outline : none ;

    transition : 0.2s ;
    &:focus {
        border-color : #3b82f6 ;
        box-shadow : 0 0 0 3px rgba(59, 130, 246, 0.15) ;
    }
`
const Button = styled.button`
    width : 100% ;
    border : none ;
    padding : 14px ;
    border-radius : 10px ;
    font-size : 15px ;
    font-weight : 600 ;
    cursor : pointer ;
    transition : 0.2s ;
    margin : 3px ;

`

const LoginBtn = styled(Button)`
    background : #a1c3f5 ;
    color : #fefefe ;

    &:hover {
        background : #6fa7fa ;
    }
`

const RegisterBtn = styled(Button)`
    background : transparent ;
    color : #85b4fa ;

    &:hover {
        color : #599afc ;
    }
`
