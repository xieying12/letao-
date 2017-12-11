$(function(){
  getSecondList();
 
  $('.btn-default').click(function(){   
    getFirstList();
  });

//设置所选择的一级分类
  $(".dropdown-menu").on('click', 'li', function(event) {
     // console.log(1);
     // console.log($(".dropdown-text").html());
     $(".dropdown-text").html($(this).find('a').html());
     // console.log($(this).find('a').attr('data-id'));
     $('[name="categoryId"]').val($(this).find('a').attr('data-id'));
     // console.log($('[name="categoryId"]').val());
  });
//设置图片上传
 initUpload();

 $(".btn-primary").click(function(){
        addSecondList();
});
});
//获取二级分类的列表
var getSecondList=function(page,pagesize){
  $.ajax({
    url:'/category/querySecondCategoryPaging',
    type:'GET',
    data:{
    	page:page||1,
    	pageSize:pagesize||5
    },
    success:function(data){
    	// console.log(data);
    	var list=template("second-template",data);
    	$("tbody").html(list);

    	$("#page").bootstrapPaginator({
				 bootstrapMajorVersion:1,    //版本
                currentPage:data.page,    //当前页数
                numberOfPages:5,    //最多显示Page页
                totalPages:Math.ceil(data.total/data.size),               
                onPageClicked:function(e,originalEvent,type,page){
                	getSecondList(page);//page 参数标识你点击页数时所在的页数
                
                }
		});
    }
  });
};
// 获取一级分类
var getFirstList=function(page,pagesize){
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page:page||1,
            pageSize:pagesize//要获取所有的一级分类 不能设置每页显示内容的多少
        },
        success:function(data){           
            // console.log(data);
            var html=[];
            $.each(data.rows,function(i,item){
                html.push('<li><a data-id='+item.id+' href="javascript:;">'+item.categoryName+'</a></li>')
            });
          
            $('.dropdown-menu').html(html);
        }          
    })
    
};
// 图片上传
var initUpload=function(){
  $('[name="pic1"]').fileupload({
     dataType: 'json',
    done: function (e, data) {
        $('[name="brandLogo"]').val(data.result.picAddr)
        $(".preview").html('<img id="previewimg" width="100" height="100" src="'+data.result.picAddr+'" alt="">');
    }
  });
};
//添加二级分类
var addSecondList=function(){
	$.ajax({
		url: '/category/addSecondCategory',
		type: 'post',		
		data: $('#form').serialize(),
		success:function(data){
			// console.log(data);
            if(data.success==true){
                 $('#modal').modal('hide');
                getSecondList();
            }
		}
	})
	
};

	
