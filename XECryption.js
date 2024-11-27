function parseXEC(txt){
    let enc=false;
    txt.split(".").length===1?enc=true:
    txt.split(".").slice(1).forEach((x)=>{
        if(isNaN(parseInt(x))){enc=true}
    });
    return enc?encodeXEC(txt):decodeXEC(txt);
}
function encodeXEC(txt) {
    txt=txt;
    return "Coming Soon..";
}
function decodeXEC(txt) {
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
    sums=sums.map((x)=>{return x-commonchar+32});
    return String.fromCharCode(...sums);
}