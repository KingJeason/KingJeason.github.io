/**
 * Created by Administrator on 2016/10/10.
 */
var momObj = function () {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.bigTailTimer = 0;
    this.bigTailCount = 0;
    this.bigEyeTimer = 0;
    this.bigEyeCount = 0;
    this.bigEyeInterval = 1000;
    this.momBodyCount = 0;
}
momObj.prototype.init = function(){
    this.x = can2Width * 0.5;
    this.y = can2Height * 0.5;
    this.angle = 0;
}
momObj.prototype.draw = function () {
    //lerp x,y
    this.x = lerpDistance(mx, this.x, 0.95);
    this.y = lerpDistance(my, this.y, 0.95);
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;// -pai pai
    this.angle = lerpAngle(beta,this.angle,0.6);
    //big Tail
    this.bigTailTimer += deltaTime;
    if(this.bigTailTimer > 50){
        this.bigTailCount = (this.bigTailCount + 1) % 8;
        this.bigTailTimer %= 50;
    }
    //big Eye
    this.bigEyeTimer += deltaTime;
    if(this.bigEyeTimer > this.bigEyeInterval){
        this.bigEyeCount = (this.bigEyeCount + 1) % 2;
        this.bigEyeTimer %= this.bigEyeInterval;

        if(this.bigEyeCount == 0){
            this.bigEyeInterval = Math.random() * 1500 + 2000;
        }else{
            this.bigEyeInterval = 200;
        }
    }
    //big body
    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    var momBodyCount = this.momBodyCount;
    if(data.double == 1){
        ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width * 0.5,-momBodyOra[momBodyCount].height * 0.5);
    }else{
        ctx1.drawImage(momBodyBlu[momBodyCount],-momBodyBlu[momBodyCount].width * 0.5,-momBodyBlu[momBodyCount].height * 0.5);
    }
    var bigTailCount = this.bigTailCount;
    ctx1.drawImage(momTail[bigTailCount],-momTail[bigTailCount].width * 0.5 + 30,-momTail[bigTailCount].height * 0.5);
    var bigEyecount = this.bigEyeCount;
    ctx1.drawImage(momEye[bigEyecount],-momEye[bigEyecount].width * 0.5 ,-momEye[bigEyecount].height * 0.5);
    ctx1.restore();
}