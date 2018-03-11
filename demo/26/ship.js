var shipObj = function(){
	this.x = [470,520,570,620];
	this.y = [290,290,290,290];
	this.live = [false,false,false,false];
	this.r = [80,130,180,230];
	this.fly = [false,false,false,false];
	this.timer = [0,0,0,0];
	this.power = [100,100,100,100];
	this.gay = [0,0,0,0];
	this.leixing = [null,null,null,null];
	this.sulv = [null,null,null,null];
	this.speed = [null,null,null,null];
}
shipObj.prototype.init = function(){
	this.x = [470,520,570,620];
	this.y = [290,290,290,290];
}
shipObj.prototype.born = function(x){
	this.live[x] = true;
	console.log(this.live);
	console.log(this.x[0]);
	console.log(this.y[0]);

}
shipObj.prototype.run = function(x){
	var that = this,
		num  = this.xiangxian(this.x[x],this.y[x],x);
		that.fly[x] = true;
		clearInterval(that.timer[x]);
	var	time = setInterval(function(){ 
			clearInterval(that.gay[x]);
			that.power[x] -= that.leixing[x]/(1000/that.speed[x]);
			if(that.power[x] <=0){
				clearInterval(that.gay[x]);
				that.fly[x] = false;
				var gay = setInterval(function(){
				that.power[x] += that.sulv[x] / 10;
				console.log("x"+x+": "+that.power[x]);
				if(that.power[x] >= 100){
					that.power[x] = 100;
					clearInterval(gay);
					}
				},100);
				that.gay[x] = gay;
				clearInterval(time);
				return;
			}
		if(that.live[x] == false){
			that.x[x] = 400 + that.r[x] - 10;
			that.y[x] = 300 - 10;
			clearInterval(time);
			return;
		}
		num++;
		//console.log(x +":"+num);
		var a = Math.sin(num * Math.PI/180) * that.r[x]; //y坐标
		var b = Math.cos(num * Math.PI/180) * that.r[x]; // x坐标
		//console.log(a,b);
		that.x[x] = 390 + b;
		that.y[x] = 290 + a;
		if(num == 360){
			num = 0;
		}
		
	},that.speed[x])
	that.timer[x] = time;
	
}

shipObj.prototype.stop = function(x){
	this.fly[x] = false;
	clearInterval(this.timer[x]);
}
shipObj.prototype.over = function(x){
	this.live[x] = false;
	this.fly[x] = false;
	/*console.log("over:" + this.x[0]);
	console.log("over:" + this.y[0]);*/
	
}
shipObj.prototype.draw = function(){
	// body... 
	//console.log(111);
	for(var i = 0; i < 4; i++){
		if(this.live[i] == true){
			ctx.drawImage(shippic,this.x[i],this.y[i],20,20);
		}
	}
}
shipObj.prototype.xiangxian=function(x,y,i){
	var num;
	if(x > 390 && y >= 290){
		num = Math.floor(Math.asin((y-290)/this.r[i])*180 /Math.PI);
	}
	if(x <= 390 && y > 290){
		num = 180 -(Math.floor(Math.asin((y-290)/this.r[i])*180 /Math.PI));
	}
	if(x < 390 && y <= 290){
		num = 180 +(Math.floor(Math.asin((290-y)/this.r[i])*180 /Math.PI));
	}
	if(x >=390 && y < 290){
		num = 360 -(Math.floor(Math.asin((290-y)/this.r[i])*180 /Math.PI));
	}
	return num;
}