//检测窗口变化自动调整尺寸
lastsize = document.body.clientWidth - document.body.clientHeight;
lastboxsize = 0;
function autoresize(){
    var newsize = document.body.clientWidth - document.body.clientHeight;
    if(newsize!=lastsize) applyresize();
    lastsize = newsize;
    var showname = ["img","vid","text","html"];
    for(i=0;i<showname.length;i++){
        if(cID("show" + showname[i])){
            var nowboxsize = sID("show" + showname[i]).clientWidth + sID("show" + showname[i]).clientHeight;
            if(nowboxsize!=lastboxsize){
                applyresize();
                lastboxsize = nowboxsize;
            }
        }
    }
    setTimeout("autoresize()",25)
    //当用户通过其他途径退出全屏后取消勾选全屏选项
    var ele = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    if(ele) sID("fullscreen_sw").checked = true;
    else sID("fullscreen_sw").checked = false;
}

//旋转框架尺寸
resizeCount = 1;
function applyresize(){
    var rotationbox = sID("rotationbox");
    var shadowbox = sID("shadowbox");
    var mainbox = sID("mainbox");
    var winbody = document.body;
    var showname = ["none","img","vid","text","html"];
    for(i=0;i<showname.length;i++){
        if(showname[i]=="none") boxWidth = boxHeight = "300";
        else if(cID("show" + showname[i])){
            var show = sID("show" + showname[i]);
            boxWidth = show.clientWidth;
            boxHeight = show.clientHeight;
        }
    }
    if(winbody.clientWidth>=360) var optionWidth = "320px";
    else var optionWidth = "calc(100% - 40px)";
    if(mainSize[0]=="auto") mainbox.style.height = "100%";
    if(mainSize[0]=="auto"&&winbody.clientWidth>=boxWidth + 400&&sID("option").style.display!="none"){
        mainbox.style.width = "calc(100% - 360px)";
        var optStyle = "height:calc(100% - 40px);background-color:#c8c8c8;width:" + optionWidth;
    }else if(mainSize[0]!="auto"&&winbody.clientWidth>=mainbox.clientWidth + 360) var optStyle = "height:calc(100% - 40px);background-color:#c8c8c8;width:" + optionWidth;
    else{
        if(mainSize[0]=="auto") mainbox.style.width = "100%";
        var optStyle = "max-height:calc(100% - 40px);background-color:rgba(150,150,150,0.5);width:" + optionWidth;
    }
    if(sID("option").style.display!="none") sID("option").style = optStyle;
    rotationbox.style.width = shadowbox.style.width = boxWidth + "px";
    rotationbox.style.height = boxHeight + "px";
    shadowbox.style.height = boxHeight / 5 + "px";
    headHeight = (mainbox.clientHeight - rotationbox.clientHeight) / 2
    rotationbox.style.marginLeft = shadowbox.style.marginLeft = ((mainbox.clientWidth - rotationbox.clientWidth) / 2)+ "px";
    anglechange();
    console.log("第 " + resizeCount + " 次调整布局\n窗口尺寸：" + mainbox.clientWidth + "px × " + mainbox.clientHeight + "px\n旋转物体尺寸" + rotationbox.clientWidth + "px × " + rotationbox.clientHeight + "px");
    resizeCount++
}

