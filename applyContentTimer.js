//切换图片/视频/文本模式
function showmode(name){
    if(name=="txtopt_sw") applytext();
    else if(name=="htmlopt_sw") applyhtml();
    else applyimgvid(name.substring(0,3));
    var optList = sID("option").getElementsByClassName("optsw");
    for(i=0;i<optList.length;i++){
        sID(optList[i].id.split("_")[0]).style.display = "none";
        sID(optList[i].id).style = "border-bottom:3px solid rgba(0,0,0,0)";
    }
    sID(name.split("_")[0]).style.display = "block";
    sID(name).style = "font-weight:bold;border-bottom:3px solid royalblue";
}

//加载用户文件
function fileget(mode){
    var file = anyimg.files[0];
    function al(word){alert("请确保文件为" + word + "类型,否则将无法显示");}
    if(imgOrVid=="img"){
        if(!/image\/\w+/.test(file.type)) al("图片")
        imgSrc = URL.createObjectURL(file);
    }else if(imgOrVid=="vid"){
        if(!/video\/\w+/.test(file.type)) al("视频");
        vidSrc = URL.createObjectURL(file);
    }
    applyimgvid(imgOrVid);
}

//应用图片/视频
function applyimgvid(mode){
    if(mode=="img") var element = "<img src='" + imgSrc + "' id='showimg'/>";
    if(mode=="vid") var element = "<video style='background-color:rgba(95,95,95,0.7)' id='showvid' loop onclick='this.play()'><source src='" + vidSrc + "'></video>";
    sID("rotationbox").innerHTML = element;
    setTimeout("if(cID('showvid')) sID('showvid').play()",500);
    resizeImgVid(mode);
    //用户导入文件
    if(window.FileReader){
        imgOrVid = mode;
        anyimg = sID(mode + "FileInput");
        anyimg.addEventListener('change',fileget,false);
    }else sID(mode + "opt_user").innerHTML = "您的浏览器不支持自定义文件。";
}

//调整图片/视频宽度
function resizeImgVid(mode,range){
    var rge = sID(mode + "WidthRange");
    var ipt = sID(mode + "WidthInput");
    if(range=="range") ipt.value = rge.value;
    else rge.value = ipt.value;
    sID("show" + mode).style.width = (ipt.value / deviceDPR) + "px";
}

//应用文字
function applytext(mode){
    if(sID("showimg")) sID("showimg").remove();
    var sizeInput = sID("textsizeinput");
    var sizeRange = sID("textsizerange");
    var txtInput = sID("inputtext");
    var txtw = document.getElementsByName("txtweight");
    for(i=0;i<txtw.length;i++){
        if(txtw[i].checked) var txtw = txtw[i].value;
    }
    var iptvl = txtInput.value.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
    console.log("文本模式，输出内容为 “" + iptvl + "”");
    if(sID("showtext")) sID("showtext").innerHTML = iptvl;
    else sID("rotationbox").innerHTML = "<div id='showtext'>" + iptvl + "</div>";
    var txtSet = sID("showtext");
    if(mode=="sizerange") sizeInput.value = sizeRange.value;
    else sizeRange.value = sizeInput.value;
    if(txtSet.style.color=="") var txtColor = "#000";
    else var txtColor = txtSet.style.color;
    if(txtSet.style.backgroundColor=="") var txtBg = "rgba(17,69,20,0)";
    else var txtBg = txtSet.style.backgroundColor;
    paddingSet = sizeInput.value / 4 / deviceDPR;
    txtSet.style = "white-space:nowrap;text-align:center;float:left;font-size:" + (sizeInput.value / deviceDPR) + "px;font-weight:" + txtw + ";padding:" + paddingSet + "px;border-radius:" + paddingSet + "px;color:" + txtColor + ";background-color:" + txtBg;
}

//应用代码
function applyhtml(mode){
    if(sID("showimg")) sID("showimg").remove();
    var txtInput = sID("inputhtml");
    var iptvl = txtInput.value;
    console.log("代码模式，输出内容为 “" + iptvl + "”");
    if(sID("showhtml")) sID("showhtml").innerHTML = iptvl;
    else sID("rotationbox").innerHTML = "<div id='showhtml' style='white-space:nowrap;float:left'>" + iptvl + "</div>";
}

//计时器拖拽调整位置
var moveit = document.getElementById("timer");
moveit.style.top = moveit.style.left = "10px";
//鼠标
moveit.onmousedown = function(event){
    clickReaction = "none";
    moveX = event.clientX - moveit.offsetLeft;
    moveY = event.clientY - moveit.offsetTop;
    document.onmousemove = function(event){
        moveit.style.top = event.clientY - moveY + "px";
        moveit.style.left = event.clientX - moveX + "px";
    }
    document.onmouseup = function(){
        document.onmousemove = false;
    }
    return false;
}
//触摸
moveit.ontouchstart = function(event){
    clickReaction = "none";
    moveX = event.targetTouches[0].pageX - moveit.offsetLeft;
    moveY = event.targetTouches[0].pageY - moveit.offsetTop;
    document.ontouchmove = function(event){
        moveit.style.left = event.targetTouches[0].pageX - moveX + "px";
        moveit.style.top = event.targetTouches[0].pageY - moveY + "px";
    }
    document.ontouchend = function(){
        document.ontouchmove = false;
    }
    return false;
}

