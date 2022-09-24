import React from 'react'
import { useAuth } from 'context/auth-context';
import { Form, Input, Button } from 'antd';
import styled from '@emotion/styled'
import { useAsync } from 'utils/use-async';
export const LoginScreen = ({ setError }: { setError: (error: Error) => void }) => {
    const { login } = useAuth()
    const { run, isLoading } = useAsync(undefined, { throwError: true })
    // bug: 点击完登录后,有error,但是清除Input中的数据之后error状态没有消失
    const handleSubmit = async (values: { username: string, password: string }) => {
        try {
            await run(login(values))
        } catch (e: any) {
            console.log(e)
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
        }]} name={'password'}>
            <Input placeholder={'密码'} type="password" id={'password'} />
        </Form.Item>
        <Form.Item>
            <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>登录</LongButton>
        </Form.Item>
    </Form>
}

const LongButton = styled(Button)`
    width: 100%;
`