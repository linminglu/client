


export const ServerStateArr = [
    { stateStr: "流畅", stateImg: "leisure_logo" },
    { stateStr: "拥挤", stateImg: "ordinary_logo" },
    { stateStr: "火爆", stateImg: "more_logo" },
    { stateStr: "维护中", stateImg: "busy_logo" }
]

export const IconArr = {
    "0": { icon: "head-fram_big_head_0" },
    "tonghuashun": { icon: "head-fram_big_head_1" },
    "longhudou": { icon: "head-fram_big_head_2" },
    "erbagang": { icon: "head-fram_big_head_4" },
    "xiaojiu": { icon: "head-fram_big_head_3" },
    "niuniu": { icon: "head-fram_big_head_5" },
    "zhajinhua": { icon: "head-fram_big_head_6" },
    "1001": { icon: "head-icon_big_ellipse_1" },
    "1002": { icon: "head-icon_big_ellipse_2" },
    "1003": { icon: "head-icon_big_ellipse_3" },
    "1004": { icon: "head-icon_big_ellipse_4" },
    "1005": { icon: "head-icon_big_ellipse_5" },
    "1006": { icon: "head-icon_big_ellipse_6" },
    "1007": { icon: "head-icon_big_ellipse_7" },
    "1008": { icon: "head-icon_big_ellipse_8" },
    "1009": { icon: "head-icon_big_ellipse_9" },
    "1010": { icon: "head-icon_big_ellipse_1" },
    "1011": { icon: "head-icon_big_ellipse_2" },
    "1012": { icon: "head-icon_big_ellipse_3" },
}

//游戏参数配置
export const GameCfg = {
    GAME_BALL_SHOW_TIME: 5,             //号码球界面显示时间
    GAME_JETTON_SHOW_TIME: 5,           //筹码显示时间
    GAME_BET_END_TIME: 3,               //下注倒计时间
}

export const GameParam = {
    isOutServer: true,
    // isSimulateNet: true,         //是否开启模拟网络
    isSimulateNet: false,         //是否开启模拟网络
    // isDevelopment: true,          //是否开发模式
    // iaAutoBet: true,
}

//场次类型  额度
export const Roomlevel = [
    { spricon: "main-spr_crown", sprname: "main-txt_goldenhall_0", lblquota: "(最小下注金额50)" },
    { spricon: "main-spr_diamond", sprname: "main-txt_diamond_0", lblquota: "(最小下注金额500)" },
    { spricon: "main-spr_vip", sprname: "main-txt_viphall_0", lblquota: "(最小下注金额1k)" },
]

