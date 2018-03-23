export const ProtoConfig = {
	S_Exception: "exception",
	S_Exception_Server: "exception",

	//game
	C_DownloadGame: "game", //下载游戏
	C_EnterGame: "game", //进入游戏
	S_EnterGame: "game", //进入游戏
	C_PlayGame: "game", //坐下站起
	S_PlayGame: "game", //坐下站起	
	C_Betting: "game", //确定投注
	S_Betting: "game", //确定投注
	S_SynMoney: "game", //同步投注金额
	C_CancelBetting: "game", //取消投注
	S_CancelBetting: "game", //取消投注
	S_StartBetting: "game", //开始投注
	S_StartAward: "game", //开始发牌
	S_AddRoomPlayer: "game", //添加赌桌上玩家
	S_RemoveRoomPlayer: "game", //移除赌桌上玩家
	C_RemoveRoomPlayer: "game", //移除赌桌上自己
	C_RobBanker: "game", //玩家抢庄
	S_RobBanker: "game", //抢庄返回
	C_QuiteGame: "game", //退出游戏
	S_QuiteGame: "game", //退出游戏返回
	S_WinOrLose :"game",//玩家输赢状况
	S_UpdatePlayers:"game",//更新的玩家列表
	S_EndBetting:"game",
	
	//login
	C_ExitGame: "login", 			//退出游戏
	S_ExitGame: "login", 			//退出游戏(顶号或封号)
	S_StopServer: "login",		//停服维护

	C_LoginGame: "login",
	S_LoginGame: "login",

	//chat
	C_Chat: "chat",
	S_Chat: "chat",
	S_SynNotic: "chat",

	//player
	C_UpdateIconId: "player",
	S_UpdateIconId: "player",
	C_ShowPlayer: "player",   //查询角色信息
	S_ShowPlayer: "player",      //查询角色信息返回
	S_SynGold: "player",	//添加金币回显

	//longhu
	C_LongHu: "longhu",
	S_LongHu: "longhu",

	//friend
	C_FriendList: "friend", //获取好友列表
	S_FriendList: "friend", //获取好友列表返回		
	C_AddFriend: "friend", //添加好友
	S_AddFriend: "friend", //添加好友返回	
	C_DeleteFriend: "friend", //删除好友
	S_DeleteFriend: "friend", //删除好友返回
 
	//datahistory
	C_AwardLog:"game", //开奖记录
	S_AwardLog:"game", //开奖记录返回
	C_BankLog:"game", //庄家统计
	S_BankLog:"game", //庄家统计返回
	C_GameLog :"game", //玩家游戏记录
	S_GameLog :"game", //玩家游戏记录返回
	C_PersonalReport:"game", //个人报表记录
	S_PersonalReport:"game", //个人报表记录返回

	//transfer-accounts 
	C_CostLog:"game",//账变记录
	S_CostLog:"game",//账变记录返回
	C_TransferRecord:"game",//转账记录
	S_TransferRecord:"game",//转账记录返回


	C_Mail_GetMailList : "mail",//获取红包邮件列表请求
	S_Mail_GetMailList : "mail",//红包邮件列表推送
	
	C_Mail_FetchMail : "mail",//领取红包邮件内容请求
	S_Mail_FetchMail : "mail",//领取红包邮件内容请求结果
	
	C_Mail_SendMail : "mail",//发送红包请求
	S_Mail_SendMail : "mail",//发送红包请求结果

	C_Mail_CheckMail : "mail", //发送查看红包请求
	S_Mail_CheckMail : "mail", //发送查看红包请求结果

	C_Activity_GetAvailableActivityList : "activity", //获取可用活动列表
	S_Activity_GetAvailableActivityList : "activity", //获取可用活动列表请求结果
	C_Activity_GetSpecificActivity : "activity", //获取指定活动信息
	S_Activity_GetSpecificActivity : "activity", //获取指定活动信息请求结果
	C_Activity_FetchSpecificActivityReward : "activity", //获取指定活动奖励
	S_Activity_FetchSpecificActivityReward : "activity", //获取指定活动奖励请求结果
	S_DayActiveTips:"activity" //活动红点
}

export enum MessageConfig {
	// 测试消息100000以上
	C_Test = 100001,//外挂

	S_Exception = 1000,//错误码
	S_Exception_Server = 1001,//服务端组装文字提示

	C_GetServerTime = 1200,	//心跳  
	S_GetServerTime = 1201,	//心跳  


