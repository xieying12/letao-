var nav=document.querySelector('nav');
	
	var aObj=nav.querySelectorAll('a');
	// console.log(aObj.length);
	for(var i=0;i<aObj.length;i++){
		aObj[i].addEventListener('tap',function(){
			// console.log(this);
			window.location.href=this.href;

		});
	}
mui('.mui-scroll-wrapper').scroll({
	scrollY: true, //是否竖向滚动
  scrollX: false, //是否横向滚动
  startX: 0, //初始化时滚动至x
  startY: 0, //初始化时滚动至y
  indicators: true, //是否显示滚动条
  deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
  bounce: true //是否启用回弹
});