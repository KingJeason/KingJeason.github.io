/**
 * Created by Administrator on 2016/10/3.
 */
var can1;
var can2;
var ctx1;
var ctx2;
var bgpic = new Image();
var can2Width;
var can2Height;
var ane;
var fruit;
var deltaTime = 0;
var lastTime = 0;
document.body.onload = game;
var mom;
var baby;
var mx;
var my;
var babyTail = [];
var babyEye = [];
var babyBody = [];
var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlu = [];
var data;
var wave;
var halo;
var dust;
var dustpic = [];
function game() {
    init();
    gameloop();
}
function init() {
    //获得canvas context
    can1 = document.getElementById("canvas1");//fish,dust,UI,cirle
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2");//bg,fruit, ane
    ctx2 = can2.getContext("2d");
    can1.addEventListener('mousemove',onMouseMove,false);
    bgpic.src = "./src/background.jpg";
    can2Width = can1.width;
    can2Height = can1.height;
    ane = new aneObj();
    ane.init();
    fruit = new fruitObj();
    fruit.init();
    mom = new momObj();
    mom.init();
    baby  = new babyObj();
    baby.init();
    mx = can2Width * 0.5;
    my = can2Height * 0.5;
    wave = new waveObj();
    wave.init();
    halo = new haloObj();
    halo.init();
    dust = new dustObj();
    dust.init();
    for(var i = 0; i < 7; i++){
        dustpic[i] = new Image();
        dustpic[i].src = "./src/dust" + i + ".png";
    }
    for(var i = 0; i < 8; i++){
        babyTail[i] = new Image();
        babyTail[i].src = "./src/babyTail" + i + ".png";
    }
    for(var i = 0; i < 2; i++){
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
    }
    for(var i = 0; i < 20; i++){
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade" + i + ".png";
    }
    for(var i = 0; i < 8; i++){
        momTail[i] = new Image();
        momTail[i].src = "./src/bigTail" + i +".png";
    }
    for(var i = 0; i < 2; i++){
        momEye[i] = new Image();
        momEye[i].src = "./src/bigEye" + i + ".png";
    }
    data = new dataObj();
    for(var i = 0; i < 8; i++){
        momBodyOra[i] = new Image();
        momBodyBlu[i] = new Image();
        momBodyOra[i].src = "./src/bigSwim" + i + ".png";
        momBodyBlu[i].src = "./src/bigSwimBlue" + i + ".png";
    }
    ctx1.font = "30px Verdana";
    ctx1.textAlign = "center";



}
function gameloop() {
    window.requestAnimationFrame(gameloop);
    var now =  Date.now();
    deltaTime = now - lastTime;
    lastTime =  now;
    if(deltaTime > 40){
        deltaTime = 40;
    }
    //console.log(deltaTime);
    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0,0,can2Width,can2Height);
    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}
function onMouseMove(e) {
    if(!data.gameOver){
        if(e.offsetX || e.layerX){
            mx = e.offsetX == undefined ? e.layerX : e.offsetX;
            my = e.offsetY == undefined ? e.layerY : e.offsetY;
        }
    }

}