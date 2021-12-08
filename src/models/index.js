import AV, { User } from 'leancloud-storage';

AV.init({
  appId: "UqBaAsQMqOQB3rLwNGLTKtOF-gzGzoHsz",
  appKey: "uv9EyQmkgX7UjUt4TeVUBhVa",
  serverURL: "https://uqbaasqm.lc-cn-n1-shared.com"
});

const Auth = {
  register(username, password) {
    let user = new User();
    user.setUsername(username);
    user.setPassword(password);
    return new Promise((resolve, reject) => {
      user.signUp().then(loginedUser => resolve(loginedUser), error => reject(error))
    });
  },

  login(username, password) {
    console.log('------')
    console.log(username, password)
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(loginedUser => resolve(loginedUser), error => reject(error));
    });
  },

  logout() {
    User.logOut();
  },

  getCurrentUser() {
    return User.current();
  }

};

const Uploader = {
  add(file, filename) {
    const item = new AV.Object('Image');
    const avFile = new AV.File(filename, file);
    item.set('filename', filename);
    item.set('owner', AV.User.current());
    item.set('url', avFile);
    return new Promise((resolve, reject) => {
      item.save().then(serverFile => resolve(serverFile), error => reject(error));
    });
  },

  find({page=0, limit=10}) {
    const query = new AV.Query('Image');
    query.include('owner');   //获得所有用户信息
    query.limit(limit);       //显示数量
    query.skip(page*limit);   //跳转到
    query.descending('createdAt');  //按时间降序排列
    query.equalTo('owner', AV.User.current());  //询查自己
    return new Promise((resolve, reject) => {
      query.find()
        .then(results => resolve(results))
        .catch(error => reject(error))
    });
  }
}

// window.Uploader=Uploader;
// Uploader.find({page:0,limit:10}).then(data => console.log(data))

export {
  Auth,
  Uploader
};