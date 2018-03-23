
import { BaseModule } from "../../common/baseui/BaseModule";
import { RankingListModel } from "./model/RankingListModel";
import { RankingListController } from "./controller/RankingListController";
import RankingListView from "./view/RankingListView";
import { LayerManager as LayerMgr } from "../../common/manager/LayerManager";

export class RankingListModule extends BaseModule {
    initMVC() {
    }

    show() {
        LayerMgr.pushView("rankingListView", null, true);
        this.isShowing = true;
    }
    hide() {
        LayerMgr.popView("rankingListView", null, true);
        this.isShowing = false;
        this.view = null;
    }

    destructor() {
        super.destructor();
        RankingListModule.instance = null;
    }

    public static instance: RankingListModule = new RankingListModule()

    private constructor() {
        super();
        this.model = RankingListModel.instance
        this.controller = RankingListController.instance
        this.view = new RankingListView();
    }
}