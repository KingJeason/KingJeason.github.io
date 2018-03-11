var data = [],
	btn = document.getElementsByTagName("button"),
	main = document.getElementById("main");
	timer = null,
	flag = 0,
	Bfsindex = 0,
	DfsData = [],
	text = document.getElementById("text"),
	dis = document.getElementById("dis"),
	add = document.getElementById("add");
window.onload = function  (argument) {
	// body... 
	btn[0].onclick = function(){
		restart();
		Dfs(main);
		DfsData = data.concat();
		gogogo2(DfsData);
	};
	btn[1].onclick = function(){  //添加
		var node=document.createElement("DIV");
		node.classList.add("box");
		var textnode=document.createTextNode(add.value);
		node.appendChild(textnode);
		var divs = document.getElementsByTagName("div");
		var test = [];
		for(var i = 0,len = divs.length; i < len; i++){
			if(divs[i].style.backgroundColor == "rgb(255, 0, 0)"){
				divs[i].appendChild(node);
				divs[i].lastElementChild.style.backgroundColor = "#fff";
			}
		}
	}
	btn[2].onclick = function(){ //删除
		var divs = document.getElementsByTagName("div");
		for(var i = 0, len = divs.length; i < len; i++){
			if(divs[i].style.backgroundColor == "rgb(255, 0, 0)"){
				divs[i].parentNode.removeChild(divs[i]);
			}
		}
	}
	dis.onclick = function(){
		var divs = document.getElementsByTagName("div"),
			len = event.target.childElementCount,
			child = event.target.firstElementChild;
		if(event.target.style.backgroundColor == "rgb(255, 0, 0)"){

			event.target.style.backgroundColor = "#fff";
		}else{
			event.target.style.backgroundColor = "#FF0000";

		}
		for(var i = 0, len = divs.length; i < len; i++){
			if(event.target != divs[i]){
				divs[i].style.backgroundColor = "#fff";
			}
		}
		//xconsole.log(typeof event.target.firstElementChild.style.display);
		if(event.target.firstElementChild.style.display != "none" && event.target != dis){
				while (len--) {
			// statement
			child.style.display = "none";
			child = child.nextElementSibling;
			}
		}else{
			while(len--){
			child.style.display = "flex";
			child = child.nextElementSibling;
			}
		}
		for(var i = 0, len = divs.length; i < len; i++){
			if(event.target != divs[i]){
				divs[i].style.backgroundColor = "#fff";
			}
		}
		
		eventUtil.stopPropagation(event);
	}
}
function Dfs(Node){
	if(Node !== null){
		data.push(Node);
		Dfs(Node.firstElementChild);
		Dfs(Node.nextElementSibling);
	}
}
function restart(){
	clearInterval(timer);
	flag = 0;
	data = [];
	Bfsindex = 0;
	var divs = document.getElementsByTagName("div");
	for (var i = 0, len = divs.length; i < len; i++) {
		divs[i].style.backgroundColor = "#fff";
		}
}
function gogogo2(arr){ //此题最好用setInteval函数 因为比较好取消函数
	clearInterval(timer);
var len = arr.length, 
	i = 0;
	arr[i].style.backgroundColor = "#445566";
	i++;
	timer = setInterval(function(){

		if(i < len){
			if(arr[i-1].style.backgroundColor == 'rgb(68, 85, 102)'){
				arr[i-1].style.backgroundColor = '#fff';
			}
			arr[i].style.backgroundColor = '#445566';
		}else{
			arr[i-1].style.backgroundColor = "#fff";
			if(flag == 0){
				alert("未找到");
			}
			clearInterval(timer);
		}
		if(arr[i].childNodes[0].data.trim() == text.value){
			flag = 1;
			arr[i].style.backgroundColor ="#f00";
			var Node = arr[i].parentNode,
				len1 = Node.childElementCount,
				child = Node.firstElementChild,
				Node2 = main,
				len2 = Node2.childElementCount,
				child2 = Node2.firstElementChild;
			while(len2--){
				child2.style.display = "flex";
				child2 = child2.nextElementSibling;
			}
			while(len1--){ 
				child.style.display = "flex";
				child = child.nextElementSibling;
			}
			while(Node != main){
				Node.style.display = "flex";
				Node = Node.parentNode;
			}
		}
		i++;
	},100);
}
