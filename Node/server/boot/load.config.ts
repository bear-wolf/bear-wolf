const _ = require('lodash');
// module variables
const config:any = require('./configuration/config');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'localhost';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);
const globalSettings: any = global;

globalSettings.gConfig = finalConfig;

module.exports ={
    globalSettings
}
