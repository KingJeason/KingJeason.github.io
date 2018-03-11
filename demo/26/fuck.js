var can;
var ctx;
var bgpic = new Image();
var shippic = new Image();
var deltaTime = 0;
var lastTime = 0;
var ship;

var command = document.getElementById("command");
//取得类为a的所有元素
var a = command.querySelectorAll("a");
var fly =command.querySelectorAll("fly");
var stop =command.querySelectorAll("stop");
var over = command.querySelectorAll("over");
var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var four = document.getElementById("four");
var del = document.getElementById("del");
var del_list = del.getElementsByTagName("input");
var BENZHONG = 20;
var PUTONG = 25;
var FEISU = 30;
var YI = 25;
var ER = 40;
var SAN = 50;
var SPEED_YI = 30;
var SPEED_ER = 60;
var SPEED_SAN = 90; 

document.body.onload = game;
function init(){
    can = document.getElementById("canvas");
    ctx = can.getContext("2d");
	bgpic.src = "img/sky.png"; 
    shippic.src = "img/ship2.jpg"; 
    shippic.width = 20;
    shippic.height = 20;
    ship = new shipObj();
}   
function game() {
    init();
    click();
    gameloop();
}
function gameloop(){
     window.requestAnimationFrame(gameloop);

    var now =  Date.now();
    deltaTime = now - lastTime;
    lastTime =  now;
    if(deltaTime > 40){
        deltaTime = 40;
    }
    drawbackground();
    ship.draw();
    one.innerHTML = ship.power[0];
    two.innerHTML = ship.power[1];
    three.innerHTML = ship.power[2];
    four.innerHTML = ship.power[3];
    //console.log(ship.power[0]);
    //console.log(ship.x[0],ship.y[0]);
    //console.log(ship.live[0]);
   
  
}
function drawbackground(){
   	ctx.drawImage(bgpic,0,0,800,600);
    ctx.strokeStyle='#FF0000';
    ctx.beginPath();
    ctx.arc(400,300,80,0,Math.PI*2,true);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(400,300,130,0,Math.PI*2,true);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(400,300,180,0,Math.PI*2,true);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(400,300,230,0,Math.PI*2,true);
    ctx.closePath();
    ctx.stroke();
    
    
}
function click(){
	command.onclick = function(event) {
		/* Act on the event */
		//console.log(event.target.nodeName == "BUTTON");
		var Ele = event.target,
			classid  = parseInt(Ele.parentNode.firstElementChild.childNodes[0].data[2]);
		if(Ele.nodeName == "BUTTON"){
			//console.log(Ele.childNodes[0].data == "生成");  UTF8
			if(Ele.childNodes[0].data == "生成" && ship.live[classid - 1] == false){
				//console.log("bornborn")
				var str="",
					atr='span[id$="' + classid +'"]',
					t = "";
					st = "";
					console.log(atr);
				for(var i = 0 ; i < del_list.length; i++){
					if(del_list[i].checked){
						str += del_list[i].value;
					}
				}
				str+=":"
				document.querySelector(atr).innerHTML = str;
				t = str.substring(0,2);
				st = str.substring(2,4);
				switch (t) {
					case "笨重":
						ship.leixing[classid-1] = BENZHONG;
						ship.speed[classid-1] =1000/(360/SPEED_YI);
						break;
					case "普通":
						ship.leixing[classid-1] = PUTONG;
						ship.speed[classid-1] = 1000/(360/SPEED_ER);
						break;
					case "飞速":
						ship.leixing[classid-1] = FEISU;
						ship.speed[classid-1] = 1000/(360/SPEED_SAN);
						break;
					default:
						console.log("fuck error");
						break;
				}
								switch (st) {
					case "一号":
						ship.sulv[classid-1] = YI;
						break;
					case "二号":
						ship.sulv[classid-1] = ER;
						break;
					case "三号":
						ship.sulv[classid-1] = SAN;
						break;
					default:
						console.log("fuck error");
						break;
				}
				console.log(ship.speed[classid-1]);
				console.log(ship.leixing[classid-1]);
				console.log(ship.sulv[classid-1]);
				ship.born(classid - 1);
			}else if(Ele.childNodes[0].data == "起飞" && ship.fly[classid -1] == false && ship.live[classid -1] == true){
				ship.run(classid - 1);

			}else if(Ele.childNodes[0].data == "停止"){
				ship.stop(classid -1);
			}else if(Ele.childNodes[0].data == "销毁"){
				ship.over(classid -1);
			}
		}
	}
}