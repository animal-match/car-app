// 时间过滤器
export function timeStampFilter(timeStamp) {
	if(!timeStamp) return '-';
	else {
		const date = new Date(timeStamp*1000);
		const dateNumFun = (num) => num < 10 ? `0${num}` : num
		const [Y,M,D,h,m,s] = [
			date.getFullYear(),
			dateNumFun(date.getMonth() + 1),
			dateNumFun(date.getDate()),
			dateNumFun(date.getHours()),
			dateNumFun(date.getMinutes()),
			dateNumFun(date.getSeconds())
		];
		return `${Y}/${M}/${D}`; //时分秒 ${h}:${m}:${s}
	}
}
export default {
	timeStampFilter
}