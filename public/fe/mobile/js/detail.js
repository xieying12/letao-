$(function(){
	var url=new URLSearchParams(location.search);
	var id=url.get('id');
	console.log(id);
	getSearchDetail(id);
	//设置尺码的点击事件 改变样式 获取当前值
	$('.mui-content').on('click','span',function(){
		$('.product-size span').removeClass('active');
		$(this).addClass('active');
	});

	//获取产品数量的方法
	
	// 添加购物车之前获取参数  设置当添加购物车按钮点击的时候
	$('.add-cart').on('click',function(){
		// console.log(1);
		// 获取产品的id
		var productid=id;
		//获取产品的size'
		var size=$('.mui-content span.active').html();
		console.log(size);
		// 获取产品的num
		var num=mui('.mui-numbox').numbox().getValue();
		console.log(num);
		if(!productid){
			mui.toast("请选择商品");
			return false;

		}
		if(!size){
			mui.toast('请选择尺码');
			return false;
		}
		if(num<=0){
			mui.toast('请选择数量');
			return false;
		}
		addCart(productid,size,num);

	});
	//点击购物车小图标
	$('.fa-shopping-cart').on('click',function(){
		console.log(1);
		// 获取产品的id
		var productid=id;
		//获取产品的size'
		var size=$('.mui-content span.active').html();
		// 获取产品的num
		var num=mui('.mui-numbox').numbox().getValue();
		// console.log(num);
		if(!productid){
			mui.toast("请选择商品");
			return false;

		}
		if(!size){
			mui.toast('请选择尺码');
			return false;
		}
		if(num<=0){
			mui.toast('请选择数量');
			return false;
		}
		addCart(productid,size,num);

	});
	// 设置当前页面的下拉效果

});

// 商品详情
var getSearchDetail=function(id){
	$.ajax({
		url:'/product/queryProductDetail',
		type:'get',
		data:{
			id:id
		},
		success:function(data){
			// console.log(data);
			var detailData=template('detail-template',data);
			$(".mui-content").html(detailData);
			var size=data.size;
			// console.log(size);
			size=size.split('-');
			var start=size[0];
			var end=size[1];
			// console.log(start,end);
			var detailSize={
				startSize:start,
				endSize:end
			};
			// console.log(detailSize);
			var sizeData=template('size-template',detailSize);
			$(".product-size").append(sizeData);
			 // 轮播图
		      var gallery = mui('.mui-slider');
		      gallery.slider({
		        interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
		      });
		}


	});
};

// 添加到购物车
var addCart=function(productid,size,num){
	$.ajax({
		url:'/cart/addCart',
		type:'post',
		data:{
			productId:productid,
			size:size,
			num:num
		},
		datatype:'json',
		success:function(data){
			console.log(data);
			if(data.error==400){
				location.href='../login.html?result='+location.href;
			}
			if(data.success==true){
				location.href='../shopping.html?result='+location.href;
			}
			mui('.mui-numbox').numbox();
		}

	});


}
