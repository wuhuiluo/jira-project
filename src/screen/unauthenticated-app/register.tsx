import React, { FormEvent } from 'react'
import { useAuth } from 'context/auth-context';
import { Form, Input, Button } from 'antd'
import styled from '@emotion/styled'
export const RegisterScreen = () => {
    const { register } = useAuth()
    const handleSubmit = async (values: { username: string, password: string }) => {
        await register(values)
    }
    return <Form onFinish={handleSubmit}>
        <Form.Item rules={[{
            required: true,
            message: '请输入用户名'
        }]} name={'username'}>
            <Input placeholder={'用户名'} type="text" id={'username'} />
        </Form.Item>
        <Form.Item rules={[{
            required: true,
            message: '请输入密码'
        }]} name={"password"}>
            <Input placeholder={'密码'} type="password" id={'password'} />
        </Form.Item>
        <LongButton htmlType={'submit'} type={"primary"}>注册</LongButton>
    </Form>
}

const LongButton = styled(Button)`
    width: 100%;
`