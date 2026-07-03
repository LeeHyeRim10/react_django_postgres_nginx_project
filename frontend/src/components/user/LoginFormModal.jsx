import React, { useState } from 'react'
import { Modal, Input, Typography, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useLoginUser } from '../../store/hooks/useUser'

const { Title, Text } = Typography;


const initialState = { username: "", password: "" }

const LoginForm = ({ open, setOpen }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(initialState);
    const loginMutation = useLoginUser();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prev => (
            { ...prev, [name]: value }
        ))
    }
    const handleLogin = async () => {

        if (user.username.trim() === "") {
            alert("이럼 넣어라")
            return
        }
        if (user.password.trim() === "") {
            alert("비밀번호 넣어라")
            return
        }


        try {
            await loginMutation.mutateAsync(user);
            alert(user.username + "님 로그인 성공")
            setOpen(false)
            setUser(initialState)
            navigate("/")
        } catch (error) {
            alert(error?.message || "로그인 실패")
        }

    }

    return (
        <>
        <Modal open={open} onOk={handleLogin} onCancel={() => setOpen(false)} okText="로그인" cancelText="취소" confirmLoading={loginMutation.isPending} width={450} centered>
            <Wrapper>
                <Title style={{textAlign: "center"}}>로그인</Title>
                <Wrapper>
                    <Input name='username' value={user.username} onChange={handleChange} placeholder='아이디 입력' />
                </Wrapper>
                <Wrapper>
                    <Input name='password' value={user.password} onChange={handleChange} placeholder='비밀번호 입력' />
                </Wrapper>
                <Wrapper>
                    <Button onClick={() => {setOpen(false), navigate("/")}}>닫기</Button>
                </Wrapper>
            </Wrapper>

        </Modal>
        </>
    )
}

export default LoginForm


const Wrapper = styled.div`
    padding : 10px 0 ;
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

const RegisterBtn = styled(Button)`
    background : transparent ;
    color : #85b4fa ;

    &:hover {
        color : #599afc ;
    }
`
