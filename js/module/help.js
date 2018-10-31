//获取当前时间
module.exports.getNowTime=function(){
	function _fn(num){
		if(num<10) return "0"+num;
		return num;
	}
	var date=new Date();
	return date.getFullYear()+"-"+
		_fn((date.getMonth()+1))+"-"+
		_fn(date.getDate())+" "+
		_fn(date.getHours())+":"+
		_fn(date.getMinutes())+":"+
		_fn(date.getSeconds());
}
/*
function getNowTime(){
	var data=new Date();
	return date.getFullYear()+'-'
		+((date.getMonth()+1)).toString().padStart(2,"0")+"-"
		+(date.getDate()).toString().padStart(2,"0")+" "
		+(date.getHours()).toString().padStart(2,"0")+":"
		+(date.getMinutes()).toString().padStart(2,"0")+":"
		+(date.getSeconds()).toString().padStart(2,"0")
		
		//padStart 字符串填充
}
*/
var obj={
	"-1":"网络连接错误",
	"-2":"用户名或密码错误",
	"-3":"用户名重复",
	"1":"成功"
}
module.exports.errorState={
	"userNameOrPassWordErro":"-2"
}
module.exports.sendNewInfo=function(res,ok=-1){
	res.end(JSON.stringify({
		ok,
		msg:obj[ok]
	}))
}
module.exports.sendInfo=function(res,ok,msg="网络连接错误"){
    res.end(JSON.stringify({
        ok,
        msg
    }))
}
module.exports.getIndex = function(arr,value,key="id"){
	var index=-1;
	for(var i=0;i<arr.length;i++){
		if(arr[i][key]==value){
			index=i;
			break;
		}
	}
	return index;
}
module.exports.getIndexByUserName = function(arr,userName){
	var index=-1;
	for(var i=0;i<arr.length;i++){
		if(arr[i].userName==userName){
			index=i;
			break;
		}
	}
	return index;
}

