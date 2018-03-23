
import { BaseModel } from "../../../common/baseui/BaseModel"
import ProtoMgr from "../../../network/ProtoMgr"
import { RankingListController } from "../controller/RankingListController"
export class RankingListModel extends BaseModel {
    public toTalNum: number = 0;    //下注额度
    public rankingSeq: number = 0;
    public dataList_I = [];
    public dataList_W = [];
    dataType: number = 0;
    pageCount_I: number = 1;  //总页数
    pageCount_W: number = 0;
    rank_I: any = null;
    rank_W: any = null;

    setRankInfoData(msg) {
       
        let that = this
        ProtoMgr.parseMsgData("activitydata", "S_IntegralRankInfo", msg, function (data) {
            that.rankingSeq = data.activitySeq
            let prame = {
                seq: data.activitySeq,
                num: 0,
            }
            //console.log("数据========", data)
            RankingListController.instance.C_IntegralRank(prame)
        })
    }
    // repeated RankMsg rankList = 1; //积分排行列表
    // optional int32 totalNum = 2;//总页数
    setIntegralRankDataList(mag) {
        console.log("RankingListModel===============",mag)
        let self = this
        ProtoMgr.parseMsgData("activitydata", "S_IntegralRank", mag.result.activityContent, function (data) {
                console.log("ssssssssssssssssss======",self.dataType)
            if (self.dataType == 1) {
                self.dataList_W = data.rankList;
                // this.pageCount_W = mag.totalNum;
                self.rank_W = data.rank
                self.changedModel("RANKING_DATA_W", self.dataList_W)
                self.changedModel("PLAYER_DATA", self.rank_W)
            } else {
                self.dataList_I = data.rankList
                self.rank_I = data.rank
                //this.pageCount_I =  mag.totalNum;
                //console.log("ssssss1111111111111111111======",data.rankList)
                self.changedModel("RANKING_DATA_L", self.dataList_I)
                self.changedModel("PLAYER_DATA",  self.rank_I)
            }
        })

    }
    getPageCount_I() {

        return this.pageCount_I
    }
    getPageCount_W() {

        return this.pageCount_W
    }

    // getIntegralRankDataList() {

    //     return this.dataList_L

    // }

    getRankingSeq() {

        return this.rankingSeq
    }

    setDataType(num) {

        this.dataType = num
    }
    getDataType() {

        return this.dataType
    }
    destructor() {
        super.destructor();
        RankingListModel.instance = null;

        this.toTalNum = 0;
    }

    public static instance: RankingListModel = new RankingListModel()

    private constructor() {

        super();

    }
}