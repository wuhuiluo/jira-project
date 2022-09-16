import React, { useState } from 'react';
import { RegisterScreen } from './register';
import { LoginScreen } from './login';

export const UnAuthenticatedApp = () => {
    const [register, setRegister] = useState(false)
    return <div>
        {
            register ? <RegisterScreen /> : <LoginScreen />
        }
        <button onClick={() => setRegister(!register)}>
            切换到 {register ? '登录' : '注册'}
        </button>
    </div>

} 