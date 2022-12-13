var utils = require('../util/utils');
var code = require('../constant/code');
var enumeration = require('../constant/enumeration');
var async = require('async');
var commonDao = require('./commonDao');
var logger = console;//require('pomelo-logger').getLogger('pomelo');
let userInfoServices = require('../services/userInfoServices');

var dao = module.exports;

let USER_CACHE_DATA_HEAD = "USER_MODEL";

dao.getUserDataByUid = function (uid, cb) {
    // 查询缓存中是否存在
    commonDao.findOneData("userModel", {uid: uid}, function (err, result) {
        if (err){
            utils.invokeCallback(cb, err);
        }else{
            utils.invokeCallback(cb, null, result);
        }
    })
};

dao.updateUserData = function (uid, saveData, cb) {
    commonDao.updateData('userModel', {uid: uid}, saveData, function (err, res) {
        utils.invokeCallback(cb, err, res._doc);
    });
};

dao.updateUserDataEx = function (matchData, saveData, cb) {
    commonDao.updateData('userModel', matchData, saveData, function (err, res) {
        utils.invokeCallback(cb, err, res._doc);
    });
};

dao.updateUserDataArr = function (saveDataArr, cb) {
    let tasks = [];
    let addTack = function(changeUserData){
        tasks.push(function (cb) {
            let uid = changeUserData.uid;
            delete changeUserData[uid];
            dao.updateUserData(uid, changeUserData, cb);
        });
    };
    for (let i = 0; i < saveDataArr.length; ++i){
        addTack(saveDataArr[i]);
    }

    async.parallel(tasks, function(err, result){
        if (!!err){
            logger.error('batchChangeCurrencyRequest err:' + err);
        }
        cb(null, result);
    })
};

dao.getOnlineUserData = function (startIndex, count, cb) {
    commonDao.findDataAndCount('userModel', startIndex, count, {lastLoginTime: -1}, {frontendId: {$ne:""},}, function (err, res, totalCount) {
        utils.invokeCallback(cb, err, res, totalCount);
    });
};