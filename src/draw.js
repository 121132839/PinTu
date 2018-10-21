var SHUZHU;

var baiX = 0;
var baiY = 0;
var yidongDirectionUP = false;
var yidongDirectionDOWN = false;
var yidongDirectionLEFT = false;
var yidongDirectionRIGHT = false;
var mubiaoXY = 0;
function setup() {
    SHUZHU = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
    initialLoad();
    var myCanvas = createCanvas(window.innerWidth - 50, window.innerHeight - 50);
    background(255, 0, 0);
    myCanvas.parent('myContainer');
}

function draw() {
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++) {
            fill(255, 255, 255);
            rect(30 + i * 50, 20 + j * 50, 50, 50);
            fill(0, 255, 0);
            text("" + SHUZHU[i + j * 3], 30 + i * 50 + 23, 20 + j * 50 + 30);
            if (SHUZHU[i + j * 3] == 9) {
                baiX = i;//列
                baiY = j;//行
                fill(0, 255, 255);
                rect(30 + i * 50, 20 + j * 50, 50, 50);

                //console.log("i=" + baiX + ",j=" + baiY);
            }
        }


}
//全排列太浪费时间，以及太浪费内存了,禁止使用
function permutation(a, k, m) {
    function swap(i, j) {
        var c;
        c = i;
        i = j;
        j = c;
        a[flag] = i;
        a[k] = j;
    }
    var i, flag; var str = "";
    if (k == m) {
        for (i = 0; i <= m; i++) {

            str = str + a[i] + ',';
            if (i == m)
                console.log(str);
        }

    }
    else {
        for (flag = k; flag <= m; flag++) {
            swap(a[flag], a[k]);
            permutation(a, k + 1, m);
            swap(a[flag], a[k]);
        }
    }
}
//排序打乱
function suiJi() {
    for (let i = 0, len = SHUZHU.length; i < len; i++) {
        let currentRandom = parseInt(Math.random() * (len - 1));
        let current = SHUZHU[i];
        SHUZHU[i] = SHUZHU[currentRandom];
        SHUZHU[currentRandom] = current;
    }

}

//是否可复原检测
function checkNiXu() {
    var NiXuYanZhen = 0;
    for (var i = 1; i < 9; i++) {
        for (var j = 0; j <= i; j++) {
            if (SHUZHU[j] < SHUZHU[i])
                NiXuYanZhen++;
        }

    }
    if (NiXuYanZhen != 0 && NiXuYanZhen % 2 != 0) { console.log(NiXuYanZhen+"   该拼图可复原的"); }
    else {
        console.log(NiXuYanZhen+'   不可复原的拼图');
        initialLoad();
    }
}
function initialLoad() {
    suiJi();
    checkNiXu();

}

function keyPressed() {
    moveDecide();
    switch (keyCode) {
        case LEFT_ARROW:
            if (yidongDirectionLEFT == true) { tuSwap(keyCode); draw(); gameSuccess(); }
            break;
        case RIGHT_ARROW:
            if (yidongDirectionRIGHT == true) { tuSwap(keyCode); draw(); gameSuccess(); }

            break;
        case UP_ARROW:
            if (yidongDirectionUP == true) { tuSwap(keyCode); draw(); gameSuccess(); }

            break;
        case DOWN_ARROW:
            if (yidongDirectionDOWN == true) { tuSwap(keyCode); draw(); gameSuccess(); }

            break;

    }
}


//位移判断
function moveDecide() {
    mubiaoXY = ((baiX + 1) + baiY * 3);//一维坐标
    if ((mubiaoXY - 3) > 0)
        yidongDirectionDOWN = true;  //可以上移==某个块可以下移动
    else yidongDirectionDOWN = false;
    if ((mubiaoXY + 3) < 10)
        yidongDirectionUP = true;
    else yidongDirectionUP = false;
    if ((mubiaoXY - 1) > 0)
        yidongDirectionRIGHT = true;
    else yidongDirectionRIGHT = false;
    if ((mubiaoXY + 1) < 10)
        yidongDirectionLEFT = true;
    else yidongDirectionLEFT = false;
}

//换位移动
function tuSwap(keyCode) {
    var xiaobiao = baiX + baiY * 3;
    var c;
    if (keyCode === UP_ARROW) {
        c = SHUZHU[xiaobiao];
        SHUZHU[xiaobiao] = SHUZHU[(xiaobiao) + 3];
        SHUZHU[(xiaobiao) + 3] = c;
    }
    if (keyCode === LEFT_ARROW) {
        c = SHUZHU[xiaobiao];
        SHUZHU[xiaobiao] = SHUZHU[(xiaobiao) + 1];
        SHUZHU[(xiaobiao) + 1] = c;
    }
    if (keyCode === DOWN_ARROW) {
        c = SHUZHU[xiaobiao];
        SHUZHU[xiaobiao] = SHUZHU[(xiaobiao) - 3];
        SHUZHU[(xiaobiao) - 3] = c;
    }
    if (keyCode === RIGHT_ARROW) {
        c = SHUZHU[xiaobiao];
        SHUZHU[xiaobiao] = SHUZHU[(xiaobiao) - 1];
        SHUZHU[(xiaobiao) - 1] = c;
    }

}


function gameSuccess() {
    var flag = 0;
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
            if (SHUZHU[i + j * 3] == (i + 1 + j * 3))
                flag++;

    if (flag == 9) {
        alert("SUCCESSS!");
        flag = 0;
    }
}