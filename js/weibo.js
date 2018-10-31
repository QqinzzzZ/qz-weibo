//该隐藏隐藏，该显示显示。
//占卜：要将用户的名字放到localStorage.userName当中
var login=document.querySelector("#login");//登陆
var reg=document.querySelector("#reg");//注册
var wrap=document.querySelector(".jyArea");//微博留言板
var context=document.querySelector("#tijiaoText");//微博输入框
var wbtn=document.querySelector(".inputs");//发布按钮
var commentOn=document.querySelector(".commentOn");//已留言
var regUserName=reg.querySelector("#regUserName");//注册名字
var regPassWord=reg.querySelector("#regPassWord");//注册密码
var regPassWord2=reg.querySelector("#regPassWord2");//注册密码2
var regBtn=reg.querySelector("#regBtn");//注册按钮
var loginUserName=login.querySelector("#loginUserName");//登陆名字
var loginPassWord=login.querySelector("#loginPassWord");//登陆密码
var loginBtn=login.querySelector("#loginBtn");//登陆按钮
init();
//注册的函数
regBtn.onclick=function(){
	var script=document.createElement("script");
	script.src="http://127.0.0.1/reg?cb=regBtnCb&userName="+regUserName.value+"&passWord="+regPassWord.value+"&passWord2="+regPassWord2.value;
	document.body.appendChild(script);
	document.body.removeChild(script);
}
function regBtnCb(data){
	if(data.ok==1){
		alert("成功！")
		gologin();
	}
	else{
		alert(data.msg);
	}
}

loginBtn.onclick=function(){
	var script=document.createElement("script");
	script.src="http://127.0.0.1/login?userName="+loginUserName.value+"&passWord="+loginPassWord.value+"&cb=loginFn";
	document.body.appendChild(script);
	document.body.removeChild(script);
}
//登陆的函数
function loginFn(data){
	if(data.ok==1){
		localStorage.userName=loginUserName.value;
		init();
	}
	else{
		alert(data.msg);
	}
}
function goReg(){
	login.style.display="none";
	reg.style.display="block";
}
function gologin(){
	login.style.display="block";
	reg.style.display="none";
}
function outLogin(){
	localStorage.removeItem("userName");
	init();
}
function init(){
	wrap.style.display=login.style.display=reg.style.display="none";
	if(localStorage.userName){
		wrap.style.display="block";
		document.querySelector(".takeComment h3").innerHTML="欢迎"+localStorage.userName+"的到来！";
		getWeibo();
	}else{
		login.style.display="block";
	}
}

wbtn.onclick=function(){
	var script=document.createElement("script");
	script.src="http://127.0.0.1/addWeibo?cb=addWeibo&context="+context.value;
	document.body.appendChild(script);
	document.body.removeChild(script);
}

function addWeibo(data){
	if(data.ok==1){
		alert("成功！")
		context.value="";
		getWeibo();
	}
	else{
		alert(data.msg);
	}
}

function getWeibo(){
	var script=document.createElement("script");
	script.src="http://127.0.0.1/getWeibo?cb=getWeiboCb";
	document.body.appendChild(script);
	document.body.removeChild(script);
}
function getWeiboCb(data){
	if(data.ok==1){
        commentOn.innerHTML=baidu.template("tp",data);
 	}else{
		alert(data.msg);
	}
}

function deleteWeibo(id){
	var script=document.createElement("script");
	script.src="http://127.0.0.1/deleteWeibo?cb=deleteWeiboFn&id="+id;
	document.body.appendChild(script);
	document.body.removeChild(script);
}
function deleteWeiboFn(obj){
	if(obj.ok==1){
		getWeibo();
	}else{
		alert(obj.msg);
	}
}
function upWeibo(id,type){
	var script=document.createElement("script");
	script.src="http://127.0.0.1/upWeibo?cb=upWeiboCb&id="+id+"&type="+type;
	document.body.appendChild(script);
	document.body.removeChild(script);
}
function upWeiboCb(obj){
	if(obj.ok==1){
		getWeibo();
	}else{
		alert(obj.msg);
	}
}
