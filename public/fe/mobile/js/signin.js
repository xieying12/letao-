$(function(){
	
	document.getElementsByClassName('re')[0].onclick=function(){
		console.log(this.checked);
		if(this.checked==true){
			// alert('请选择是否同意协议')
			// return;
			// 设置按钮的点击事件
	$(".mui-btn").on('click',function(){
		var data=$(".form").serialize();
		getData(data);
	});
		}

	}
	
	$(".getVc").on('click',function(){
		
		getCode();
	});

	// document.querySelector('re').onclick=function(){
	// 	console.log(this.checked);
	// }
	// $('[name="checkbox"]').on('click',function(){
	
	// 	// $(this:checked)
	// 	if($(this.checked)){
	// 			mui.toast('请同意协议');
	// 			console.log(1);
	// 		}
	// 	// console.log(1);
	// 	// getCode();
	// });

});
 console.log($('.re'));
	 if($('.re')[0].checked==true){
	 	console.log(1);
	 }else{
	 	console.log(2);
	 }

var getData=function(data){
	$.ajax({
		url:'/user/register',
		type:'post',
		data:data,
		beforeSend:function(){
			//判断手机号码
			var reg=/^1[34578]\d{9}$/;
			if(!reg.test($("[name='mobile']").val())){
				mui.toast('请输入手机号');
				return false;
			}
			//判断密码			
			if($("[name='password']").val()==''){
				mui.toast('请输入密码');
				return false;
			}
			//再次判断密码			
			if($("[name='repassword']").val()!=$("[name='password']").val()){
				mui.toast('两次密码不一样');
				return false;
			}
			if($("[name='vCode']").val()==''){
				mui.toast('请输入验证码');
				return false;
			}
			if($('[name="checkbox"]')[0].checked){
				console.log(1);
				mui.toast('请同意协议');
				return false;
			}


		},
		success:function(data){
			console.log(data);
			if(data.success==true){
				location.href='../mobile/index.html';
			}
		}

	});
};
var getCode = function(){
  $.ajax({
    type: 'get',
    url: '/user/vCode',
    data:null,
    success:function(data){
      console.log(data);
    }
  })
}