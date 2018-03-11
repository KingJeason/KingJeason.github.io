/**
 * Created by Administrator on 2016/10/7.
 */
var fruitObj = function () {
    this.alive = []; //bool
    this.x = [];
    this.y = [];
    this.l = [];
    this.aneNo = [];
    this.xspd = [];
    this.yspd = [];
    this.fruitType = [];
    this.orange = new Image();
    this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function () {
    for(var i = 0; i < this.num; i++){
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.aneNo[i] = 0;
        this.xspd[i] = Math.random() * 0.01 + 0.1 //[0.005,0.1)
        this.yspd[i] = Math.random() * 0.1 + 0.01 //[0.01,0.21);
    }
    this.orange.src = "./src/fruit.png";
    this.blue.src = "./src/blue.png";
    console.log("b");
}
fruitObj.prototype.draw = function () {
    for(var i = 0; i < this.num; i++){
        //draw
        //find an ane, graw,\
        if(this.alive[i]){
            if(this.fruitType[i] === "blue"){
                var pic = this.blue;
            }
            if(this.fruitType[i] === "orange"){
                var pic = this.orange;
            }
            if(this.l[i] < 14){
                var No = this.aneNo[i];
                this.x[i] = ane.headx[No];
                this.y[i] = ane.heady[No];
                this.l[i] += this.xspd[i]  * 2;
            }
            else{
                this.y[i] -= this.yspd[i] * 10;
            }
            ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i]- this.l[i] * 0.5, this.l[i], this.l[i]);
        }
        if(this.y[i] < 10){
            this.alive[i] = false;
        }
    }
}
fruitObj.prototype.born = function (i) {
    this.aneNo[i] = Math.floor(Math.random() * ane.num)
    this.l[i] = 0;
    this.alive[i] = true;
    var ran = Math.random();
    if(ran < 0.2){
        this.fruitType[i] = "blue"; //orange, blue;
    }else{
        this.fruitType[i] = "orange";
    }

}
fruitObj.prototype.dead = function (i) {
    this.alive[i] = false;

}
/*
fruitObj.prototype.update = function () {
    var num = 0;
    for(var i = 0; i < this.num; i++){
        if(this.alive[i]){
            num++;
        }
    }
}*/
function fruitMonitor() {
    var num = 0;
    for(var i = 0; i < fruit.num; i++){
        if(fruit.alive[i]){
            num++;
        }
    }
    if(num < 15){
        sendFruit();
        return;
    }
}
function sendFruit() {
    for(var i = 0; i < fruit.num; i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}
