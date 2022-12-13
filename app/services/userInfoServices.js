let dao = require('../dao/commonDao');
let userDao = require('../dao/userDao');
let async = require('async');
let code = require('../constant/code');
let utils = require('../util/utils');
let gameServerConfig = require('../../config/gameServer.json');
let httpServices = require('../services/httpRequestServices');

let service = module.exports;

service.convertMongoUserDataToRedisUserData = function (userData) {
    let redisUserData = {};
    for (let key in userData){
        if (key === '_id') continue;
        if (userData.hasOwnProperty(key)){
            if (typeof userData[key] !== 'string' && key !== '$inc'){
                redisUserData[key] = userData[key].toString();
            }else{
                redisUserData[key] = userData[key];
            }
        }
    }
    return redisUserData;
};

service.convertRedisUserDataToMongoUserData = function (userData) {
    let schema = global.mongoClient['userModel'].schema.tree;
    let redisUserData = {};
    for (let key in userData){
        if (userData.hasOwnProperty(key)){
            let schemaKey = schema[key];
            if (!!schemaKey && !!schemaKey.type && schemaKey.type.name === 'Number'){
                redisUserData[key] = parseFloat(userData[key]);
            }else{
                redisUserData[key] = userData[key];
            }
        }
    }
    return redisUserData;
};