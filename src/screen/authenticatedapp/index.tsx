import React from 'react'
import { Dropdown, Menu } from 'antd'
import { useAuth } from 'context/auth-context'
import { ObjectListScreen } from 'components/screen/panal-list/index'
import { Row } from '../../components/lib'
import { ReactComponent as SoftWareLogo } from '../../assets/software-logo.svg'
import styled from '@emotion/styled'
export const Authenticated = () => {
  const { user, logout } = useAuth()
  return <Container>
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftWareLogo width={'18rem'} color={'rgb(38,132,255)'} />
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={
          <Menu>
            <Menu.Item key={'logout'}>
              <a href="" onClick={logout}>登出</a>
            </Menu.Item>
          </Menu>
        }>
          <a onClick={(e) => e.preventDefault()} href="">Hi {user?.name}</a>
        </Dropdown>
      </HeaderRight>
    </Header>
    <Main>
      <ObjectListScreen />
    </Main>
  </Container>
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