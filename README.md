# **vue-express-jwt-demo**

## Keywords

- Vue
- Vuex
- Axios
- VueRouter
- Express
- Mongoose
- JWT
- Webpack

## Usage

1. Install dependencies

   `npm install`

2. Run the application

   `npm run dev`

## Server-side

### Implementing the Register Route

```js
router.post('/register', function(req, res, next) {
  User.userCheck(req.body.username, function(err, user){
    if (err) {
      return next(err);
    }
    if (user) {
      return res.json({
        error: 'user exists'
      })
    } 
      
    let newUser = new User(req.body)
    // Save user
    newUser.save().then(function(user) {
      let token = jwt.sign({id: user._id}, 'shhhhhhared-secret', {
        expiresIn : 60 * 3
      });
      return res.json({
        success: true,
        user,
        token
      })
    })
  })
});
```

### Implementing the Login Route

```js
router.post('/login', function(req, res, next) {
  User.userCheck(req.body.username, function(err, user){
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        success: false,
        message: 'Unknown user'
      })
    } 

    if (!user.authenticate(req.body.password)) {
      return res.json({
        success: false,
        message: 'Invalid password'
      })
    }

    let token = jwt.sign({id: user._id}, 'shhhhhhared-secret', {
      expiresIn : 60 * 3
    });
    return res.json({
      success: true,
      user,
      token
    })
  })
});
```

### Create a server and connect to mongoDB

```javascript
function connect() {
    mongoose.connection
      .on('error', console.log)
      .on('disconnected', connect)
      .once('open', ()=> {
        app.listen(9000, () => console.log('Example app listening on port 9000!'))
      });
    return mongoose.connect('mongodb://localhost:27017/xblog', {useNewUrlParser: true});
}
```



## Client-side

### Defining the vue routes

For routes requiring authentication, we add extra data to it to enable us identify it when the user tries to access it.

```javascript
const routes = [
    {
        path: '/',
        name: '/',
        component: Index
    },
    {
        path: '/repository',
        name: 'repository',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Repository
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];
```

Handling requests to these routes based on the meta specification

```javascript
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})
```

## Axios interceptors

Request interceptor includes your JWT token in every request as an Authorization header.

```javascript
// app/client/api/http.js
const service = axios.create({
    baseURL: process.env.API_ROOT, 
    timeout: 5000
});

service.interceptors.request.use(request => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`
    }
    return request;
});
  
service.interceptors.response.use(
    response => {
        if (response.data.token) {
            console.log('token:', response.data.token);
            localStorage.setItem('token', response.data.token);
        }
        return response;
    },
    error => {
        const errRes = error.response;
        if (errRes.status === 401) {
            localStorage.removeItem('token');
            router.push('/login')
        }
    return Promise.reject(error.message); 
});
  
export default service;
```

### Vuex