//应用计时器样式
function timer_optapply(mode){
    var sizeInput = document.getElementById("timersizeinput");
    var sizeRange = document.getElementById("timersizerange");
    var timer = document.getElementById("timer");
    var weight = document.getElementsByName("timerweight");
    for(var i=0;i<weight.length;i++){
        if(weight[i].checked) timer.style.fontWeight = weight[i].value;
    }
    if(sID("timer_enabled").checked) timer.style.display = "block";
    else{timer.style.display = "none";timework = "disabled"}
    if(mode=="sizerange") sizeInput.value = sizeRange.value;
    else sizeRange.value = sizeInput.value;
    timer.style.fontSize = (sizeInput.value / deviceDPR) + "px";
    timer.style.padding = timer.style.borderRadius = (sizeInput.value / 5 / deviceDPR) + "px";
    var weight = document.getElementsByName("timerformat");
    for(var i=0;i<weight.length;i++){
        if(weight[i].checked) timerFormat = weight[i].value.split("_");
    }
    document.getElementById("timer").innerHTML = "11:45:14";
    if(timerFormat.length==4) document.getElementById("timer").innerHTML += ":19";
}

//刷新计时器显示
function timerRun(hcnt,mcnt,scnt){
    if(timework=="enabled"){
        var hournum,minutenum,secondnum,msnum,optHead,optEnd;
        var timeNum = new Date().getTime() - startTime;
        if(timerFormat[timerFormat.length - 1]=="ms"){
            msnum = Number.parseInt(timeNum / 10 - scnt * 100);
            if(msnum>=100){
                scnt++;
                msnum = 0;
            }
        }
        secondnum = Number.parseInt(timeNum / 1000 - mcnt * 60);
        if(secondnum>=60){
            mcnt++;
            secondnum = 0;
        }
        if(timerFormat[0]=="h"){
            minutenum = Number.parseInt(timeNum / 60000 - hcnt * 60);
            if(minutenum>=60){
                hcnt++;
                minutenum = 0;
            }
            hournum = Number.parseInt(timeNum / 3600000);
        }
        else minutenum = Number.parseInt(timeNum / 60000);
        if(String(hournum).length==1) hournum = "0" + hournum;
        if(String(minutenum).length==1) minutenum = "0" + minutenum;
        if(String(secondnum).length==1) secondnum = "0" + secondnum;
        if(String(msnum).length==1) msnum = "0" + msnum;
        optHead = optEnd = "";
        if(timerFormat[0]=="h") optHead = hournum + ":";
        if(timerFormat[timerFormat.length - 1]=="ms") optEnd = ":" + msnum;
        document.getElementById("timer").innerHTML = optHead + minutenum + ":" + secondnum + optEnd;
        setTimeout(function(){timerRun(hcnt,mcnt,scnt)},0);
    }
}
            
//初始化计时器
var readyTimeMode = 0;
function loadtime(timeMode,mode,showmode){
    var timer = document.getElementById("timer");
    var optUI = document.getElementById('option');
    if(mode!="noreset"){
        timework = "disabled";
        readyCntdn = 3;
        showmode = timer.style.display;
        readyTimeMode++;
        var timeMode = readyTimeMode;
    }
    if(readyCntdn==0){
        if(showmode!="none"){
            timework = "enabled";
            startTime = new Date().getTime();
            timerRun(0,0,0);
        }else{
            timer.innerHTML = "11:45:14";
            if(timerFormat.length==4) timer.innerHTML += ":19";
            timer.style.display = "none";
        }
        if(document.getElementById('showvid')){
            var vid = document.getElementById('showvid');
            vid.currentTime = 0;
            vid.play();
        }
        if(recorderWork&&sID("record_enabled").checked==true){
            console.log("开始录制");
            recStatus = true;
            playCanvas(ctx);
            setTimeout("recStart.click()",100);
        }
    }
    else{
        timer.style.display = "block";
        if(timer.style.display!="none") timer.innerHTML = readyCntdn + " 秒后开始";
        readyCntdn = readyCntdn - 1;
        setTimeout(function(){
            if(timeMode==readyTimeMode&&optUI.style.display=="none") loadtime(timeMode,'noreset',showmode);
            else if(timerFormat.length==4) timer.innerHTML = "11:45:14:19";
            else timer.innerHTML = "11:45:14";
            if(optUI.style.display!="none") timer.style.display = showmode;
        },1000);
    }
}