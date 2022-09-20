import React from 'react'
import { useAuth } from 'context/auth-context';
import { Form, Input, Button } from 'antd'
import styled from '@emotion/styled'
export const RegisterScreen = ({ setError }: { setError: (error: Error) => void }) => {
    const { register } = useAuth()
    const handleSubmit = async ({ cpassword, ...values }: { username: string, password: string, cpassword: string }) => {
        if (cpassword !== values.password) {
            setError(new Error('请确认两次输入的密码相同'))
            return
        }
        try {
            await register(values)
        } catch (e: any) {
            setError(e)
        }
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
        <Form.Item rules={[{
            required: true,
            message: '请确认密码'
        }]} name={"cpassword"}>
            <Input placeholder={'密码'} type="password" id={'cpassword'} />
        </Form.Item>
        <LongButton htmlType={'submit'} type={"primary"}>注册</LongButton>
    </Form>
}

const LongButton = styled(Button)`
    width: 100%;
`