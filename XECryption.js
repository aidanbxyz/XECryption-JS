function parseXEC(txt,pw="",common=""){
    let enc=false;
    txt.split(".").length==1?enc=true:txt.split(".").slice(1).forEach((x)=>{if(isNaN(parseInt(x))){enc=true}});
    return enc?encodeXEC(txt,pw):decodeXEC(txt,common);
}
function encodeXEC(txt,pw) {
    let out="";
    pw=pw.split("").map((x)=>x.charCodeAt(0)).reduce((p,x)=>p+x,0);
    txt.split("").map((x)=>{return x.charCodeAt(0)}).forEach((x)=>{
        x+=pw;
        let n1=Math.floor(Math.random()*x/3*2)+1;
        let n2=Math.floor(Math.random()*(x-n1))+1;
        let n3=x-n1-n2;
        out+=`.${n1}.${n2}.${n3}`;
    });
    return out;
}
function decodeXEC(txt,common="") {
    let raw=txt.split(".").slice(1).map((x)=>{return parseInt(x)});
    if (raw.length%3!==0){return}
    let sums=[];
    for (let i=0;i<raw.length;i+=3){sums.push(raw[i]+raw[i+1]+raw[i+2])}
    let commonchar=0;
    let occurdict={};
    let maxoccur=0;
    sums.forEach((x)=>{
        occurdict[x]=(occurdict[x]||0)+1;
        if (occurdict[x]>maxoccur){
            maxoccur=occurdict[x];
            commonchar=x;
        }
    });
    sums=sums.map((x)=>{return x-commonchar+common.charCodeAt(0)});
    return String.fromCharCode(...sums);
}
