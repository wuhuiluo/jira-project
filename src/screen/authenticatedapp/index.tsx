import React from 'react'
import { useAuth } from 'context/auth-context'
import { ObjectListScreen } from 'components/screen/panal-list/index'

export const Authenticated = () => {
    const { logout } = useAuth()
    return <div>
        <button onClick={logout}>登出</button>
        <ObjectListScreen />
    </div>
}