//旋转框架角度/透视
function anglechange(mode,resize){
    var xinput = sID("Xangleinput");
    var xrange = sID("Xanglerange");
    var yinput = sID("Yangleinput");
    var yrange = sID("Yanglerange");
    var zinput = sID("Zangleinput");
    var zrange = sID("Zanglerange");
    var pinput = sID("perspectinput");
    var prange = sID("perspectrange");
    var aniset = sID("animationset");
    if(mode=="xrange") xinput.value = xrange.value - 180;
    else if(mode=="yrange") yinput.value = yrange.value - 180;
    else if(mode=="zrange") zinput.value = zrange.value - 180;
    else if(mode=="prange") pinput.value = 1000 - prange.value;
    else{
        xrange.value = Number(xinput.value) + 180;
        yrange.value = Number(yinput.value) + 180;
        zrange.value = Number(zinput.value) + 180;
        prange.value = 1000 - pinput.value;
    }
    //旋转轴
    var rMod = document.getElementsByName("rotateRadio");
    for(i=0;i<rMod.length;i++){
        if(rMod[i].checked) var rMod = rMod[i].value;
    }
    //上下浮动距离
    var floatingDistance = boxHeight / 10;
    if(!sID("floating_sw").checked) var floatingDistance = 0;
    //上下浮动阴影变化
    var shdUpBlur = boxHeight / 7;
    var shdDnBlur = boxHeight / 10;
    if(!sID("floating_sw").checked) var shdDnBlur = shdUpBlur = boxHeight / 8.5;
    //上下浮动阴影距离变化
    var ShadowMargin = boxHeight / 5;
    var shdUpMarg = ShadowMargin + floatingDistance;
    var shdDnMarg = ShadowMargin - floatingDistance;
    //上下浮动顶部高度变化
    var headUpMarg = headHeight + floatingDistance;
    var headDnMarg = headHeight - floatingDistance;
    //应用动画
    var boxSet = ["0%{transform:perspective(" + pinput.value + "px) rotate","deg) rotateX(" + xinput.value + "deg) rotateY(" + yinput.value + "deg) rotateZ(" + zinput.value + "deg)"];
    aniset.innerHTML = "" +
    "@keyframes headanimation{0%,100%{margin-top:" + headUpMarg + "px;}50%{margin-top:" + headDnMarg + "px}}" +
    "@keyframes shadowanimation{0%,100%{filter:blur(" + shdDnBlur + "px);margin-top:" + shdDnMarg + "px}50%{filter:blur(" + shdUpBlur + "px);margin-top:" + shdUpMarg + "px}}" +
    "@keyframes boxanimation{" + boxSet[0] + rMod + "(" + rotateAngle[0] + boxSet[1] + "}10" + boxSet[0] + rMod + "(" + rotateAngle[1] + boxSet[1] + "}}";
    //sID("rotationbox").style.transformStyle = "preserve-3d";
}

//应用动画速度
aniMode = "animation infinite linear";
sID("rotationbox").style.animation = "box" + aniMode;
sID("shadowbox").style.animation = "shadow" + aniMode;
sID("headbox").style.animation = "head" + aniMode;
function anispeed(mode){
    var input = sID("speedinput");
    var range = sID("speedrange");
    if(mode=="range")input.value = 10 - range.value / 1000;
    else{
        range.value = (10 - input.value) * 1000;
        applySpeed();
    }
}
function applySpeed(){
    iptValue = sID("speedinput").value;
    sID("rotationbox").style.animationDuration = iptValue + "s";
    sID("shadowbox").style.animationDuration = sID("headbox").style.animationDuration = iptValue * 1.5 + "s";
}

//阴影和正反转
function reverse_shadow_sw(mode){
    if(sID("shadow_sw").checked) sID("shadowbox").style.background = "#555";
    else sID("shadowbox").style.background = "rgba(0,0,0,0)";
    if(sID("reverse_sw").checked) rotateAngle = [0,360];
    else rotateAngle = [360,0];
    if(mode!="load") anglechange();
}

//应用主体尺寸
function mainSizeApply(mode){
    var weight = document.getElementsByName("mainsize");
    for(var i=0;i<weight.length;i++){
        if(weight[i].checked){
            mainSize = weight[i].value.split("_");
            if(mainSize[0]=="cust"|mode=="cust"){
                var cwipt = sID("mainsizeCustWidth");
                var chipt = sID("mainsizeCustHeight");
                if(cwipt.value=="") cwipt.value = "0";
                if(chipt.value=="") chipt.value = "0";
                sID("mainbox").style.width = (cwipt.value / deviceDPR) + "px";
                sID("mainbox").style.height = (chipt.value / deviceDPR) + "px";
                recWidth = cwipt.value;
                recHeight = chipt.value;
                sID("mainsize_c").checked = true;
            }else if(mainSize[0]!="auto"){
                sID("mainbox").style.width = (mainSize[0] / deviceDPR) + "px";
                sID("mainbox").style.height = (mainSize[1] / deviceDPR) + "px";
                recWidth = mainSize[0];
                recHeight = mainSize[1];
            }else{
                recWidth = sID("mainbox").clientWidth * deviceDPR;
                recHeight = sID("mainbox").clientHeight * deviceDPR;
            }
            sID("canv").width = recWidth;
            sID("canv").height = recHeight;
            if(typeof ctx!="undefined"){
                ctx.fillStyle = '#114514';
                ctx.fillRect(0, 0, recWidth, recHeight);
            }
            if(recorderWork) setRecorder();
            if(mode!="load") applyresize();
        }
    }
}