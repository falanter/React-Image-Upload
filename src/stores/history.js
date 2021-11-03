import { observable, action, makeObservable } from 'mobx';
import { Uploader } from '../models';
import { message } from 'antd';

class HistoryStore {
  constructor() {
    makeObservable(this)
  }
  @observable list = [];          //列表
  @observable isLoading = false;  //是否在加载中
  @observable hasMore = true;     //是否有更多的数据
  @observable page = 0;           //当前第几页
  limit = 10;

  @action append(newList) {
    this.list = this.list.concat(newList);
  }

  @action find() {
    console.log('a')
    this.isLoading = true;
    Uploader.find({page: this.page, limit: this.limit})
      .then(newList => {
        this.append(newList);
        this.page++;
        if(newList.length < this.limit) {
          this.hasMore = false;
        }
      }).catch(error => {
        message.error('加载数据失败');
      }).finally(() => {
        this.isLoading = false;
      });
  }

  @action reset() {
    this.list = [];
    this.isLoading = false;
    this.hasMore = true;
    this.page = 0;
  }

}


export default new HistoryStore();
