import React from 'react'
import { Dropdown, Menu, Button } from 'antd'
import { Navigate, Routes, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from 'context/auth-context'
import { ProjectList } from 'components/screen/panal-list/index'
import { Row } from '../../components/lib'
import { ReactComponent as SoftWareLogo } from '../../assets/software-logo.svg'
import styled from '@emotion/styled'
import { useDocumentTitle } from 'utils/use-documentTitle'
import { RouterScreen } from 'components/route/route'
import { resetRoute } from 'utils'
export const Authenticated = () => {
  useDocumentTitle('项目列表', false)
  return <Container>
    <PageHeader />
    <Main>
      <Router>
        <Routes>
          <Route path={'/projects'} element={<ProjectList />}></Route>
          <Route path={'/projects/:projectId/*'} element={<RouterScreen />}></Route>
          <Route path="*" element={<Navigate to={'/projects'} />}></Route>
        </Routes>
      </Router>
    </Main>
  </Container>
}

const PageHeader = () => {
  const { user, logout } = useAuth()
  return <Header between={true}>
    <HeaderLeft gap={true}>
      <Button type={'link'}>
        <SoftWareLogo width={'18rem'} color={'rgb(38,132,255)'} />
      </Button>
      <h2>项目</h2>
      <h2>用户</h2>
    </HeaderLeft>
    <HeaderRight>
      <Dropdown overlay={
        <Menu>
          <Menu.Item key={'logout'}>
            <Button type={'link'} onClick={logout}>登出</Button>
          </Menu.Item>
        </Menu>
      }>
        <Button type={'link'} onClick={(e) => e.preventDefault()} href="">Hi {user?.name}</Button>
      </Dropdown>
    </HeaderRight>
  </Header>
}

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  display: flex;
  overflow: hidden;
`;