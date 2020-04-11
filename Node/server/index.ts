const app = require('./boot/app');
const debug = require('debug')('node-angular');
const normalizePort = (value: any)=>{
    let port = parseInt(value, 10);

    debug("port", port);

    if (isNaN(port)) {
        return value;
    }

    if (port > 0) {
        return port;
    }

    return false;
}
const globalAny: any = global;

const port = normalizePort(globalAny.gConfig.port);
app.set('port', port);
// app.use('/', index);
// app.use('/users', users);
// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
