$(function(){
	getUser();
	// 点击退出按钮退出登录
	$(".logout-btn").on("click",function(){
		// console.log(1);
		location.href='login.html';
	});
});
var getUser=function(){
	$.ajax({
		url:'/user/queryUserMessage',
		type:'get',
		data:{},
		success:function(data){
			// console.log(data);
			if(data.error==400){
				//未登录
				location.href='../login.html?result='+location.href;
			}else{
				var list=template('user-template',data);
				$(".title").html(list);
			}
			
		}
	});
}
