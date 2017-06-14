
	function getClass(classname,obj){
		var obj=obj||document;
		if(obj.getElementsByClassName){
			return obj.getElementsByClassName(classname);
		}else{
			var arr=[];
			var all=obj.getElementsByTagName('*');
			for(var i=0;i<all.length;i++){
				if(all[i].className==classname){
					arr.push(all[i]);
				}
			}
			return arr;
		}	
	}
	function $(select,ranger){
		if(typeof(select)=='function'){   //也可以用intanceof
			addEvent(window,'load',select);
			// window.onload=function(){
			// 	select();   //回调函数
			// }
		}else if(typeof(select)=='string'){
			ranger=ranger?ranger:document;
			var first=select.charAt(0);
			if(first=="."){
				return getClass(select.substring(1),ranger);
			}else if(first=='#'){
				return ranger.getElementById(select.substring(1));
			}else if(/^[a-zA-Z][a-zA-Z1-6]{0,7}$/.test(select)){
				return ranger.getElementsByTagName(select);
			}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,7}>$/.test(select)){
				return ranger.createElement(select.slice(1,-1));
			}
		}
	}
// 获取元素(属性或方法的)样式
	function getStyle(obj,attr){
		if(window.getComputedStyle){
			// alert(typeof(attr));   //string
			return getComputedStyle(obj,null)[attr];   
			//输入的width为字符串，不能用对象.属性的方法获取修改
			return obj.currentStyle.attr;
		}
	}
// 获取有意义的子节点
	function getChild(obj,type){
		type=type===undefined?true:type;
		var newarr=[];
		var childs=obj.childNodes;
		if(type){
			for(var i=0;i<childs.length;i++){
				if(childs[i].nodeType==1){
					newarr.push(childs[i]);
				}
			}
			return newarr;
		}else{
			for(var i=0;i<childs.length;i++){
				if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.trim().length>0)){
					newarr.push(childs[i]);
				}
			}
			return newarr;
		}
	}
	// firstChild	
		function firstChild(obj,type){
			type=type===undefined?true:type;
			return getChild(obj,type)[0];
		}
	// lastChild
		function lastChild(obj,type){
			type=type===undefined?true:type;
			var childs=getChild(obj,type);
			return childs[childs.length-1];
		}
	// anychild
		function anyChild(obj,num,type){
			type=type===undefined?true:type;
			var childs=getChild(obj,type);
			if(num<0||num>childs.length-1){
				return;
			}
			return childs[num];
		}
	// getNextEle：获取下一个平行元素节点
		function getNextEle(obj){
			var nextele=obj.nextSibling;
			if(nextele==null){
				return false;
			}
			while(nextele.nodeType!=1){
				nextele=nextele.nextSibling;
				if(nextele==null){
					return false;
				}
			}
			return nextele;
		}
	// insertAfter：指定元素节点后插入另一元素节点
		function insertAfter(obj,ele){
			var next=getNextEle(obj);
			if(next){
				var parent=obj.parentNode;
				parent.insertBefore(ele,next);
			}else{
				parent.appendChild(ele);
			}
		}
// 事件添加与移除
		function addEvent(obj,type,fn){
			if(obj.addEventListener){
				obj.addEventListener(type,fn,false);
			}else{
				obj.attachEvent('on'+type,fn);
			}
		}
		function removeEvent(obj,type,fn){
			if(obj.removeEventListener){
				obj.removeEventListener(type,fn,false);
			}else{
				obj.detachEvent('on'+type,fn);
			}
		}
// 鼠标滚轮事件
	function mouseWheel(obj,upFn,downFn){
		if(document.addEventListener){
			obj.addEventListener('mousewheel',scrollFn,false)
			obj.addEventListener('DOMMouseScroll',scrollFn,false)
		}else if(document.attachEvent){
			document.attachEvent('onmousewheel',scrollFn)
		}
		function scrollFn(e){
			var ev=e||window.event;
			if(ev.preventDefault){
				ev.preventDefault();    //阻止默认浏览器动作(W3C)
			}else{
				ev.returnValue = false;   //IE中阻止函数器默认动作的方式
			}
			var dir=ev.wheelDelta||ev.datail;
			if(dir==-120||dir==3){
				downFn.call(obj);
			}else if(dir==120||dir==-3){
				upFn.call(obj);
			}
		}
	}
// 获取文本内容
	function setText(obj,text){
		if(obj.innerText){
			obj.innerText=text;
		}else{
			obj.textContent=text;
		}
	}

// hover
	// function hover(obj,overfun,outfun){
	//   	if(overfun){
	//    		obj.onmouseover=function  (e) {
	// 		  	if(checkHover(e,obj)){
	// 		     	overfun.call(obj,e);
	// 		  	}
	//     	}
	//   	}
	//   	if(outfun){
	//     	obj.onmouseout=function  (e) {
	// 		  	if(checkHover(e,obj)){
	// 		     	outfun.call(obj,e);
	// 		  	}
	//     	}
	//   	}
	// ｝