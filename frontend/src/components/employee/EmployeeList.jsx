import React, { useEffect } from 'react'
import { useAllGetEmployee, useDeleteEmployee } from '../../store/hooks/useEmployee';

const EmployeeList = ({selectId, setSelectedId}) => {

    const {data : empTable=[], isLoading, error} = useAllGetEmployee();
    if (isLoading) return <h3>Loding....</h3>
    if (error) return <h3>{error.message}</h3>

    return (
        <div>
            {empTable?.map((item, index) => (
                <button
                    key={item.id ?? index}
                    onClick={() => setSelectedId(item.id)}
                >
                    {item.name}
                </button>
            ))}
        </div>
    )
}

export default EmployeeList