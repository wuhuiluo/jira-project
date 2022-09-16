import React, { FormEvent } from 'react'
import { useAuth } from 'context/auth-context';

export const LoginScreen = () => {
    const { user,login } = useAuth()
    console.log('user',user)
    console.log('login',login)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // 阻止页面重新刷新
        e.preventDefault()
        const username = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value
        login({ username, password })
    }
    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">用户名</label>
            <input type="text" id={'username'} />
        </div>
        <div>
            <label htmlFor="password">密码</label>
            <input type="password" id={'password'} />
        </div>
        <button type={'submit'}>登录</button>
    </form>
}