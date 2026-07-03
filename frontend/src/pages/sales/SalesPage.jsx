import React from 'react'
import SalesTable from '../../components/sales/SalesTable'
import { useCurrentUser } from '../../store/hooks/useUser';
import AuthControl from '../../components/layout/AuthControl';

const SalesPage = () => {

    const {data:user} = useCurrentUser();
    
    if (!user) {
        return (
            <AuthControl message="로그인 후 판매 정보 접근 가능" />
        )
    }
    return (
        <div>
            <SalesTable />
        </div>
    )
}

export default SalesPage
