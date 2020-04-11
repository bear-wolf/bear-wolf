import express from "express";
import bodyParser from "body-parser";
//import {globalA} from "./load.config";
const globalSettings = require('./load.config')
const app = express();
const cors = require('cors');
const _ = require('lodash');
// module variables
const config:any = require('./configuration/config');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'localhost';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

globalSettings.gConfig = finalConfig;

require("./mongoose")(finalConfig);
//require('./../crons')(finalConfig, {'--install': true})

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

//require('./session')(app);
//require('./redis-server')(app);
require('./routes')(app);
require('./winston');

module.exports = app;
