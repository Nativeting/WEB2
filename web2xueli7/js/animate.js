
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
var box=document.getElementById("box");
	var navList=document.getElementById("nav").children;
	var slider =document.getElementById("slider");
	var left=document.getElementById("left");
	var right=document.getElementById("right");
	var index=1;
	var isMoving=false;

	//轮播下一张函数
	function premove(){
		index++;
		navRed();
		animate(slider,{left:-1200*index},function(){
			if(index==6){
				slider.style.left="-1300px";
				index=1;
			}
		});
	}
	function remove(){
		index--;
		navRed();
		animate(slider,{left:-1200*index},function(){
			if(index==0){
				slider.style.left="-6500px";
				index=5;
			}
		});
	}
	var timer=setInterval(premove,3000);//外层时间比动一次时间长
	//鼠标划入清定时器
	box.onmouseover=function(){
		animate(left,{opacity:50})
		animate(right,{opacity:50})
		clearInterval(timer);
	}
	//鼠标划出开定时器
	box.onmouseout=function(){
		animate(left,{opacity:0})
		animate(right,{opacity:0})
		timer=setInterval(premove,3000);
	}
	//点击右箭头让下一张出现
	right.onclick=premove;
	//点击左箭头让前一张出现
	left.onclick=remove;
	//小按钮点击实现
	for(var i=0;i<navList.length;i++){
		navList[i].idx=i;
		navList[i].onclick=function(){
			index=this.idx+1;
			navRed();
			animate(slider,{left:-1200*index});

		}
	}
	//小按钮背景色切换
	function navRed(){
		for(var i=0;i<navList.length;i++){
			navList[i].className="";
		}
		if(index==6){
			navList[0].className="active";
		}else if(index==0){
			navList[4].className="active";
		}else{
			navList[index-1].className="active";
		}
	}
	var attention=document.getElementById("attention");
	var scroll1=document.getElementById("scroll1");
	var tishi=document.getElementById("tishi");
	var l=1;
	function roll(){
		l+=5;
		if(l>1280){
			tishi.style.left="1000px";
			l=1;	
		}
		animate(tishi,{left:970-l});
		
	}
	setInterval(roll,40);