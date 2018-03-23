const enum enumModel {
    globalModel = 1,                        //公用
    loginModel = 100,                       //登录
    mianModel = 200,                        //主界面
    gameCommModel = 300,                    //游戏公用模块
    TonghuaShun = 400,                      //同花顺
    longhudouModel = 500,                   //龙虎斗
    ChatModel = 600 ,                       //聊天
    niuniuModel = 700                       //牛牛
}

export enum EmitterCfg {
    GLOBAL_ENTER_BACK_GROUND = enumModel.globalModel,   //切换到后台
    GLOBAL_TEST_UPDATE_LOG,                             //更新日志
    GLOBAL_NET_WORK_CLOSED,                             //断网

    //登录模块定义
    LOGIN_CONFIRM_LOGIN = enumModel.loginModel,
    LOGIN_SHOW_STATE,                                   //显示登录按钮
    LOGIN_SERVER_CLICK,                                 //选服
    LOGIN_HTTP_LOGIN,                                   //登录返回
    LOGIN_SEND_LOGIN_SERVER,                            //发送登录协议
    LOGIN_SERVER_SUCC,                                  //登录成功
    
    //游戏公用模块
    GAME_SELECT_JETTON = enumModel.gameCommModel,       //选择投注筹码
    GAME_EXIT_SUCC,                                     //成功退出游戏
    GAME_EXIT_GAME,                                     //返回大厅
    GAME_UPDATE_TOTAL,                                  //更新投注总额
    GAME_START_BET,                                     //开始投注--这时候清牌
    GAME_START_FA_PAI,                                  //开始发牌
    GAME_START_FAN_PAI,                                 //开始翻牌
    GAME_START_COMPARE_PAI,                             //比牌开始
    GAME_END_COMPARE_PAI,                               //比牌结束
    GAME_BALL_SHOW,                                     //显示号码球界面
    GAME_MY_TOTAL,                                      //更新我的总额
    GAME_ROB_ZHUANG,                                    //抢庄成功  屏蔽按钮
    COM_PLAYER_BOX,                                     //玩家资料框的显示
    GAME_HISTORY_PAGE,                                  //历史数据4个标签页
    GAME_RECORD,                                        //牌型隐藏
    CAME_HISTORY_UPDATE ,                               //历史刷新
    GAME_PARTICLE,                                      //筹码粒子特效
    GAME_BETAREA,                                       //区域开启禁用
    GAME_SUICIDE,                                       //历史自杀
    //主界面定义
    MAIN_ENTER_GAME = enumModel.mianModel,
    MAIN_Add_FRIEND,
    MAIN_Del_FRIEND,
    MAIN_BNT_NOTICE,
    MAIN_BNT_ACTIVITY,
    MAIN_ESESSION,         //场次选择
    MAIN_HIDES,
    MAIN_PROMPT,             //红点
    MAIN_DATING,             //大厅动画
    ACT_REDDIAN,         //大厅活动红点
    ACT_REDDIAN_INSIDE,      //活动内的红点
    MAIN_CHONLIAN,           //重连输入框bug

    //签到定义
    SIGN_SELECTED,        //未签到选中

    //同花顺定义
    TONGHUASHUN_TIME,

    //聊天定义
    CHAT_TOTAL = enumModel.ChatModel,
    CHANNE_NAME,
    CHAT_CANCEL,
    DIALOGUE_NAME,
    CHAT_DIALOGUE,
    CHAT_NUMBER,
    CHAT_DELETE,

    //个人资料
    ROLE_DIANJI,


    //龙虎斗
    LHD_BEGIN_LHD = enumModel.longhudouModel,
    LHD_NUMBALL,
    LHD_NUMRESULTS,
    LHD_NUMBALLTIME,

    
    //牛牛
    NIU_THE_CARD  = enumModel.niuniuModel
}