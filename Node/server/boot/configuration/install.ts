const moment = require("moment");
const { User } = require("../../../../Mongo/models/user.schema");
const Global = require('./../load.config');

const Install = async(config:any)=>{
    let defaultUser = config.user;
    let dublicate = await new User(defaultUser).checkDublicate(defaultUser);

    if (!dublicate) {
        defaultUser['date_create'] = moment().format();
        let user = new User(defaultUser);
        await user.save();
        console.log('Default user is create!', user)
    }
}

module.exports = (Config: any)=>{
    console.log('Default settings up');

    Install(Config);
}
