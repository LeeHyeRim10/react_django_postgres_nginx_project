import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRegisterUser } from '../../store/hooks/useUser';
import { Modal, Input, Typography, Divider } from 'antd';

const {Title, Text} = Typography;

const initialState = {
    username : "", password : "", confirmPW : "", age: "", email: "", city: ""
}

const RegisterForm = ({open, setOpen}) => {

    const [user, setUser] = useState(initialState);
    const navigate = useNavigate();
    const registerMutation = useRegisterUser();

    const handleChange = (event) => {
    const {name, value} = event.target;
        setUser(prev => (
            {...prev, [name]: value}
        ))
    }

    const handleRegister = async () => {
        const {username, password, confirmPW, email} = user

        
        if(!username.trim()) {
            alert("아이디 입력")
            return;
        }
        
        if(!password.trim()) {
            alert("비밀번호 입력")
            return;
        }

        if (password !== confirmPW) {
            alert("비밀번호 일치하지 않음 >>>>>>>>>")
            return;
        }
        
        if(!email.trim()) {
            alert("이메일 입력")
            return;
        }
        

        try {
            await registerMutation.mutateAsync(user)
            alert("가입 성고오오오오오오오옹")
            setOpen(false)
            setUser(initialState)
            navigate("/")
        } catch (error) {
            alert(error?.message || "실패ㅐㅐㅐㅐㅐㅐㅐㅐ")
        }

    }


    return (
        <>
        <Modal open={open} onOk={handleRegister} onCancel={()=>setOpen(false)} okText="회원가입" cancelText="취소" confirmLoading={registerMutation.isPending} width={500} centered>
        <Wrapper>
            <Title style={{textAlign: "center"}}>회원가입</Title>
            <Wrapper>
                <P>아이디 : </P> 
                <Input type='text' name='username' value={user.username} onChange={handleChange} placeholder='아이디 입력'/>
            </Wrapper>
            <Wrapper>
                <P>비밀번호 : </P> 
                <Input type='password' name='password' value={user.password} onChange={handleChange} placeholder='PW 입력'/>
            </Wrapper>
            <Wrapper>
                <P>비밀번호 확인 : </P> 
                <Input type='password' name='confirmPW' value={user.confirmPW} onChange={handleChange} placeholder='PW 재입력'/>
            </Wrapper>
            <Wrapper>
                <P>나이 : </P> 
                <Input type='number' name='age' value={user.age} onChange={handleChange} placeholder='나이 입력'/>
            </Wrapper>
            <Wrapper>
                <P>이메일 : </P> 
                <Input type='email' name='email' value={user.email} onChange={handleChange} placeholder='이메일 입력'/>
            </Wrapper>
            <Wrapper>
                <P>지역 : </P> 
                <Input type='text' name='city' value={user.city} onChange={handleChange} placeholder='지역 입력'/>
            </Wrapper>
        </Wrapper>
        </Modal>
        </>
    )
}

export default RegisterForm

const Wrapper = styled.div`
    padding : 10px 0;
`
const P = styled.p`
    margin-bottom : 7px ;
    color : #1e293b ; 
    font-size : 13px ; 
    font-weight : 500 ;
`
