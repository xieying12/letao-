var liObj=document.getElementById('list');
			var aObj=liObj.children('a');
			for(var i=0;i<aObj.length;i++){
				aObj[i].addEventListener('tap', function(){
					window.location.href=this.href;
				});
			}