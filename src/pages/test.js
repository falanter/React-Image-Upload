import React,{useState} from 'react';
import {Button} from 'antd';
import styled from 'styled-components';
import { useStores } from '../stores';
const Test=styled.div`
  font-size:12px;
  color:green;
`;
const StyleButton=styled(Button)`
    margin-top:20px;
`;

function Component() {
    const [isLogin,setIsLogin]=useState(false);
    const { AuthStore } = useStores();
    return (
        <>
            <h1>test</h1>
            <Test>test</Test>
            <StyleButton type="primary">Button</StyleButton>
            <div>
                {
                    isLogin ? <>
                        test  <StyleButton type="primary" onClick={()=>setIsLogin(false)}>注销</StyleButton>
                    </>:<>
                    <StyleButton type="primary" onClick={()=>setIsLogin(true)}>登录</StyleButton>
                    </>
                }
            </div>
            <h1>Login: {AuthStore.values.username}</h1>
        </>
    );
}

export default Component;