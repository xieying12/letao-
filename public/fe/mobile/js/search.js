$(function(){
	getHistoryList();
	// 获取value值
	// var value='';
	$('.search-box span').on('click',function(){
	// cosnole.log()	
		setData($('.search-box input').val());

		// 页面跳转到指定的
		location.href='../search/searchList.html?key='+$('.search-box input').val();
		$('.search-box input').val('');
	});


	//点击历史记录 把内容当成搜索词
	$('.history-list').on('click','.mui-pull-left',function(){
		location.href='../search/searchList.html?key='+$(this).html();

	});
	//点击×删除历史记录
	$('.datalist i.mui-pull-right').on('click',function(){
		// console.log(1);
		delData($(this).siblings('span').html());
		getHistoryList();
	});
	//清空历史记录
	$("history-list .clear").on('click',function(){
		console.log(2);
		localStorage.removeItem('ahistory');
	});
});





// 获取本地存储
var getData=function(){
	//返回是字符串要转换成json
	return JSON.parse(localStorage.getItem('ahistory')||'[]');
}
//设置历史记录
var setData=function(value){
	var arr=getData();
	// console.log(arr);
	//如果本地没有数据 直接存储
	$.each(arr,function(i,ele){
		//如果有 则删除相同的数据
		if(value==ele){
			arr.splice(i,1);
		}
	});
	arr.push(value);

	localStorage.setItem('ahistory',JSON.stringify(arr));
}



// delData();





// 获取历史记录
var getHistoryList=function(){
   var dataList={
   	ld:getData()
   };
   var list=template('template',dataList);
   $(".history-list").html(list);
   // console.log(dataList);
   return dataList;
};
// var g=getHistoryList();
// console.log(g.ld);



//删除历史记录
var delData=function(value){
	//获取到要删除的数据
	var arr=getData();
	// 删除他
	$.each(arr,function(i,ele){
		if(ele==value){
			arr.splice(i,1);
		}
		
	});	
	// 在把剩余的放回数组中
	window.localStorage.setItem('ahistory',JSON.stringify(arr));
}