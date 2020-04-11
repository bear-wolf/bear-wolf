const redis = require('redis');
let session = require('express-session');
const redisClient = redis.createClient(6379);
const RedisStore = require('connect-redis')(session);

module.exports = (app:any)=>{
    app.use(session({
        store: new RedisStore({client: redisClient}),
        secret: 'keyboard cat',
        resave: true,
        cookie: { secure: true },
        saveUninitialized: true
    }));
}
