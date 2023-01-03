//简写document.getElementById
function sID(id){
    if(document.getElementById(id)) return document.getElementById(id);
    else console.log("不存在的元素ID：“" + id + "”");
}
function cID(id){
    return document.getElementById(id);
}

//下滑弹出选项
//排除不需要下滑手势的元素
sID("option").onmousedown = sID("timeropt").onmousedown = sID("rgbeditor").onmousedown = sID("recordopt").onmousedown = sID("recordstop").onmousedown = sID("option").ontouchstart = sID("timeropt").ontouchstart = sID("rgbeditor").ontouchstart = sID("recordopt").ontouchstart = sID("recordstop").ontouchstart = function(){
    clickReaction = "none";
}
//鼠标
document.body.onmousedown = function(event){
    if(typeof clickReaction=="undefined"){
        moveY = event.clientY;
        document.onmousemove = function(event){
            if(moveY+60<=event.clientY){
                showOption();
                document.onmousemove = false;
            }
        }
        document.onmouseup = function(){
            document.onmousemove = false;
        }
        return false;
    }
    else delete clickReaction;
}
//触摸
document.body.ontouchstart = function(event){
    if(typeof clickReaction=="undefined"){
        moveY = event.targetTouches[0].pageY;
        document.ontouchmove = function(event){
            if(moveY+60<=event.targetTouches[0].pageY){
                showOption();
                document.ontouchmove = false;
            }
        }
        document.ontouchend = function(){
            document.ontouchmove = false;
        }
        return false;
    }
    else delete clickReaction;
}

//按“O”键弹出选项
document.onkeydown = function(event){
    if(event.keyCode==79) showOption();
}

//显示选项界面
function showOption(){
    if(sID("option").style.display=="none"){
        if(recorderWork&&recStatus==true) sID("recordstop").style.display = "block";
        else{
            timework = "disabled";
            sID("option").style.display = "block";
            if(sID("tips")) sID("tips").remove();
            applyresize();
        }
    }
}

//进入全屏
function launchFullscreen(element) {
    var ele = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    if(ele) exitFullscreen();
    else if (element.requestFullscreen) element.requestFullscreen();
    else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
    else if (element.msRequestFullscreen) element.msRequestFullscreen();
    else if (element.webkitRequestFullscreen) element.webkitRequestFullScreen();
}

//退出全屏
function exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.mozExitFullScreen) document.mozExitFullScreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullScreen();
}

//打开背景图片/颜色设置界面
function coloropt_init(bgimg_enable,opacity){
    sID("rgbeditor").style.display = "block";
    if(bgimg_enable=="bgimg"){
        sID("bgopt_sw").style.display = "inline"
        if(sID("mainbox").style.background.substring(0,3)=="url") coloropt_mode("bgimg_sw");
        else coloropt_mode("rgbedt_sw",opacity);
    }
    else{
        sID("bgopt_sw").style.display = "none"
        coloropt_mode("rgbedt_sw",opacity);
    }
}

//切换背景图片/颜色模式
function coloropt_mode(name,opacity){
    var optList = sID("bgopt_sw").getElementsByClassName("optsw");
    for(i=0;i<optList.length;i++){
        sID(optList[i].id.split("_")[0]).style.display = "none";
        sID(optList[i].id).style = "border-bottom:3px solid rgba(0,0,0,0)";
    }
    if(name=="rgbedt_sw"){
        rgbeditor_initbyid(rgb_id,rgb_attribute,opacity);
        sID("rgbedt").style.display = "table";
    }
    else{
        bgimg_init();
        sID("bgimg").style.display = "block";
    }
    sID(name).style = "font-weight:bold;border-bottom:3px solid royalblue";
}

//导入背景图片
function bgimg_init(){
    if(window.FileReader){
        anyimg = sID("bgimg_input");
        anyimg.addEventListener('change',bgimg_get,false);
    }
    else sID("bgimg").innerHTML = "您的浏览器不支持自定义图片。";
    if(typeof(BgImg)!="undefined") bgimg_apply();
}

//加载背景图片
function bgimg_get(){
    var file = anyimg.files[0];
    if(!/image\/\w+/.test(file.type)) alert("请确保文件为图像类型,否则将无法显示");
    BgImg = URL.createObjectURL(file);
    bgimg_apply();
}

//应用背景图片
function bgimg_apply(){
    sID("mainbox").style.background = "url(" + BgImg + ")"
    sID("mainbox").style.backgroundSize = "cover";
    sID("mainbox").style.backgroundPosition = "center";
}
deviceDPR = window.devicePixelRatio;
recorderWork = false;