/**
 * Created by Administrator on 2016/10/12.
 */
var dustObj = function () {
    this.x = [];
    this.y = [];
    this.amp = [];
    this.No = [];
    this.alpha = 0;
};
dustObj.prototype.num = 30;
dustObj.prototype.init = function () {
    for(var i = 0; i < this. num; i++){
        this.x[i] = Math.random() * can2Width;
        this.y[i] = Math.random() * can2Height;
        this.amp[i] = 20 + Math.random() * 15;
        this.No[i] = Math.floor(Math.random() * 7) //[0,7) ==> 0, 1, 2, 3, 4, 5, 6
    }
    this.alpha = 0;
}
dustObj.prototype.draw = function () {
    this.alpha += deltaTime * 0.001;
    var l = Math.sin(this.alpha);
    for(var i = 0; i < this.num; i++){
        var no = this.No[i]
        ctx1.drawImage(dustpic[no],this.x[i] + this.amp[i] * l,this.y[i])
    }
}