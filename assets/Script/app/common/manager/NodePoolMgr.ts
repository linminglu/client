export enum NodePoolKey {
    BET_JETTON,
    tonghuashun,
    longhudou,
    erbagang,
    xiaojiu,
    niuniu,
    zhajinhua,
    JETTON_ITEM,
    
    JETTON_GROP,
    HISTORY_XIN,
    HISTORY_SUICIDE,
    //历史数据
    LOTTERY_HISTORY, //开奖记录
    GAME_HISTORY,//游戏记录
    ZHUANG_HISTORY1,//庄家记录
    ZHUANG_HISTORY2,
    ZHUANG_HISTORY3,
    ZHUANG_HISTORY4,
    ZHUANG_HISTORY5,
    ZHUANG_HISTORY6,
    PERSONAL_HISTORY,//个人报表
    FIND_TERM, //查询项
    //转账账变记录
    TURN_ACCOUNT, //转账
    CHANGE_ACCOUNT, //账变
    //大厅
    MAIN_ACT, //活动
    MAIN_RANKING, //排行榜 
}

export class NodePoolMgr {
    public static instance: NodePoolMgr = new NodePoolMgr()

    private poolMgrList = []

    private createNodePool(key: number) {
        this.poolMgrList[key] = new cc.NodePool(key.toString())
    }


    public putNood(target, key: number) {
        if (this.poolMgrList[key] == null) {
            this.createNodePool(key)
        }

        this.poolMgrList[key].put(target)
    }

    public getNood(key: number) {
        if (this.poolMgrList[key]) {
            if (this.poolMgrList[key].size() > 0) {
                return this.poolMgrList[key].get()
            }
        }
        return null
    }

    public clear(key: number = null) {
        if (key == null) {
            let poolMgr = this.poolMgrList.shift()
            poolMgr.clear()
        } else {
            if (this.poolMgrList[key]) {
                this.poolMgrList[key].clear()
                this.poolMgrList[key] = null
            }
        }
    }
}