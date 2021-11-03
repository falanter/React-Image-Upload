import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { List, Skeleton, Divider, message} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { observer } from 'mobx-react';
import { useStores } from '../stores';
import styled from 'styled-components';

const Img = styled.img`
  width: 100px;
  height: 120px;
  object-fit: contain;
  border: 1px solid #eee;
`;

const Component = observer(() => {
    const { HistoryStore, UserStore } = useStores();
    const history = useHistory();
  const loadMoreData = () => {
    console.log(UserStore.currentUser)
    if(HistoryStore.isLoading){
        return;
    }
    HistoryStore.find();
    console.log(HistoryStore.list);
  };

  useEffect(() => {
    console.log('进入组件')
    if(UserStore.currentUser){
      loadMoreData();
    }else{
      message.warning('请先登录！');
    }
    return () => {
      console.log('卸载')
      HistoryStore.reset();
    }
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={HistoryStore.list}
        next={loadMoreData}
        hasMore={!HistoryStore.isLoading&&HistoryStore.hasMore}
        scrollableTarget="scrollableDiv"
      >
        <List 
          dataSource={HistoryStore.list}
          renderItem={
            item => <List.Item key={item.id}>
              <div>
                <Img src={item.attributes.url.attributes.url}  />
              </div>
              <div>
                <h5>{item.attributes.filename}</h5>
              </div>
              <div>
                <a  target="_blank" href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>
              </div>
            </List.Item>
          }
        >
        { HistoryStore.isLoading && HistoryStore.hasMore && (
        <div>
            <Skeleton  paragraph={{ rows: 1 }} active />
        </div>
        )} 
        { !HistoryStore.isLoading && !HistoryStore.hasMore && (
        <div>
            <Divider plain>It is all, nothing more 🤐</Divider>
        </div>
        )} 
        </List>
      </InfiniteScroll>
    </div>
  );
});

export default Component;