//表情的   解义字符     //  喜  x   怒  n  哀  a  乐  l
export const Express = [
    { unbind: "/X00", meaning: "<img src='Expression-icon_0' />" },
    { unbind: "/A01", meaning: "<img src='Expression-icon_1' />" },
    { unbind: "/N02", meaning: "<img src='Expression-icon_2' />" },
    { unbind: "/A03", meaning: "<img src='Expression-icon_3' />" },
    { unbind: "/L04", meaning: "<img src='Expression-icon_4' />" },
    { unbind: "/X05", meaning: "<img src='Expression-icon_5' />" },
    { unbind: "/L06", meaning: "<img src='Expression-icon_6' />" },
    { unbind: "/X07", meaning: "<img src='Expression-icon_7' />" },
    { unbind: "/L08", meaning: "<img src='Expression-icon_8' />" },
    { unbind: "/X09", meaning: "<img src='Expression-icon_9' />" },
    { unbind: "/L10", meaning: "<img src='Expression-icon_10' />" },
    { unbind: "/A11", meaning: "<img src='Expression-icon_11' />" },
    { unbind: "/L12", meaning: "<img src='Expression-icon_12' />" },
    { unbind: "/A13", meaning: "<img src='Expression-icon_13' />" },
    { unbind: "/N14", meaning: "<img src='Expression-icon_14' />" },
    { unbind: "/L15", meaning: "<img src='Expression-icon_15' />" },
    { unbind: "/X16", meaning: "<img src='Expression-icon_16' />" },
    { unbind: "/X17", meaning: "<img src='Expression-icon_17' />" },
    { unbind: "/A18", meaning: "<img src='Expression-icon_18' />" },
    { unbind: "/N19", meaning: "<img src='Expression-icon_19' />" },
    { unbind: "/L20", meaning: "<img src='Expression-icon_20' />" },
    { unbind: "/A21", meaning: "<img src='Expression-icon_21' />" },
    { unbind: "/X22", meaning: "<img src='Expression-icon_22' />" },
    { unbind: "/X23", meaning: "<img src='Expression-icon_23' />" },
    { unbind: "/X24", meaning: "<img src='Expression-icon_24' />" },
    { unbind: "/X25", meaning: "<img src='Expression-icon_25' />" },
    { unbind: "/X26", meaning: "<img src='Expression-icon_26' />" },
    { unbind: "/A27", meaning: "<img src='Expression-icon_27' />" },
    { unbind: "/X28", meaning: "<img src='Expression-icon_28' />" },
    { unbind: "/X29", meaning: "<img src='Expression-icon_29' />" },
    { unbind: "/X30", meaning: "<img src='Expression-icon_30' />" },
    { unbind: "/L31", meaning: "<img src='Expression-icon_31' />" },
    { unbind: "/L32", meaning: "<img src='Expression-icon_32' />" },
    { unbind: "/L33", meaning: "<img src='Expression-icon_33' />" },
    { unbind: "/X34", meaning: "<img src='Expression-icon_34' />" },
    { unbind: "/X35", meaning: "<img src='Expression-icon_35' />" },
    { unbind: "/A36", meaning: "<img src='Expression-icon_36' />" },
    { unbind: "/A37", meaning: "<img src='Expression-icon_37' />" },
    { unbind: "/N38", meaning: "<img src='Expression-icon_38' />" },
    { unbind: "/X39", meaning: "<img src='Expression-icon_39' />" },
    { unbind: "/X40", meaning: "<img src='Expression-icon_40' />" },
    { unbind: "/N41", meaning: "<img src='Expression-icon_41' />" },
    { unbind: "/X42", meaning: "<img src='Expression-icon_42' />" },
    { unbind: "/X43", meaning: "<img src='Expression-icon_43' />" },
    { unbind: "/L44", meaning: "<img src='Expression-icon_44' />" },
    { unbind: "/A45", meaning: "<img src='Expression-icon_45' />" },
    { unbind: "/X46", meaning: "<img src='Expression-icon_46' />" },
    { unbind: "/A47", meaning: "<img src='Expression-icon_47' />" },
    { unbind: "/N48", meaning: "<img src='Expression-icon_48' />" },
    { unbind: "/A49", meaning: "<img src='Expression-icon_49' />" },
    { unbind: "/A50", meaning: "<img src='Expression-icon_50' />" },
    { unbind: "/L51", meaning: "<img src='Expression-icon_51' />" },
    { unbind: "/X52", meaning: "<img src='Expression-icon_52' />" },
    { unbind: "/X53", meaning: "<img src='Expression-icon_53' />" },
    { unbind: "/X54", meaning: "<img src='Expression-icon_54' />" },
    { unbind: "/L55", meaning: "<img src='Expression-icon_55' />" },
    { unbind: "/L56", meaning: "<img src='Expression-icon_56' />" },
    { unbind: "/X57", meaning: "<img src='Expression-icon_57' />" },
    { unbind: "/X58", meaning: "<img src='Expression-icon_58' />" },
    { unbind: "/N59", meaning: "<img src='Expression-icon_59' />" },
    { unbind: "/X60", meaning: "<img src='Expression-icon_60' />" },
    { unbind: "/A61", meaning: "<img src='Expression-icon_61' />" },
    { unbind: "/X62", meaning: "<img src='Expression-icon_62' />" },
    { unbind: "/A63", meaning: "<img src='Expression-icon_63' />" },
    { unbind: "/X64", meaning: "<img src='Expression-icon_64' />" },
    { unbind: "/A65", meaning: "<img src='Expression-icon_65' />" },
    { unbind: "/X66", meaning: "<img src='Expression-icon_66' />" },
    { unbind: "/L67", meaning: "<img src='Expression-icon_67' />" },
    { unbind: "/X68", meaning: "<img src='Expression-icon_68' />" },
    { unbind: "/X69", meaning: "<img src='Expression-icon_69' />" },

]

export const Week = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
]

export const Statistics = [
    "",
    "recordTypeItem1",
    "recordTypeItem2",
    "recordTypeItem3",
    "recordTypeItem4",
    "recordTypeItem5",
    "recordTypeItem6",
]
export const AllcardType =[
    ["", "高牌", "一对", "两对", "三条", "顺子", "同花", "葫芦", "四条", "同花顺", "同花大顺"],
    ["十点","一点","二点","三点","四点","五点","六点","七点","八点","九点"],
    ["鳖十", "一点", "两点", "三点", "四点", "五点", "六点", "七点", "八点", "九点", "二八杠","一筒对子", 
    "二筒对子", "三筒对子", "四筒对子", "五筒对子", "六筒对子", "七筒对子", "八筒对子", "九筒对子","白板对子"],
    ["零点", "一点", "两点", "三点", "四点", "五点", "六点", "七点", "八点", "九点", "","对一", 
    "对二", "对三", "对四", "对五", "对六", "对七", "对八", "对九", "对十"],
    ["无牛", "牛一", "牛二", "牛三", "牛四", "牛五", "牛六", 
    "牛七", "牛八", "牛九", "牛牛","四炸", "五小牛"],
    ["单张", "对子", "顺子", "金花","顺金","豹子"]
]


