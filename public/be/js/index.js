$(function(){
	$(".btn-primary").click(function(){
		logout();
		// console.log(1);
	});

});
function logout(){
	$.ajax({
		url:'/employee/employeeLogout',
		type:'get',
		data:null,
		success:function(data){
			// console.log(data);
			if(data.success==true){
				location.href="./login.html";
			}
		}
	});
}
