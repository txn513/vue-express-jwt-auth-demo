const express = require('express');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const mongoose = require('mongoose');
// const session = require('express-session');
const jwt = require('express-jwt');
const bodyParser = require('body-parser')
const models = path.join(__dirname, './models');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../../build/webpack.config.dev')
const compiler = webpack(webpackConfig);

const app = express()

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(path.join(models, file)));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// Parse application/json
app.use(bodyParser.json())

// Serve static files
app.use(express.static('public'))

// webpackDevMiddleware
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  open: true
}))

// webpackHotMiddleware
app.use(webpackHotMiddleware(compiler))

// View engine setup
app.engine('art', require('express-art-template'));


// Routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

// 
app.use(jwt({secret: 'shhhhhhared-secret'}).unless({path: ['/users/register', '/users/login', '/favicon.ico']}))

app.use('/index', indexRouter)
app.use('/users', userRouter)

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err)
  res.status(err.status || 500).send(err)
})

// Connect mongoDB
connect()
function connect() {
    mongoose.connection
      .on('error', console.log)
      .on('disconnected', connect)
      .once('open', ()=> {
        app.listen(9000, () => console.log('Example app listening on port 9000!'))
      });
    return mongoose.connect('mongodb://localhost:27017/xblog', { useNewUrlParser: true });
  }