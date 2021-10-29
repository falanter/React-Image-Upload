import { makeObservable, observable, action } from 'mobx';
import { Auth } from '../models';

class UserStore {
  constructor() {
    makeObservable(this)
  }

  @observable currentUser = null;

  @action pullUser() {
    console.log('pull user')
    this.currentUser = Auth.getCurrentUser()
  }

  @action resetUser() {
    this.currentUser = null;
  }
}

export default new UserStore() ;