	C_SetIsAcceptChat = 1320, 	// 是否接收陌生人信息
	S_SetIsAcceptChat = 1321, 	// 是否接收陌生人信息
	C_GetPlayerOptional = 1324, // 设置信息
	S_GetPlayerOptional = 1325, // 设置信息
	C_ShowPlayer = 1326,        //查询角色信息
	S_ShowPlayer = 1327,        //查询角色信息返回
	C_UpdateIconId = 1328,      //头像编号
	S_UpdateIconId = 1329,	    //头像编号
	S_SynGold = 1330, 	    //添加金币回显

	C_ExitGame = 2000, 			//退出游戏
	S_ExitGame = 2001, 			//退出游戏(顶号或封号)
	S_StopServer = 2002,		//停服维护

	C_LoginGame = 3000, 		//登录游戏
	S_LoginGame = 3001, 		//登录游戏
	C_DeletePlayer = 3009, 		//删除角色
	S_DeletePlayer = 3010, 		//删除角色

	C_FriendList = 4000, //获取好友列表
	S_FriendList = 4001, //获取好友列表返回		
	C_AddFriend = 4002, //添加好友
	S_AddFriend = 4003, //添加好友返回	
	C_DeleteFriend = 4004, //删除好友
	S_DeleteFriend = 4005, //删除好友返回	

	C_DownloadGame = 5000, //下载游戏
	C_EnterGame = 5001, //进入游戏
	S_EnterGame = 5002, //进入游戏
	C_PlayGame = 5003, //坐下站起
	S_PlayGame = 5004, //坐下站起	
	C_Betting = 5005, //确定投注
	S_Betting = 5006, //确定投注
	S_SynMoney = 5007, //同步投注金额
	C_CancelBetting = 5008, //取消投注
	S_CancelBetting = 5009, //取消投注
	S_StartBetting = 5010, //开始投注
	S_StartAward = 5011, //开始发牌
	S_AddRoomPlayer = 5012, //添加赌桌上玩家
	S_RemoveRoomPlayer = 5013, //移除赌桌上玩家
	C_RemoveRoomPlayer = 5014, //移除赌桌上玩家
	C_RobBanker = 5015, //玩家抢庄
	S_RobBanker = 5016, //抢庄返回
	C_QuiteGame = 5017, //退出游戏
	S_QuiteGame = 5018, //退出游戏返回
	S_WinOrLose = 5019,//玩家输赢状况
	S_UpdatePlayers = 5020, //更新的玩家列表
	S_EndBetting = 5021, //结束投注

	C_AwardLog = 6001,//开奖记录
	S_AwardLog = 6002, //开奖记录返回
	C_BankLog = 6003, //庄家记录
	S_BankLog = 6004, //庄家记录返回
	C_GameLog = 6005, //玩家游戏记录
	S_GameLog = 6006, //玩家游戏记录返回
	C_PersonalReport = 6009, //个人报表记录
	S_PersonalReport = 6010, //个人报表记录返回
	C_CostLog = 6007, //账变记录
	S_CostLog = 6008, //账变记录返回
	C_TransferRecord = 6011, //转账记录
	S_TransferRecord = 6012, //转账记录返回

	C_Chat = 13000, //聊天
	S_Chat = 13001, //聊天
	S_SynNotic = 13002,   //公告
	C_PostVoice = 13004,  //上传语音信息
	S_PostVoice = 13005,  //上传语音信息		
	C_GetVoice = 13006,   //获取语音信息
	S_GetVoice = 13007,   //获取语音信息

	C_Mail_GetMailList = 14001,//获取红包邮件列表请求
	S_Mail_GetMailList = 14002,//红包邮件列表推送
	
	C_Mail_FetchMail = 14003,//领取红包邮件内容请求
	S_Mail_FetchMail = 14004,//领取红包邮件内容请求结果
	
	C_Mail_SendMail = 14005,//发送红包请求
	S_Mail_SendMail = 14006,//发送红包请求结果
	C_Mail_CheckMail = 14007, //发送查看红包请求
	S_Mail_CheckMail = 14008, //发送查看红包请求结果
	
	C_Activity_GetAvailableActivityList = 66001, //获取可用活动列表
	S_Activity_GetAvailableActivityList = 66002, //获取可用活动列表请求结果
	C_Activity_GetSpecificActivity = 66003, //获取指定活动信息
	S_Activity_GetSpecificActivity = 66004, //获取指定活动信息请求结果
	C_Activity_FetchSpecificActivityReward = 66005, //获取指定活动奖励
	S_Activity_FetchSpecificActivityReward = 66006, //获取指定活动奖励请求结果
	S_DayActiveTips = 66007, //每日游戏完成后提示红点
}

