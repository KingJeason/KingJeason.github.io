/**
 * Created by Administrator on 2016/10/10.
 */
var babyObj = function () {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.babyTailTimer = 0;
    this.babyTailCount = 0;
    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;
    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
};
babyObj.prototype.init = function(){
    this.x = can2Width * 0.5 -50;
    this.y = can2Height * 0.5 +50;
    this.angle = 0;
};
babyObj.prototype.draw = function () {
    this.x = lerpDistance(mom.x, this.x, 0.98);
    this.y = lerpDistance(mom.y, this.y, 0.98);
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;// -pai pai
    this.angle = lerpAngle(beta,this.angle,0.6);
    //baby tail
    this.babyTailTimer += deltaTime;
    if(this.babyTailTimer > 50){
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 50;
    }
    //baby eye
    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer > this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;

        if(this.babyEyeCount == 0){
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        }else{
            this.babyEyeInterval = 200;
        }
    }
    //baby body
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 300){
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 300;
        if(this.babyBodyCount > 19){
            this.babyBodyCount = 19;
            //game over
            data.gameOver = true;
        }
    }
    ctx1.save();
    ctx1.translate(this.x,this.y)
    ctx1.rotate(this.angle);
    var babyTailCount =this.babyTailCount;
    ctx1.drawImage(babyTail[0],-babyTail[0].width * 0.5 + 25,-babyTail[0].height * 0.5);//缺少资源
    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width * 0.5,-babyBody[babyBodyCount].height * 0.5);
    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width * 0.5,-babyEye[babyEyeCount].height * 0.5);
    ctx1.restore();
};