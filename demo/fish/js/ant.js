/**
 * Created by Administrator on 2016/10/7.
 */
var aneObj = function(){
    //start point , control point, end point(sin);
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.amp = []; //振幅
    this.alpha = 0;

}
aneObj.prototype.num = 50;
aneObj.prototype.init = function () {

    for(var i = 0; i < this.num; i++){
        this.rootx[i] = i * 16 + Math.random() * 20; //[0,1)
        this.headx[i] = this.rootx[i];
        this.heady[i] = can2Height - 230 + Math.random() * 50;
        this.amp[i] = Math.random() * 70 ;//[0, 50);
    }
    console.log("a");
}
aneObj.prototype.draw = function () {
    this.alpha += deltaTime * 0.001;
    var l = Math.sin(this.alpha); [ -1, 1];
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "#3b154e";
    for(var i = 0; i < this.num; i++){
        //beginPath, movaTo, LineTo, stroke, strokeStyle, lineWidth, LineCap, glo
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], can2Height);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i], can2Height - 100, this.headx[i], this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore(); // 在 save 和restore 之间 放代码
}