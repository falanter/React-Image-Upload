import React,{useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoUrl from './logo.svg';
import styled from 'styled-components';
import {Button} from 'antd';
import { useStores } from '../stores';
import { observer } from 'mobx-react';

const StyleButton=styled(Button)`
  margin-left:10px;
`;
const Login=styled.div`
  margin-left:auto;
`;

const Header=styled.header`
  background-color:#02101f;
  padding:10px 100px;
  display:flex;
  align-items:center;
  color:#fff;
`;
const Logo=styled.img`
  height:30px;
`;
const StyledLink=styled(NavLink)`
  color:#fff;
  margin-left:20px;
  &.active{
    border-bottom:1px solid #fff;
  }
`;

const  Component = observer(() => {
  const history = useHistory();
  const { UserStore, AuthStore } = useStores();
  // console.log(UserStore)
  const handleLogin = () => {
    console.log('跳转到登录页面')
    history.push('/login');
  };
  const handleLogout = () => {
    AuthStore.logout();
  };
  const handleRegister = () => {
    console.log('跳转到注册页面')
    history.push('/register');
  };
  const handleTest = () => {
    console.log('test')
    history.push('/test');
  };
  useEffect(()=>{
    UserStore.pullUser();
  },[])
  return (
    <Header>
        <h1>Header</h1>
        <Logo src={LogoUrl} />
        <nav>
          <StyledLink to="/" activeClassName="active" exact>首页</StyledLink>
          <StyledLink to="/history" activeClassName="active">上传历史</StyledLink>
          <StyledLink to="/about" activeClassName="active">关于</StyledLink>
        </nav>
        <Login>
        
        {
          UserStore.currentUser && UserStore.currentUser.attributes ? <>
            {UserStore.currentUser.attributes.username} <StyleButton type="primary" onClick={handleLogout}>注销</StyleButton>
          </> :<>
          <StyleButton type="primary" onClick={handleLogin}>登录</StyleButton>
          <StyleButton type="primary" onClick={handleRegister}>注册</StyleButton>
          </>
        }
        </Login>
        <StyleButton onClick={handleTest}>test</StyleButton>
    </Header>
  );
});

export default Component;