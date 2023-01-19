//实验性功能：录屏
var format;
canv = document.getElementById("canv");
const ctx = canv.getContext('2d');
function playCanvas(ctx){
    if(recStatus==true) setTimeout(function(){playCanvas(ctx)},0);
    html2canvas(document.getElementById("mainbox")).then(output => {
        ctx.drawImage(output, 0, 0, recWidth, recHeight);
        output.remove();
    });
}
recStatus = false;
function setRecorder(){
    recStart = document.createElement("button");
    recStop = document.createElement("button");
    recAllChunks = [];
    var formatlist = ["h264","vp9","vp8","none"];
    for(i=0;i<formatlist.length;i++){
        format = formatlist[i];    
        if(format!="none"&&MediaRecorder.isTypeSupported('video/webm;codecs=' + format)){
            i = formatlist.length;
            if(format!=formatlist[0]) sID("recordopt_tips").innerHTML = "当前浏览器不支持 " + formatlist[0] + " 编码，将使用 " + format + " 编码。";
            const stream = canv.captureStream(30); //30帧
            const recorder = new MediaRecorder(stream, {
                mimeType: 'video/webm;codecs=' + format
            });
            recorder.ondataavailable = e => {
                recAllChunks.push(
                    e.data
                );
            }
            recStart.onclick = e => {
                recorder.start(10);
            }
            recStop.onclick = e => {
                recorder.stop();
                const link = document.createElement('a');
                link.style.display = 'none';
                const fullBlob = new Blob(recAllChunks);
                const downloadUrl = window.URL.createObjectURL(fullBlob);
                link.href = downloadUrl;
                link.download = 'media.mp4';
                document.body.appendChild(link);
                link.click();
                link.remove();
                console.log("停止录制")
                setRecorder();
            }
            console.log("录制器设置完成，编码为 " + format);
        }
        else{
            sID("recordopt_tips").innerHTML = "当前浏览器不支持录制功能。";
            console.log(sID("recordopt_tips").innerHTML);
        }
    }
}
recorderWork = true;