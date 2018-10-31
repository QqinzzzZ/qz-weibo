const http=require("http");
const fs=require("fs");
const url=require("url");
const help=require("./module/help");
http.createServer(function(req,res){
	if(req.url==="/favicon.ico")return;//阻止响应
	var pathname=url.parse(req.url).pathname.toLowerCase();//地址，自动转小写
	var query=url.parse(req.url,true).query;//？后边的
	if(pathname=="/addweibo"){
		//定义数据
		var obj={
			id:new Date().getTime(),
			topNum:0,
			downNum:0,
			context:query.context,
			addTimeL:help.getNowTime()
		}

	 //读取这个文件
		fs.readFile("./data.json",function(err,results){

			if(err){
				res.end(query.cb+"("+JSON.stringify({
					ok:-1,
					msg:"网络连接错误1"
				})+")")
			}else{
				//可读取时
//				if(query.context.size<0){
//					res.end(query.cb+"("+JSON.stringify({
//                      ok:-1,
//                      msg:"输入内容！"
//                  })+")")
//				}
				var arr=JSON.parse(results);
				var index=-1;
				for(var i=0;i<arr.length;i++){
					if(arr[i].context==obj.context){
						index=i;
						break
					}
				}
				if(index>-1){
                    res.end(query.cb+"("+JSON.stringify({
                        ok:-1,
                        msg:"请不要输入重复的内容！"
                    })+")")
                }else{//没有重复的啦					
				
				arr.unshift(obj);//开头添加
				fs.writeFile("./data.json",JSON.stringify(arr),function(err){
					if(err){
						res.end(query.cb="("+JSON.stringify({
							ok:-1,
							msg:"网络连接错误2"
						})+")")
					}else{
						res.end(query.cb+"("+JSON.stringify({
							ok:1,
							msg:"成功"
						})+")")
					}
				})

			  }
            }
		})
	}
	else if(pathname=="/getweibo"){
		fs.readFile("./data.json",function(err,results){
			if(err){
				res.end(query.cb+"("+JSON.stringify({
					ok:-1,
					msg:"网络连接错误"
				})+")")
			}else{
				//返回data 文件中的json对象，方便百度模板接收数据
				res.end(query.cb+"("+JSON.stringify({
					ok:1,
					contextList:JSON.parse(results)
				})+")")
			}
		})
	}
	else if(pathname=="/deleteweibo"){
		fs.readFile("./data.json",function(err,results){
			var arr=JSON.parse(results);//数据拿过来
			var index=-1;//初始值
			//找到要删除的id
			for(var i=0;i<arr.length;i++){
				if(arr[i].id==query.id){//id对比
					index=i;//下标赋值
					break;
				}
			}
			if(index>-1){
				arr.splice(index,1);//index是下标
				fs.writeFile("./data.json",JSON.stringify(arr),function(err){
					if(err){
						res.end(query.cb+"("+JSON.stringify({
							ok:-1,
							msg:"网络连接错误"
						})+")")
					}
					else{
						res.end(query.cb+"("+JSON.stringify({
							ok:1,
							msg:"成功"
						})+")")
					}
					
				})
				
			}else{
				res.end(query.cb+"("+JSON.stringify({
					ok:-1,
					msg:"您要删除的数据不存在！"
				})+")")
			}
		})
	}
	else if(pathname=="/upweibo"){
		var id=query.id;//获取id
		var type=query.type;//获取type 1 顶   2 踩
		fs.readFile("./data.json",function(err,results){
			if(err){
				res.end(query.cb+"("+JSON.stringify({
					ok:-1,
					msg:"网络去火星了！"
				})+")")
			}else{
				//找到文件
				var arr=JSON.parse(results);
				var index=-1;//默认值
				for(var i=0;i<arr.length;i++){
					if(arr[i].id==id){
						index=i;
						break;
					}
				}
				if(index>-1){
					if(type==1){
						arr[i].topNum+=1;
					}else{
						arr[i].downNum+=1;
					}
						console.log(arr[i]);
						console.log(arr[i].topNum);
						console.log(arr[i].downNum);
fs.writeFile("./data.json",JSON.stringify(arr),function(err){
				if(err){
					res.end(query.cb+"("+JSON.stringify({
						ok:-1,
						msg:"网络去火星啦"
						
					})+")")
				}else{
					res.end(query.cb+"("+JSON.stringify({
						ok:1,
						msg:"成功啦！"
					})+")")
				}
})
				}
				else{
					//如果下标小于-1
					res.end(query.cb+"("+JSON.stringify({
						ok:-1,
						msg:"这条消息不存在"
					})+")")
				}
			}
		})
	}
	else if(pathname=="/reg"){
		if(query.passWord != query.passWord2){
				res.end(query.cb+"("+JSON.stringify({
					ok:-1,
					msg:"密码不同"
				})+")")
			}
		else{
			fs.readFile("./userList.json",function(err,userList){
				var arr=JSON.parse(userList.toString());
				var index=-1;
				for(var i=0;i<arr.length;i++){
					if(arr[i].userName==query.userName){
						index=i;
						break;
					}
				}
				if(index>-1){
					res.end(query.cb+"("+JSON.stringify({
						ok:-1,
						msg:"用户名已存在"
					})+")")
				}else{
					arr.unshift({
						    id:new Date().getTime(),
	                        userName:query.userName,
	                        passWord:query.passWord,
	                        addTime:help.getNowTime()
					});
	fs.writeFile("./userList.json",JSON.stringify(arr),function(err){
					if(err){
						res.end(query.cb+"("+JSON.stringify({
							ok:-1,
							msg:"网络去火星啦！"
						})+")")
					}
					else{
						res.end(query.cb+"("+JSON.stringify({
							ok:1,
							msg:"成功！"
						})+")")
					   }
					})
				}
		  	})
		}
	}
	else if(pathname=="/login"){
		fs.readFile("./userList.json",function(err,results){
			var arr=JSON.parse(results);
			var index=-1;
			for(var i=0;i<arr.length;i++){
				if(arr[i].userName==query.userName&&arr[i].Password==query.Password){
					index=i;
					break;
				}
			}
			if(index>-1){
				res.end(query.cb+"("+JSON.stringify({
					ok:1,
					msg:"成功"
				})+")")
			}
			else{
				res.end(query.cb+"("+JSON.stringify({
					ok:-1,
					msg:"用户名或密码失败"
				})+")")
				}
		})
	}
	else{
		res.end("404");
	}
	
}).listen(80,function(){
	console.log("开启服务！");
})
