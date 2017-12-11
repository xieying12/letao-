$(function(){
	// 获取用户信息
	getUserMes();
	// 设置禁用与启用
	$(".list").on('click','button',function(){
		// 获取id和isdelete状态
		var id=$(this).attr('data-id');
		if($(this).hasClass('btn-danger')){
			var isdelete=0;
			$(this).removeClass('btn-danger').addClass('btn-primary');
			$(this).html('启用');

		}else{
			var isdelete=1;
			$(this).removeClass('btn-primary').addClass('btn-danger');
			$(this).html('禁用');
		}
		
		
		setBtn(id,isdelete);
	});
});
//设置分页和获取用户列表
var getUserMes=function(page,pagesize){
	$.ajax({
		url:'/user/queryUser',
		type:'get',
		data:{
			page:page||1,
			pageSize:pagesize||5
		},
		success:function(data){
			// console.log(data);

			var message=template('user-template',data);
			$("tbody").html(message);
			//分页
			$("#page").bootstrapPaginator({
				 bootstrapMajorVersion:1,    //版本
                currentPage:data.page,    //当前页数
                numberOfPages:5,    //最多显示Page页
                totalPages:Math.ceil(data.total/data.size), 
                // console.log(totalPages)
                   //所有数据可以显示的页数
                onPageClicked:function(e,originalEvent,type,page){
                	getUserMes(page);//page 参数标识你点击页数时所在的页数
                	
                    // console.log(e);//page-click事件
                   
                    // console.log(originalEvent);//click事件
                   
                    // console.log(type);//page
                   
                    // console.log(page);//1

                }
			});
		}
	});
};
// 设置按钮的禁用与启用
var setBtn=function(id,isdelete){
	$.ajax({
		url:'/user/updateUser',
		type:'post',
		data:{
			id:id,
			isDelete:isdelete
		},
		success:function(data){
			
		}
	})
}
