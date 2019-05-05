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
// app/server/routes/user.js
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
      // create token
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
// app/server/routes/user.js
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
	
    // create token
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

### Creating the server and connecting to mongoDB

```javascript
// app/server/app.js
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

### Adding JWT Token Verification Middleware

The JWT middleware checks the JWT token received every http request from the client is valid before allowing access to the API, if the token is invalid a "401 Unauthorized" response is sent to the client.

```js
// app/server/app.js
const jwt = require('express-jwt');
app.use(jwt({secret: 'shhhhhhared-secret'})
        .unless({path: ['/users/register', '/users/login', '/favicon.ico']}))
```



## Client-side

### Defining the vue routes

Checking for a meta field in the global navigation guard. If a route requires authentication, check if logged in, if not redirect to login page.

```javascript
// app/client/src/router.js
const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    }
]
```

Handling requests to these routes based on the meta specification

```javascript
// app/client/src/router.js
router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
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

