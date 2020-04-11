const mongoose = require('mongoose');

module.exports = (Config: any)=>{
    mongoose.connect(Config.connection_path)
        .then(()=>{
            console.log('Connected to database!!!');
        })
        .catch(()=>{
            console.log('Connected failed!');
        })
}
