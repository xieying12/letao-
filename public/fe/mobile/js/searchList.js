
$(function(){
	var url=new URLSearchParams(location.search);
	var vals=url.get('key');
	// console.log(vals);
	getSearchProduct(1,10,vals);
	//设置input的内容	
	$('.search-box input').val(vals);
	//点击价格
	var flag=true;
	$(".lt-order [data-type='price']").click(function(){
		// console.log(1);
		$('.lt-order a').removeClass('active');
		$(this).addClass('active');
		//升序
		if(flag==true){
			$(this).find('span').removeClass('fa-angle-up');
			$(this).find('span').addClass('fa-angle-down');
			getSearchProduct(1,10,vals,1);
			flag=false;
		}else{
		//降序
		$(this).find('span').removeClass('fa-angle-down');
		$(this).find('span').addClass('fa-angle-up');
			getSearchProduct(1,10,vals,2);
			flag=true;
		}
		
		
	});
	//点击销量===========================
	$(".lt-order [data-type='num']").click(function(){
		// console.log(1);
		$('.lt-order a').removeClass('active');
		$(this).addClass('active');
		//升序
		if(flag==true){
			$(this).find('span').removeClass('fa-angle-up');
			$(this).find('span').addClass('fa-angle-down');
			getSearchProduct(1,10,vals,null,1);
			flag=false;
		}else{
		//降序
		$(this).find('span').removeClass('fa-angle-down');
		$(this).find('span').addClass('fa-angle-up');
			getSearchProduct(1,10,vals,null,2);
			flag=true;
		}
		
		
	});
	//点击立即购买跳转
	$(".lt-search-result").on('click','button',function(){
		// console.log(1);
		var id=$(this).attr('data-id');
		location.href='./detail.html?id='+id;
	});
});
var getSearchProduct=function(pageNum,pagesize,val,price,num,brandid){
	
	// console.log($('.search-box input').val());
	// $('.search-box input').val(val);
	//发送ajax请求
	$.ajax({
		url: '/product/queryProduct',
		type: 'get',		
		data: {
			page: pageNum||1,
			pageSize:pagesize||10,
			proName:val,
			price:price||'',
			brandId:brandid||'',			
			num:num||''
			
		},
		success:function(data){
			// console.log(data);
			var list=template('template',data);
			$(".lt-search-result").html(list);
		}
	})
	
	
}


