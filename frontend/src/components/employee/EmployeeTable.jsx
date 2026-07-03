// import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useGetEmployee } from '../../store/hooks/useEmployee';
// import { EmployeeContext } from '../../no0_context/EmployeeContext';


const EmployeeTable = ({selectedId}) => {
    // const {state} = useContext(EmployeeContext);
    // const {emp} = state;
    // const {emp} = useSelector(state => state.emp) ;
    const {data: emp, isLoading, error} = useGetEmployee(selectedId);
    if (isLoading) return <h3>Loading.....</h3>
    if (error) return <h3>{error.message}</h3>


    return (
    <>
    <div>
        <table>
            
            <tr>
                {emp && Object.keys(emp).map(key => (
                    <th key={key}>{key}</th>
                ))}
            </tr>
            <tr>
                {emp && Object.values(emp).map(value => (
                    <td key={value}>{value}</td>
                ))}
            </tr>
        </table>
    </div>
    </>
    )
}

export default EmployeeTable

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

