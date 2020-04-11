module.exports = (app: any, path: string)=>{

    app.use(path + '/', (req:any, res:any, next:any)=>{
        // Check Authentification
        // const token = req.headers["x-access-token"] || req.headers["authorization"];
        // if (!token) return res.status(401).send("Access denied. No token provided.");

        console.log('First middleware: /');
        next();
    });

    app.use(path + '/profile', require('./profile/profile.routes')); // route: /api/v1/profile
    app.use(path + '/language', require('./language/language.routes')); // route: /api/v1/language
    app.use(path + '/public-group', require('./public-group/public-group.routes')); // route: /api/v1/public-group
    app.use(path + '/user', require('./user/user.routes')); // route: /api/v1/user
    app.use(path + '/article', require('./article/article.routes')); // route: /api/v1/user
    app.use(path + '/', require('./main/main.routes')); // route: /api/v1/language
};

