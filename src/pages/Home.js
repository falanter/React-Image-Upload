import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores';
import Uploader from '../components/Uploader';
import styled from 'styled-components';

const StyleUploader = styled.div`
  margin-top: 30px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius:5px;
`;
const Hr = styled.hr`
  margin-top:10px;
  border: 1px solid #eee;
`;

const Home = observer(() => {
  const { UserStore } = useStores();
  // console.log('home', UserStore)
  // const User = () => <div>Hello {UserStore.currentUser.attribures.username} </div>
  return (
    <>
    <h1>Image Upload</h1>
    {
      UserStore.currentUser ? <>
        Hello {UserStore.currentUser.attributes.username} 
      </> :<>
      请先登录
      </>
    } 
    <Hr />
    <StyleUploader>
      <Uploader />
    </StyleUploader>
    </>
  );
});

export default Home;