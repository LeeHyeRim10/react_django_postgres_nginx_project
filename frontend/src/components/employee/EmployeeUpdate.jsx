import React, { useContext, useEffect, useState } from 'react'
import { useGetEmployee, usePutUpdateEmployee } from '../../store/hooks/useEmployee';
// import { useDispatch, useSelector } from 'react-redux';
// import { employeePutSlice } from '../../no3_store/slices/employSlice';
// import { EmployeeContext } from '../../no0_context/EmployeeContext'



const EmployeeUpdate = ({selectedId}) => {

    // const {state, dispatch} = useContext(EmployeeContext);
    // const {emp} = state ;
    // const {emp} = useSelector(state => state.emp);
    // const dispatch = useDispatch();
    const {data: emp, isLoading, error} = useGetEmployee(selectedId);
    const [newEmp, setNewEmp] = useState(emp);
    const updateMutation = usePutUpdateEmployee();

    useEffect(() => {
        emp &&
        setNewEmp(emp)
    }, [emp])

    const handleChange = (event) => {
        const {name, value} = event.target ;
        setNewEmp((prev) => (
            {...prev, [name] : value}
        ))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // dispatch({type:'update', payload: newEmp})
        // dispatch(employeePutSlice(newEmp))

        try {
            await updateMutation.mutate(newEmp);
            alert("완료")
        } catch (error) {
            alert("직원 수정 실패 >>>>>>>>>>>>")
        }
    }

    if (isLoading) return <h3>Loding....</h3>

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <label>이름 : </label>
                <input type='text' name='name' value={newEmp.name} onChange={handleChange} placeholder='이름 입력' required/>
            </div>
            <div>
                <label>이메일 : </label>
                <input type='email' name='email' value={newEmp.email} onChange={handleChange} placeholder='이메일 입력' required/>
            </div>
            <div>
                <label>직업 : </label>
                <input type='text' name='job' value={newEmp.job} onChange={handleChange} placeholder='직업 입력' required/>
            </div>
            <div>
                <label>급여 : </label>
                <input type='number' name='pay' value={newEmp.pay} onChange={handleChange} placeholder='급여 입력' required/>
            </div>
            <button>정보 수정</button>
        </form>
        
        </>
      )
}

export default EmployeeUpdate
