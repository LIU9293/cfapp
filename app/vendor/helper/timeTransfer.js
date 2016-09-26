export const millseconds2DateDiff = (input) => {
  var msecStr = input.toString().replace(/\/Date\(([-]?\d+)\)\//gi, "$1"); // => '1419492640000' ：通过正则替换，获取毫秒字符串
  var msesInt = Number.parseInt(msecStr); // 毫秒字符串转换成数值
  var dt = new Date(); // 初始化Date对象
  var MinDiff = Math.trunc((dt.getTime() - msesInt)/(1000 * 60));//计算到分钟
  if(MinDiff>(30 * 24 * 60)){
    var MonthDiff = Math.trunc(MinDiff/(30 * 24 * 60));
    var DIFF = MonthDiff + '个月前';
  } else if (MinDiff>(24 * 60)){
    var DayDiff = Math.trunc(MinDiff/(24 * 60));
    var DIFF = DayDiff + '天前';
  } else if(MinDiff > 60){
    var Hour = Math.trunc(MinDiff/60);
    var DIFF = Hour + '小时前';
  }else if(MinDiff > 5){
    var DIFF = MinDiff + '分钟前';
  }else {
    var DIFF = '刚刚';
  }
  return DIFF
}

export const dateTime2DateDiff = (input) => {
  input = new Date(input);
  input = input.getTime();
  var msecStr = input.toString().replace(/\/Date\(([-]?\d+)\)\//gi, "$1"); // => '1419492640000' ：通过正则替换，获取毫秒字符串
  var msesInt = Number.parseInt(msecStr); // 毫秒字符串转换成数值
  var dt = new Date(); // 初始化Date对象
  var HourDiff = Math.trunc((dt.getTime() - msesInt)/(1000 * 60));
  if(HourDiff>(30 * 24 * 60)){
    var MonthDiff = Math.trunc(HourDiff/(30 * 24 * 60));
    var DIFF = MonthDiff + '个月前';
  } else if (HourDiff>(24 * 60)){
    var DayDiff = Math.trunc(HourDiff/(24 * 60));
    var DIFF = DayDiff + '天前';
  } else if(HourDiff > 60){
    var Hour = Math.trunc(HourDiff/(24 * 60));
    var DIFF = Hour + '小时前'
  }else if(HourDiff > 5){
    var DIFF = HourDiff + '分钟前'
  }else {
    var DIFF = '刚刚';
  }
  return DIFF
}
