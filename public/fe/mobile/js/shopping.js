$(function(){
	getCartData();
	// 点击删除按钮
	// var id=data.id;
	$(".mui-table-view").on('click','.mui-btn-grey',function(){
		var id=$(this).attr('data-id');
		// console.log(id);
		delData(id);
		getCartData();
	});
	//点击编辑修改尺码和数量
	$(".mui-table-view").on('click','.mui-btn-yellow',function(){
		var id=$(this).attr('data-id');
		console.log(id);
		location.href='../mobile/search/detail.html?id='+id;
		// delData(id);
		// getCartData();
	});
});

//获取购物车的内容
var getCartData=function(){
	$.ajax({
		url:'/cart/queryCart',
		type:'get',
		data:{},
		success:function(data){
			console.log(data);
			// id=data.
			var cartlist=template('cart-template',{list:data});
			$(".mui-table-view").html(cartlist);
		}
	});
};

//发送请求
var delData=function(id){
	$.ajax({
		url:'/cart/deleteCart',
		type:'get',
		data:{id:id},
		success:function(data){

		}
	});
};