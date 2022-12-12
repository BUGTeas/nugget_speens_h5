function rgbeditor_initbyid(id,attribute,opacity){
    rgbeditor_init("document.getElementById('" + id + "')",attribute,opacity)
}
function rgbeditor_init(object,attribute,opacity){
    apply_object = object;
    apply_attribute = attribute;
    if(opacity=="opacity"){
        opacity_enable = "enabled";
        document.getElementById("rgbeditor_opacity").style.display = "table-row";
    }
    else{
        opacity_enable = "disabled";
        document.getElementById("rgbeditor_opacity").style.display = "none";
    }
    eval("object_attribute = " + object + "." + attribute);
    var rgefnt = "rgbeditor_range_";
    var rger = document.getElementById(rgefnt + "r");
    var rgeg = document.getElementById(rgefnt + "g");
    var rgeb = document.getElementById(rgefnt + "b");
    var rgea = document.getElementById(rgefnt + "a");
    if(object_attribute.substring(0,3)=="rgb"){
        var rgb = object_attribute.split("(")[1].split(")")[0].split(", ");
        rger.value = rgb[0];
        rgeg.value = rgb[1];
        rgeb.value = rgb[2];
        if(object_attribute.substring(3,4)=="a") rgea.value = rgb[3] * 100;
        else rgea.value = 100;
    }
    else{
        rger.value = 255;
        rgeg.value = 255;
        rgeb.value = 255;
        rgea.value = 100;
    }
    rgbeditor_rgba(rgefnt + "r","none");
    rgbeditor_rgba(rgefnt + "g","none");
    rgbeditor_rgba(rgefnt + "b","none");
    rgbeditor_rgba(rgefnt + "a");
}
function rgbeditor_rgba(id,mode){
    var idsplit = id.split("_");
    var id = document.getElementById(id);
    var iptfnt = "rgbeditor_input_";
    var rgefnt = "rgbeditor_range_";
    var iptr = document.getElementById(iptfnt + "r");
    var iptg = document.getElementById(iptfnt + "g");
    var iptb = document.getElementById(iptfnt + "b");
    var ipta = document.getElementById(iptfnt + "a");
    if(idsplit[1]=="range") var idse = "input";
    else if(idsplit[1]=="input"){
        var idse = "range";
        if(id.value!="") id.value = Number.parseInt(id.value);
    }
    if(idsplit[1]!="hex") var idse = document.getElementById("rgbeditor_" + idse + "_" + idsplit[2]);
    if(idsplit[1]=="input"&&id.value==""){
        id.value = 0;
        idse.value = 0;
    }
    else if(idsplit[2]=="a"){
        if(id.value>=101){
            id.value = 100;
            idse.value = 100;
        }
        else idse.value = id.value;
    }
    else if(idsplit[1]=="hex"){
        var d = id.value;
        if(d.substring(0,1)=="#"){
            if(d.length==7){
                iptr.value = Number.parseInt(d.substring(1,3),16);
                iptg.value = Number.parseInt(d.substring(3,5),16);
                iptb.value = Number.parseInt(d.substring(5,7),16);
            }
            else if(d.length==4){
                var hex1 = d.substring(1,2);
                var hex2 = d.substring(2,3);
                var hex3 = d.substring(3,4);
                var rgb1 = Number.parseInt(hex1 + "" + hex1,16);
                var rgb2 = Number.parseInt(hex2 + "" + hex2,16);
                var rgb3 = Number.parseInt(hex3 + "" + hex3,16);
                iptr.value = rgb1;
                iptg.value = rgb2;
                iptb.value = rgb3;
            }
        }
        rgbeditor_rgba(iptfnt + "r","none");
        rgbeditor_rgba(iptfnt + "g","none");
        rgbeditor_rgba(iptfnt + "b","none");
    }
    else if(id.value>=256){
        id.value = 255;
        idse.value = 255;
    }
    else idse.value = id.value;
    if(mode!="none"){
        var numr = iptr.value;
        var numg = iptg.value;
        var numb = iptb.value;
        if(opacity_enable=="enabled") var seta = "," + ipta.value / 100;
        else var seta = ",1";
        if(idsplit[1]!="hex"){
        var spcr = spcg = spcb = "";
            if(numr<=15) var spcr = "0";
            if(numg<=15) var spcg = "0";
            if(numb<=15) var spcb = "0";
            var hexr = (Number.parseInt(numr)).toString(16);
            var hexg = (Number.parseInt(numg)).toString(16);
            var hexb = (Number.parseInt(numb)).toString(16);
            document.getElementById("rgbeditor_hex").value = "#" + spcr + hexr + spcg + hexg + spcb + hexb;
        }
        var optcolor = "rgba(" + numr + "," + numg + "," + numb + seta + ")";
        document.getElementById("rgbeditor_preview").style.backgroundColor = optcolor;
        eval(apply_object + "." + apply_attribute + " = optcolor");
    }
}