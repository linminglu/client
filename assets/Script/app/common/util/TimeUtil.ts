// import { GameManager } from "../../common/manager/GameManager"

export class TimeUtil {
	private static getTimer() { return new Date().getTime() }

	//获取倒计时
	public static getRemainTime(time: number) {
		return Math.floor((time - TimeUtil.getTimer() - TimeUtil.tickOffset) / 1000)
	}
	
	//同步时间
	public static syncServerTime(timeStamp: number): void {
		TimeUtil.tickOffset = timeStamp - new Date().getTime()
	}

    /**
 	 * 时间误差，精确到毫秒 
	 */
	private static tickOffset: number = 0;

	/**
	 * 获取服务器时间，返回当前秒数
	 */
	public static getServerSecond(): number {
		return (TimeUtil.getTimer() / 1000) + TimeUtil.tickOffset;
	}

	/**
	 * 获得服务器时间，返回Date
	 */
	public static getSeverDate(): Date {
		return (new Date(TimeUtil.getServerSecond() * 1000));
	}

	// public static syncServerTime(timeStamp: number): void {
	// 	TimeUtil.tickOffset = timeStamp - (TimeUtil.getTimer() / 1000);
	// }

	/**
	 * 根据时间返回字符串 00:00:00
	 */
	public static formatDate(date: Date): string {
		let hour: number = date.getHours();
		let min: number = date.getMinutes();
		let sec: number = date.getMilliseconds();
		let hourStr: string = hour < 10 ? ("0" + hour) : hour.toString();
		let minStr: string = min < 10 ? ("0" + min) : min.toString();
		let secStr: string = sec < 10 ? ("0" + sec) : sec.toString();
		return hourStr + ":" + minStr + ":" + secStr;
	}

	/**
	 * 根据时间返回字符串 00:00:00-毫秒
	 */
	public static formatDateLog(date: Date): string {
		let hour: number = date.getHours();
		let min: number = date.getMinutes();
		let sec: number = date.getSeconds();
		let hourStr: string = hour < 10 ? ("0" + hour) : hour.toString();
		let minStr: string = min < 10 ? ("0" + min) : min.toString();
		let secStr: string = sec < 10 ? ("0" + sec) : sec.toString();
		return hourStr + ":" + minStr + ":" + secStr + "-" + date.getMilliseconds();
	}
	/**
	 * 根据时间返回字符串 00:00:00
	 */
	public static formatTime(second: number): string {
		let hour: number = Math.floor(second / 60 / 60) % 24;
		let min: number = Math.floor(second / 60) % 60;
		let sec: number = Math.floor(second % 60);
		let hourStr: string = hour < 10 ? ("0" + hour) : hour.toString();
		let minStr: string = min < 10 ? ("0" + min) : min.toString();
		let secStr: string = sec < 10 ? ("0" + sec) : sec.toString();

		return hourStr + ":" + minStr + ":" + secStr;
	}

	/**
	 * 小时分钟
	 * @param second
	 * @return 
	 */
	public static formatTime4(second: number): string {
		let hour: number = Math.floor(second / 60 / 60) % 24;
		let min: number = Math.floor(second / 60) % 60;
		let hourStr: string = hour < 10 ? ("" + hour) : hour.toString();
		let minStr: string = min < 10 ? ("" + min) : min.toString();
		return hourStr + "小时" + minStr + "分钟";
	}

	/**
	  *根据时间返回字符串 00分00秒
	 */
	public static formatTime5(second: number): string {
		let hour: number = Math.floor(second / 60 / 60) % 24;
		let min: number = Math.floor(second / 60) % 60;
		let sec: number = Math.floor(second % 60);
		let hourStr: string = hour < 10 ? ("0" + hour) : hour.toString();
		let minStr: string = min < 10 ? ("0" + min) : min.toString();
		let secStr: string = sec < 10 ? ("0" + sec) : sec.toString();
		if (hour > 0) {
			return hourStr + "小时" + minStr + "分" + secStr + "秒";
		}
		return minStr + "分" + secStr + "秒";
	}

	/**
		 * 根据时间返回字符串 00:00
		 */
	public static formatTime2(second: number): string {
		var min: number = Math.floor(second / 60) % 60;
		var sec: number = Math.floor(second % 60);
		var minStr: string = min < 10 ? ("0" + min) : min.toString();
		var secStr: string = sec < 10 ? ("0" + sec) : sec.toString();
		return (minStr + ":" + secStr);
	}
	/**
	 * 根据时间返回字符串 00:00:00
	 */
	public static formatTime3(second: number): string {
		var day: number = Math.floor(second / 60 / 60) / 24;
		var hour: number = Math.floor(second / 60 / 60) % 24 + day * 24;
		var min: number = Math.floor(second / 60) % 60;
		var sec: number = Math.floor(second % 60);
		var hourStr: string = hour < 10 ? ("0" + hour) : hour.toString();
		var minStr: string = min < 10 ? ("0" + min) : min.toString();
		var secStr: string = sec < 10 ? ("0" + sec) : sec.toString();

		return hourStr + ":" + minStr + ":" + secStr;
	}
	/**
	 * 格式化数据网格列日期 MM-DD JJ:NN
	 */
	public static formatColumnDate(tempDate: Date): string {
		var m: string = ((tempDate.getMonth() + 1 < 10) ? "0" : "") + (tempDate.getMonth() + 1);
		var day: string = ((tempDate.getDate() < 10) ? "0" : "") + tempDate.getDate();
		var rect: string = "";
		rect += m + "-" + day + " ";
		rect += ((tempDate.getHours() < 10) ? "0" : "") + tempDate.getHours();
		rect += ":";
		rect += ((tempDate.getMinutes() < 10) ? "0" : "") + tempDate.getMinutes();
		return rect;
	}
	/**
	 * 
	 * @param date
	 * @return 
	 * 2012/12/12 12:12
	 */
	public static formatDate1(date: Date): string {
		var year: string = date.getFullYear().toString();
		var month: string = ((date.getMonth() + 1 < 10) ? "0" : "") + (date.getMonth() + 1);
		var day: string = ((date.getDate() < 10) ? "0" : "") + date.getDate();
		var hour: string = date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours().toString();
		var min: string = date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes().toString();

		return year + "/" + month + "/" + day + " " + hour + ":" + min;
	}

	/**
	 * 年/月/日（例：2012/12/12）
	 */
	public static formatYMD1(date: Date): string {
		var time: string = date.getFullYear() + "/"
			+ (date.getMonth() + 1) + "/"
			+ date.getDate();
		return time;
	}

	/**
	 * 
	 * @param second
	 * @return [day,hour,min]
	 * 
	 */
	public static formatRemain2(second: number) {
		var day: number = Math.floor(second / 60 / 60 / 24);
		var hour: number = Math.floor(second / 60 / 60) % 24;
		var min: number = Math.floor(second / 60) % 60;
		var sec: number = Math.floor(second % 60);
		return [day, hour, min];
	}

	/**
	 * 获取两个时间之间的相差（天、时、分、秒）
	 * @param time1:Number 时间1(ms)
	 * @param time2:Number 时间2(ms)
	 * @return Array = [天,时,分,秒]
	 */
	public static getTimeDifference(time1: number, time2: number) {
		var res = [0, 0, 0, 0];
		var val: number = time2 - time1;

		res[0] = Math.floor(val / 86400000);
		res[1] = Math.floor(val % 86400000 / 3600000);
		res[2] = Math.floor(val % 86400000 % 3600000 / 60000);
		res[3] = Math.floor(val % 86400000 % 3600000 % 60000 / 1000);

		return res;
	}
}