var myScroll=new IScroll("#wrapper");

// 获取后台数据
var getFirstData=function(){
	$.ajax({
		url:'/category/queryTopCategory',
		type:'get',
		data:{},
		success:function(data){			
			var firstData=template('template',data);
			$("#segmentedControls").html(firstData);
			var firstId=data.rows[0].id;
			getSecondData(firstId);
		}

	});
}
getFirstData();

// 获取二级数据
var getSecondData=function(id){
	$.ajax({
		type:'get',
		data:{id:id},
		url:'/category/querySecondCategory',
		success:function(data){
			console.log(data.rows.length);
			var secondData=template('second-template',data);
			$(".mui-control-content").html(secondData);
			
		}

	});
}

//获取a标签 设置点击事件
$("#segmentedControls").on('click', 'a', function() {
	var firstId=$(this).attr('data-id');
	// console.log(rows.length);
	getSecondData(firstId);
});
