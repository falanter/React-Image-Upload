import React,{useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoUrl from './logo.svg';
import styled from 'styled-components';
import {Button, message} from 'antd';
import { useStores } from '../stores';
import { observer } from 'mobx-react';

const StyleButton=styled(Button)`
  margin-left:10px;
`;
const Login=styled.div`
  margin-left:auto;
`;

const Header=styled.header`
  background-color:#343A40;
  padding:10px 100px;
  display:flex;
  align-items:center;
  color:#fff;
`;
const Logo=styled.img`
  height:35px;
  &:hover{
    cursor:pointer;
  }
`;
const StyledLink=styled(NavLink)`
  color: rgba(255,255,255,.5);
  margin-left:20px;
  &:hover{
    color:rgba(255,255,255,.7);
  }
  &.active{
    // border-bottom:1px solid #fff;
    color:#fff;
  }
`;

const  Component = observer(() => {
  const history = useHistory();
  const { UserStore, AuthStore,HistoryStore } = useStores();
  // console.log(UserStore)
  const handleLogin = () => {
    // console.log('跳转到登录页面')
    history.push('/login');
  };
  const handleLogout = () => {
    AuthStore.logout();
    HistoryStore.reset();
    message.success('已注销');
  };
  const handleRegister = () => {
    // console.log('跳转到注册页面')
    history.push('/register');
  };
  const toHome = () => {
    history.push('/');
  };
  useEffect(()=>{
    UserStore.pullUser();
  },[])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Header>
        <Logo src={LogoUrl} onClick={toHome} />
        <nav>
          <StyledLink to="/" activeClassName="active" exact>首页</StyledLink>
          <StyledLink to="/history" activeClassName="active">上传历史</StyledLink>
          <StyledLink to="/about" activeClassName="active">关于</StyledLink>
        </nav>
        <Login>
        {
          UserStore.currentUser ? <>
            {UserStore.currentUser.attributes.username} <StyleButton type="primary" onClick={handleLogout}>注销</StyleButton>
          </> :<>
          <StyleButton type="primary" onClick={handleLogin}>登录</StyleButton>
          <StyleButton type="primary" onClick={handleRegister}>注册</StyleButton>
          </>
        }
        </Login>
    </Header>
  );
});

export default Component;