$(function(){
	$('[type="button"]').on('click',function(){
		// console.log(1);
		//获取用户名 密码
		var formdata=$('.form').serialize();//表单序列化
		console.log(formdata); 
		logins(formdata);
	});
	                             
});

//发送ajax请求
var logins=function(data){
	var urls=new URLSearchParams(location.search);
	var url=urls.get('result');
	$.ajax({
		
		url:'/user/login',
		type:'post',
		data:data,
		success:function(data){
			console.log(data);
			if(data.error==403){
				mui.toast(data.message);
			}
			if(data.success==true){
				location.href=url||'../mobile/index.html';
			}
		}
	});
}
