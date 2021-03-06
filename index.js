const Express = require('express');
const Loader = require('./loader');
const Config = require('./config');
const bodyParser = require('body-parser');
const Auth = require('./auth');
const MongoDb = require('./db/mongo');

const ENV = process.env.NODE_ENV || 'development';

const app = new Express();
const config = new Config(ENV);
const auth = new Auth(config);
const loader = new Loader(app, auth, 'LOAD');
const mongo = new MongoDb(config);

(async () => {
    /* middlewares */ 
    app.use(require('morgan')('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    let port = config.SERVER.PORT;
    await app.listen(port);
    loader.apply();
    console.info('OCS Server started on port', port); // eslint-disable-line
    process.send('ready');

    // app.use(mysql.bootstrap());  //adds req.mysql
    // _start demonstration for the loader class
    // setTimeout(() => {
    //     loader.deleteModule('sample');
    //     setTimeout(() => {
    //         loader.apply()
    //     }, 4000)
    // }, 4000)
    // _end demonstration for loader module
})();
