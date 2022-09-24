import React from 'react'
import { Navigate, Routes, Route } from 'react-router'
import { Link } from 'react-router-dom'
import { TaskScreen } from 'components/screen/Task'
import { KanBanScreen } from 'components/screen/Kaban'
export const RouterScreen = () => {
    return <div>
        <Link to={'kanban'}>看板</Link>
        <Link to={'task'}>任务组</Link>
        <Routes>
            <Route path={'/kanban'} element={<KanBanScreen />}></Route>
            <Route path={'/task'} element={<TaskScreen />}></Route>
            <Route path={'*'} element={<Navigate to={'kanban'} />}></Route>
        </Routes>
    </div>
}