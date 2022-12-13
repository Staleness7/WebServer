/**
 * Created by yuzheng on 2017/3/14.
 */
var enumeration = {};

enumeration.gameType = {
    ZJH: 1,             //扎金花
    NN: 10,             //牛牛
    SSS: 20,            //十三水
    TTZ: 30,            //推筒子
    HHDZ: 40,           //红黑大战
    BJL: 50,            //百家乐
    LHD: 60,            //龙虎斗
    FISH: 70,           // 捕鱼
    DDZ: 80             // 斗地主
};

enumeration.gameName = [];
enumeration.gameName[1] = '扎金花';
enumeration.gameName[10] = '牛牛';
enumeration.gameName[20] = '十三水';
enumeration.gameName[30] = '推筒子';
enumeration.gameName[40] = '红黑大战';
enumeration.gameName[50] = '百家乐';
enumeration.gameName[60] = '龙虎斗';
enumeration.gameName[70] = '捕鱼';
enumeration.gameName[80] = '斗地主';

// 操作类型
enumeration.updateDataType = {
    NONE: 0,
    ADD: 1,
    REMOVE:2,
    UPDATE: 3
};

//玩家性别
enumeration.PlayerSex = {
    MAN: 0,
    WOMAN: 1
};

// 登录平台
enumeration.loginPlatform = {
    NONE: 0,
    ACCOUNT: 1,
    WEI_XIN: 2,
    MOBILE_PHONE: 3
};

// 玩家在线状态
enumeration.userOnlineStatus = {
    NONE: 0,
    OFF_LINE: 1,
    ON_LINE: 2
};

// 房间开始类型
enumeration.gameRoomStartType = {
    NONE: 0,
    ALL_READY: 1,
    AUTO_START: 2
};

// 房间类型
enumeration.roomType = {
    NONE: 0,
    NORMAL: 1,                  // 匹配类型
    HUNDRED: 2,                 // 百人房间
    CONTINUE: 3                 // 持续（类似捕鱼，持续游戏）
};

enumeration.RoomUserStatus = {
    NONE: 0,
    ONLINE: 1,
    OFFLINE: 2
};

// 第三方支付平台中的选择支付方式
enumeration.PAY_TYPE = {
    NONE: 0,
    ALI_PAY: 1,                 //支付宝
    WE_CHAT: 2                  //微信
};

// 充值平台
enumeration.RechargePlatform = {
    NONE: 0,
    JFT: 1,                     // 骏付通
    QMJF:2,                      // 全名金服
    ALI: 3,                        //支付宝
    WX: 4,                        //微信
    RM: 5,                       //融脉
    JXYL: 6                     // 聚闲娱乐支付
};

// 系统平台
enumeration.SystemPlatform = {
    NONE: 0,
    ANDROID: 1,
    IOS: 2,
    WEB: 3
};

// 权限类型
enumeration.userPermissionType = {
    NONE: 0,
    LOGIN_CLIENT:                   0x0001,             // 登录客户端
    LOGIN_MT:                       0x0002,             // 登录管理工具
    USER_MANAGER:                   0x0004,             // 用户管理
    USER_SYSTEM_MANAGER:            0x0008,             // 系统管理
    EXCHANGE_MANAGER:               0x0010,             // 兑换管理
    SPREAD_MANAGER:                 0x0020,             // 推广管理
    GAME_MANAGER:                   0x0040,             // 游戏管理
    DATA_MANAGER:                   0x0080,             // 数据统计
    GAME_CONTROL:                   0x0100              // 游戏控制
};

// 邮件状态
enumeration.emailStatus = {
    NONE: 0,
    NOT_RECEIVE: 1,
    RECEIVED: 2
};

// 兑换订单状态
enumeration.exchangeRecordStatus = {
    NONE: 0,
    WAIT_DELIVERY: 1,                   // 备货中
    ALREADY_DELIVERY: 2                 // 已发货
};

// 订单状态
enumeration.orderStatus = {
    WAIT_HANDLE: 0,                     // 未处理
    ALREADY_HANDLE: 1                   // 已处理
};

// 记录类型
enumeration.recordType = {
    NONE: 0,
    RECHARGE: 1,                        // 充值记录
    WITHDRAWALS: 2,                     // 提现记录
    GAME: 3,                            // 游戏记录
    LOGIN: 4,                           // 登录记录
    EXTRACT_COMMISSION: 5,              // 提取佣金记录
    GAME_PROFIT: 6,                     // 游戏抽水记录
    EXTRACT_INVENTORY: 7,               // 库存抽取记录
    ADMIN_GRANT: 8                      // 管理员赠送记录
};

enumeration.withdrawCashType = {
    NONE: 0,
    ALI_PAY: 1,                         // 支付宝
    BANK_CARD: 2                        // 银行卡
};

// 积分变化类型
enumeration.scoreChangeType = {
    NONE: 0,
    GIVE: 1,                            // 被赠送积分
    MODIFY_LOW: 2,                      // 修改下级分数
    MODIFY_UP: 3,                       // 被上级修改分数
    GAME_WIN: 4,                        // 游戏赢分
    GAME_START_UNION_CHOU: 5,           // 游戏开始联盟抽分
    GAME_WIN_CHOU: 6,                   // 游戏赢家抽分
    SAFE_BOX: 7,                        // 保险柜操作
};
