$(function(){
  getFirstList();
  	// 验证是否为空
  	$('#form').bootstrapValidator({
    // 反馈图标
    // 有出错图
    // 有验证通过图
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // fields 字段 -- 就是input的name属性的值 就是字段
    fields: {
      // 这是字段名称
      categoryName: {
        // 校验器(校验规则)
        validators: {
          // 不能为空
          notEmpty: {
            message: '分类名称不能为空'
          }
        }
      }
    }
  })
    // 这是当表单校验成功过后 执行的方法
    .on('success.form.bv', function (e) {
      // Prevent form submission --阻止默认的submit类型的按钮自动提交
      e.preventDefault();

      // 这个校验插件所获得的插件起作用的那个目标元素--form标签
      var $form = $(e.target);
      console.log($form);
      // Get the BootstrapValidator instance
      var bv = $form.data('bootstrapValidator');

      // Use Ajax to submit form data
      // $.get(提交地址,提交数据,success成功回调,dataType)
      // $.post()和$.get一摸一样 是$.ajax()的二次封装
      //  在这里我们可以书写ajax请求 当请求成功收
     
	   addFirstList($form.serialize()); 
    });
  
});
//获取一级分类列表
var getFirstList=function(page,pagesize){
	$.ajax({
		url:'/category/queryTopCategoryPaging',
		type:'get',
		data:{
			page:page||1,
			pageSize:pagesize||5
		},
		success:function(data){
			// console.log(data);
			var list=template("first-template",data);
			$('tbody').html(list);
			$("#page").bootstrapPaginator({
				 bootstrapMajorVersion:1,    //版本
                currentPage:data.page,    //当前页数
                numberOfPages:5,    //最多显示Page页
                totalPages:Math.ceil(data.total/data.size), 
                // console.log(totalPages)
                   //所有数据可以显示的页数
                onPageClicked:function(e,originalEvent,type,page){
                	getFirstList(page);//page 参数标识你点击页数时所在的页数
                	
                    // console.log(e);//page-click事件
                   
                    // console.log(originalEvent);//click事件
                   
                    // console.log(type);//page
                   
                    // console.log(page);//1

                }
			});
		}
	});
}
// 点击添加分类按钮
var addFirstList=function(data){
	 $.ajax({
			url:'/category/addTopCategory',
			type:'post',
			data:data,
			success:function(data){
				// console.log(data);
        if(data.success==true){
          // 模态框隐藏
          $('#modal').modal('hide')
          getFirstList();
        }
			}
		});
}