/**
 * Created by Administrator on 2016/10/10.
 */
function momFruitsCollision() {
    if(!data.gameOver){
        for(var i = 0; i < fruit.num; i++){
            if(fruit.alive[i]){
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y)//俩点距离的平方
                if(l < 900){
                    fruit.dead(i);
                    data.fruitNum++;
                    mom.momBodyCount++;
                    if(mom.momBodyCount > 7){
                        mom.momBodyCount = 7;
                    }
                    if(fruit.fruitType[i] == "blue"){
                        data.double = 2;
                    }
                    wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }
    }


}
//mom baby collision
function  momBabyCollision() {
    if(data.fruitNum > 0 && !data.gameOver){
        var l = calLength2(mom.x, mom.y, baby.x, baby.y);
        if(l < 900){
            //baby recover   小鱼回复
            baby.babyBodyCount = 0;
            mom.momBodyCount = 0;
            //score update
            data.addScore();
            //draw halo
            halo.born(baby.x, baby.y);
        }
    }

}