import React, { FormEvent } from 'react'

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
    const login = (param: { username: string, password: string }) => {
        console.log(JSON.stringify(param))
        fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(param)
        }).then(async res => {
            if (res.ok) {
                
            }
        })
    }
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
        <button type={'submit'}>注册</button>
    </form>
}