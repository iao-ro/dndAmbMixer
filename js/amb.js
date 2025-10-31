// meter courtesy of https://esonderegger.github.io/web-audio-peak-meter/
var webAudioPeakMeter = function(e){"use strict";var t={log:function(...e){},dbFromFloat:function(e){return 20*(t=10,n=e,Math.log(n)/Math.log(t));var t,n},findAudioProcBufferSize:function(e){return[256,512,1024,2048,4096,8192,16384].reduce(((t,n)=>Math.abs(n-e)<Math.abs(t-e)?n:t))}};function n(e,n,r){const a=-1*n,o=Math.floor(t.dbFromFloat(e)*r/a);return o>r?r:o<0?0:o}var r={audioClipPath:function(e,t,n){let r=Math.floor(-100*e/t);return r>100&&(r=100),r<0&&(r=0),n?`inset(${r}% 0 0)`:`inset(0 ${r}% 0 0)`},createContainerDiv:function(e,t){const{clientWidth:n,clientHeight:r}=e,{backgroundColor:a}=t,o=document.createElement("div");return o.style.position="relative",o.style.width=`${n}px`,o.style.height=`${r}px`,o.style.backgroundColor="none",e.appendChild(o),o},createTicks:function(e,t){const{clientWidth:n,clientHeight:r}=e,{dbRange:a,dbTickSize:o,fontSize:l,borderSize:i,tickColor:s}=t,c=Math.floor(a/o),f=Array.from(Array(c).keys()).map((t=>{const n=document.createElement("div");return e.appendChild(n),n.style.position="absolute",n.style.color=s,n.style.textAlign="right",n.style.fontSize=`${l}px`,n.textContent="-"+o*t,n})),h=r>n;if(h){const e=2*l,t=1.5*l+i,a=l+i,o=r-t-i,s=n-e-i,d=o/c;return f.forEach(((t,n)=>{t.style.width=`${e}px`,t.style.top=`${d*n+a}px`})),{vertical:h,tickWidth:e,meterHeight:o,meterWidth:s,meterTop:t}}const d=1.5*l,u=r-d-2*i,p=3*l,y=n-p-2*i,g=y/c;return f.forEach(((e,t)=>{e.style.width=`${p}px`,e.style.bottom=`${i}px`,e.style.right=`${g*t+p}px`})),{vertical:h,tickWidth:d,meterHeight:u,meterWidth:y,meterTop:p}},createBars:function(e,t,n){const{gradient:r,borderSize:a}=t,{channelCount:o,vertical:l,meterWidth:i,meterHeight:s,meterTop:c,tickWidth:f}=n,h=Array.from(Array(o).keys()).map((()=>{const t=document.createElement("div");return e.appendChild(t),t.style.position="absolute",t}));if(l){const e=i/o-a,t=`linear-gradient(to bottom, ${r.join(", ")})`;h.forEach(((n,r)=>{n.style.height=`${s}px`,n.style.width=`${e}px`,n.style.backgroundImage=t,n.style.top=`${c}px`,n.style.left=`${(e+a)*r+f+a}px`}))}else{const e=s/o-a,t=`linear-gradient(to left, ${r.join(", ")})`;h.forEach(((n,r)=>{n.style.height=`${e}px`,n.style.width=`${i}px`,n.style.backgroundImage=t,n.style.top=`${(e+a)*r+a}px`,n.style.right=`${c}px`}))}return h},createMasks:function(e,t,n){const{backgroundColor:r,borderSize:a,maskTransition:o}=t,{channelCount:l,vertical:i,meterWidth:s,meterHeight:c,meterTop:f,tickWidth:h}=n,d=Array.from(Array(l).keys()).map((()=>{const t=document.createElement("div");return e.appendChild(t),t.style.position="absolute",t.style.backgroundColor=r,t}));if(i){const e=s/l-a;d.forEach(((t,n)=>{t.style.height=`${c}px`,t.style.width=`${e}px`,t.style.top=`${f}px`,t.style.left=`${(e+a)*n+h+a}px`,t.style.transition=`height ${o}`}))}else{const e=c/l-a;d.forEach(((t,n)=>{t.style.height=`${e}px`,t.style.width=`${s}px`,t.style.top=`${(e+a)*n+a}px`,t.style.right=`${f}px`,t.style.transition=`width ${o}`}))}return d},createPeakLabels:function(e,t,n){const{borderSize:r,labelColor:a,fontSize:o}=t,{channelCount:l,vertical:i,meterWidth:s,meterHeight:c,tickWidth:f}=n,h=Array.from(Array(l).keys()).map((()=>{const t=document.createElement("div");return e.appendChild(t),t.style.textAlign="center",t.style.color=a,t.style.fontSize=`${o}px`,t.style.position="absolute",t.textContent="0",t}));if(i){const e=s/l;h.forEach(((t,n)=>{t.style.width=`${e}px`,t.style.top=`${r}px`,t.style.left=`${e*n+f}px`}))}else{const e=c/l;h.forEach(((t,n)=>{t.style.width=2*o+"px",t.style.right=`${r}px`,t.style.top=`${e*n+f}px`}))}return h},maskSize:n,paintMeter:function e(r,a){const{dbRange:o}=r,{tempPeaks:l,heldPeaks:i,channelMasks:s,textLabels:c,meterHeight:f,meterWidth:h,vertical:d}=a,u=d?f:h;s.forEach(((e,t)=>{const r=n(l[t],o,u);d?e.style.height=`${r}px`:e.style.width=`${r}px`})),c.forEach(((e,n)=>{if(0===i[n])e.textContent="0";else{const r=t.dbFromFloat(i[n]);e.textContent=r.toFixed(1)}})),window.requestAnimationFrame((()=>e(r,a)))}};var a={calculateMaxValues:function(e){const t=[],{numberOfChannels:n}=e;for(let r=0;r<n;r+=1){t[r]=0;const n=e.getChannelData(r);for(let e=0;e<n.length;e+=1)Math.abs(n[e])>t[r]&&(t[r]=Math.abs(n[e]))}return t}};function o(e,t){const n=[],r=1/(4*t),a=Math.floor((e-1)/2);for(let o=-a;o<=a;o+=1){const a=.54+.46*Math.cos(2*Math.PI*o/e);let l=0;l=0===o?2*r:Math.sin(2*Math.PI*r*o)/(Math.PI*o),l=a*l*t,n.push(l)}return n}function l(e,t){const{lpfBuffer:n,lpfCoefficients:r,upsampleFactor:a}=t,o=[];n.push(e),n.length>=r.length&&n.shift();for(let e=0;e<a;e+=1){let t=0,l=0;for(let o=e;o<r.length;o+=a)l+=r[o]*n[n.length-1-t],t+=1;o.push(l)}return o}function i(e,n,r){let a=[];r.lpfCoefficients.length<=0&&(t.log(`Initialing filter components for ITU-R BS.1770, fs: ${n}`),n>=96e3&&(r.upsampleFactor=2),r.lpfCoefficients=o(33,r.upsampleFactor),r.lpfBuffer=new Array(r.lpfCoefficients.length).fill(0),t.log(`Initialized lpfCoefficients lpfCoefficients=[${r.lpfCoefficients.join(",")}], and lpfBuffer: [${r.lpfBuffer.join(",")}]`));for(let t=0;t<e.length;t+=1){const n=l(e[t],r);a=a.concat(n)}return a}var s={findAudioProcBufferSize:function(e){return[256,512,1024,2048,4096,8192,16384].reduce(((t,n)=>Math.abs(n-e)<Math.abs(t-e)?n:t))},calculateLPFCoefficients:o,filterSample:l,audioOverSampleAndFilter:i,calculateTPValues:function(e,n){const{lastChannelTP:r,channelCount:a}=n,{sampleRate:o}=e;if(r.length<=0){t.log(`Initialing TP values for ${a}channels`),n.lastChannelTP=new Array(a).fill(0);const e=Math.pow(10,-2),r=1.7;n.decayFactor=Math.pow(e,1/(o*r)),t.log(`Initialized with decayFactor ${n.decayFactor}`)}for(let t=0;t<a;t+=1){const a=i(e.getChannelData(t),o,n);for(let e=0;e<a.length;e+=1)r[t]*=n.decayFactor,Math.abs(a[e])>r[t]&&(r[t]=Math.abs(a[e]))}return r}};const c={borderSize:2,fontSize:9,backgroundColor:"black",tickColor:"#ddd",labelColor:"#ddd",gradient:["red 1%","#ff0 16%","lime 45%","#080 100%"],dbRange:48,dbTickSize:6,maskTransition:"0.1s",audioMeterStandard:"peak-sample",refreshEveryApproxMs:20};var f={createMeterNode:function(e,n,r={}){const a=Object.assign({},c,r),{refreshEveryApproxMs:o}=a,{channelCount:l,sampleRate:i}=e,s=o/1e3*i*l,f=t.findAudioProcBufferSize(s),h=n.createScriptProcessor(f,l,l);return e.connect(h).connect(n.destination),h},createMeter:function(e,t,n={}){const o=Object.assign({},c,n),l=r.createContainerDiv(e,o),i=r.createTicks(l,o),{channelCount:f}=t;i.tempPeaks=new Array(f).fill(0),i.heldPeaks=new Array(f).fill(0),i.channelCount=f,i.channelBars=r.createBars(l,o,i),i.channelMasks=r.createMasks(l,o,i),i.textLabels=r.createPeakLabels(l,o,i),"true-peak"===o.audioMeterStandard&&(i.lpfCoefficients=[],i.lpfBuffer=[],i.upsampleFactor=4,i.lastChannelTP=[],i.decayFactor=.99999),t.onaudioprocess=e=>function(e,t,n){const{inputBuffer:r}=e,{audioMeterStandard:o}=t;let l=[];l="true-peak"===o?s.calculateTPValues(r,n):a.calculateMaxValues(r);for(let e=0;e<l.length;e+=1)n.tempPeaks[e]=l[e],l[e]>n.heldPeaks[e]&&(n.heldPeaks[e]=l[e])}(e,o,i),l.addEventListener("click",(()=>{i.heldPeaks.fill(0)}),!1),r.paintMeter(o,i)}},h=f.createMeterNode,d=f.createMeter;return e.createMeter=d,e.createMeterNode=h,e.default=f,Object.defineProperty(e,"__esModule",{value:!0}),e}({});

// create audiocontext
let audCtx = new (window.AudioContext || window.webkitAudioContext)();

// buffers to store audio sources
var audBuffer1 = null;
var audBuffer2 = null;
var audBuffer3 = null;
var audBuffer4 = null;
var audBuffer5 = null;
var audBuffer6 = null;

// create filterNodes for each channel
let ch1Filter = audCtx.createBiquadFilter();
ch1Filter.type = "allpass";
let ch2Filter = audCtx.createBiquadFilter();
ch2Filter.type = "allpass";
let ch3Filter = audCtx.createBiquadFilter();
ch3Filter.type = "allpass";
let ch4Filter = audCtx.createBiquadFilter();
ch4Filter.type = "allpass";
let ch5Filter = audCtx.createBiquadFilter();
ch5Filter.type = "allpass";
let ch6Filter = audCtx.createBiquadFilter();
ch6Filter.type = "allpass";

// create gainNodes for each channel and master
let mGain = audCtx.createGain();
let ch1Gain = audCtx.createGain();
let ch2Gain = audCtx.createGain();
let ch3Gain = audCtx.createGain();
let ch4Gain = audCtx.createGain();
let ch5Gain = audCtx.createGain();
let ch6Gain = audCtx.createGain();

// create panNodes for each channel
let ch1PanNode = audCtx.createStereoPanner();
let ch2PanNode = audCtx.createStereoPanner();
let ch3PanNode = audCtx.createStereoPanner();
let ch4PanNode = audCtx.createStereoPanner();
let ch5PanNode = audCtx.createStereoPanner();
let ch6PanNode = audCtx.createStereoPanner();

function chValue(fil, gn, pan){
    this.filterNode = fil;
    this.gainNode = gn;
    this.panNode = pan;
}

const ch1Value = new chValue(ch1Filter, ch1Gain, ch1PanNode);
console.log(ch1Value);
const ch2Value = new chValue(ch2Filter, ch2Gain, ch2PanNode);
console.log(ch2Value);
const ch3Value = new chValue(ch3Filter, ch3Gain, ch3PanNode);
console.log(ch3Value);
const ch4Value = new chValue(ch4Filter, ch4Gain, ch4PanNode);
console.log(ch4Value);
const ch5Value = new chValue(ch5Filter, ch5Gain, ch5PanNode);
console.log(ch5Value);
const ch6Value = new chValue(ch6Filter, ch6Gain, ch6PanNode);
console.log(ch6Value);
// create limiter for master output to protect against idiocy
let mComp = audCtx.createDynamicsCompressor();
mComp.threshold.value = -12;
mComp.ratio.value = 20;
// connecting to speakers
mGain.connect(mComp);
mComp.connect(audCtx.destination);


let fx1;

// select sound source from dropdown menu
function selSrc(ch,id){
    // retrieves the value of the selection 
    var e = document.getElementById(id);
    var value = e.value;
    // calls loadSound function
    loadSound(value,ch);
}

// function to loud sound sources
function loadSound(url,ch) {
    // create new XML request passing in the url from the selSrc
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
    audCtx.decodeAudioData(request.response, function(buffer) {
        // assigns the buffer retrieved to the audBuffer variable
        var bufout = 'audBuffer' + ch;
        console.log(bufout)
        bufout = buffer;
        // calls channel play functions
        chPlaySound(buffer,ch);
    });
    }
    request.send();
}

function createMeters() {
    // master meter
        var myMeterElementm = document.getElementById('mPeakMeter');
        var meterNodem = webAudioPeakMeter.createMeterNode(mGain, audCtx);
            webAudioPeakMeter.createMeter(myMeterElementm, meterNodem, {});
    // ch1 meter
        var myMeterElementch1 = document.getElementById('ch1PeakMeter');
        var meterNodech1 = webAudioPeakMeter.createMeterNode(ch1Gain, audCtx);
            webAudioPeakMeter.createMeter(myMeterElementch1, meterNodech1, {});
    // ch2 meter
        var myMeterElementch2 = document.getElementById('ch2PeakMeter');
        var meterNodech2 = webAudioPeakMeter.createMeterNode(ch2Gain, audCtx);
            webAudioPeakMeter.createMeter(myMeterElementch2, meterNodech2, {});
    // ch3 meter
        var myMeterElementch3 = document.getElementById('ch3PeakMeter');
        var meterNodech3 = webAudioPeakMeter.createMeterNode(ch3Gain, audCtx);
            webAudioPeakMeter.createMeter(myMeterElementch3, meterNodech3, {}); 
    // ch4 meter
        var myMeterElementch4 = document.getElementById('ch4PeakMeter');
        var meterNodech4 = webAudioPeakMeter.createMeterNode(ch4Gain, audCtx);
            webAudioPeakMeter.createMeter(myMeterElementch4, meterNodech4, {}); 
    // ch5 meter
        var myMeterElementch5 = document.getElementById('ch5PeakMeter');
        var meterNodech5 = webAudioPeakMeter.createMeterNode(ch5Gain, audCtx);
            webAudioPeakMeter.createMeter(myMeterElementch5, meterNodech5, {}); 
    // ch6 meter
        var myMeterElementch6 = document.getElementById('ch6PeakMeter');
        var meterNodech6 = webAudioPeakMeter.createMeterNode(ch6Gain, audCtx);
            webAudioPeakMeter.createMeter(myMeterElementch6, meterNodech6, {}); 
}

// change filter type
function selFil(ch,id){
    // retrieves the value of the selection 
    var e = document.getElementById(id);
    var value = e.value;
        let filter;
        if (ch == 1) {
            filter = ch1Value.filterNode;
        } else if (ch == 2) {
            filter = ch2Value.filterNode;
        } else if (ch == 3) {
            filter = ch3Value.filterNode;
        } else if (ch == 4) {
            filter = ch4Value.filterNode;
        } else if (ch == 5) {
            filter = ch5Value.filterNode;
        } else {
            filter = ch6Value.filterNode;
        }
        
        filter.type = value;
            console.log(filter);
            if (value == "lowpass") {
                document.getElementById("filImg"+ch).src = "img/lp.png"
                document.getElementById("ch"+ch+"Freq").min = 0;
                document.getElementById("ch"+ch+"FreqLblMin").innerHTML = '0';
                document.getElementById("ch"+ch+"Freq").max = 300;
                document.getElementById("ch"+ch+"FreqLblMax").innerHTML = '300';
            } else if (value == "bandpass") {
                document.getElementById("filImg"+ch).src = "img/bp.png"
                document.getElementById("ch"+ch+"Freq").min = 200;
                document.getElementById("ch"+ch+"FreqLblMin").innerHTML = '200';
                document.getElementById("ch"+ch+"Freq").max = 7000;
                document.getElementById("ch"+ch+"FreqLblMax").innerHTML = '7k';
            } else if (value == "highpass") {
                document.getElementById("filImg"+ch).src = "img/hp.png"
                document.getElementById("ch"+ch+"Freq").min = 7000;
                document.getElementById("ch"+ch+"FreqLblMin").innerHTML = '7k';
                document.getElementById("ch"+ch+"Freq").max = 12000;
                document.getElementById("ch"+ch+"FreqLblMax").innerHTML = '12k';
            } else {
                document.getElementById("filImg"+ch).src = "img/eq.png"
                document.getElementById("ch"+ch+"Freq").min = 0;
                document.getElementById("ch"+ch+"FreqLblMin").innerHTML = '0';
                document.getElementById("ch"+ch+"Freq").max = 22000;
                document.getElementById("ch"+ch+"FreqLblMax").innerHTML = '22k';
            }
}
function ch1FreqCon(){
    var x = document.getElementById('ch1Freq').value;
    ch1Filter.frequency.setValueAtTime(x, audCtx.currentTime);
}
function ch1QCon(){
    var x = document.getElementById('ch1Q').value;
    ch1Filter.Q.setValueAtTime(x, audCtx.currentTime);
}

function ch2FreqCon(){
    var x = document.getElementById('ch2Freq').value;
    ch2Filter.frequency.setValueAtTime(x, audCtx.currentTime);
}
function ch2QCon(){
    var x = document.getElementById('ch2Q').value;
    ch2Filter.Q.setValueAtTime(x, audCtx.currentTime);
}

function ch3FreqCon(){
    var x = document.getElementById('ch3Freq').value;
    ch3Filter.frequency.setValueAtTime(x, audCtx.currentTime);
}
function ch3QCon(){
    var x = document.getElementById('ch3Q').value;
    ch3Filter.Q.setValueAtTime(x, audCtx.currentTime);
}

function ch4FreqCon(){
    var x = document.getElementById('ch4Freq').value;
    ch4Filter.frequency.setValueAtTime(x, audCtx.currentTime);
}
function ch4QCon(){
    var x = document.getElementById('ch4Q').value;
    ch4Filter.Q.setValueAtTime(x, audCtx.currentTime);
}

function ch5FreqCon(){
    var x = document.getElementById('ch5Freq').value;
    ch5Filter.frequency.setValueAtTime(x, audCtx.currentTime);
}
function ch5QCon(){
    var x = document.getElementById('ch5Q').value;
    ch5Filter.Q.setValueAtTime(x, audCtx.currentTime);
}

function ch6FreqCon(){
    var x = document.getElementById('ch6Freq').value;
    ch6Filter.frequency.setValueAtTime(x, audCtx.currentTime);
}
function ch6QCon(){
    var x = document.getElementById('ch6Q').value;
    ch6Filter.Q.setValueAtTime(x, audCtx.currentTime);
}
//channel play functions
function chPlaySound(buffer,ch) {
        document.getElementById("selFil"+ch).disabled = false;
        document.getElementById("ch"+ch+"FxSel").disabled = false;
        // creates a sound source
        var source = audCtx.createBufferSource();
        // tell the source which sound to play
        source.buffer = buffer;
        console.log(ch)
        let filter;
        let gain;
        let pan;
        if (ch == 1) {
            filter = ch1Value.filterNode;
                console.log(filter);
            gain = ch1Value.gainNode;
                console.log(gain);
            pan = ch1Value.panNode;
                console.log(pan);
        } else if (ch == 2) {
            filter = ch2Value.filterNode;
                console.log(filter);
            gain = ch2Value.gainNode;
                console.log(gain);
            pan = ch2Value.panNode;
                console.log(pan);
        } else if (ch == 3) {
            filter = ch3Value.filterNode;
                console.log(filter);
            gain = ch3Value.gainNode;
                console.log(gain);
            pan = ch3Value.panNode;
                console.log(pan); 
        } else if (ch == 4) {
            filter = ch4Value.filterNode;
                console.log(filter);
            gain = ch4Value.gainNode;
                console.log(gain);
            pan = ch4Value.panNode;
                console.log(pan);
        } else if (ch == 5) {
            filter = ch5Value.filterNode;
                console.log(filter);
            gain = ch5Value.gainNode;
                console.log(gain);
            pan = ch5Value.panNode;
                console.log(pan);
        } else {
            filter = ch6Value.filterNode;
                console.log(filter);
            gain = ch6Value.gainNode;
                console.log(gain);
            pan = ch6Value.panNode;
                console.log(pan);
        }  
        // connect the source to the filter
        source.connect(filter);
        // connect the filter to the gain
        filter.connect(gain);
        // connect the gain to the pan
        gain.connect(pan);
        pan.connect(mGain);
        var selFx = '#ch'+ch+'FxSel';
        var y = document.querySelector(selFx);
        y.addEventListener('change', (event) => {
            var fx =  event.target.value;
            console.log(fx);
                if (fx == 'mas') {
                    pan.connect(mGain);
                } else if (fx == 'fx1') {
                    document.getElementById("fx1Sel").disabled = false;
                    fx1 = pan;
                    pan.disconnect();
                    console.log(fx1)
                } else {
                    pan.disconnect();
                }
        });
            // loop source
        source.loop = true;
            // play the source now
        source.start(0);
        // activate when the user clicks the dropdown
        var sel = '#sel'+ch;
        var x = document.querySelector(sel);
            x.addEventListener("click", function(){
                //  stops the audio
                source.stop(0);
            });
}

// store volume values
var mV = 1;
var ch1V = 1;
var ch2V = 1;
var ch3V = 1;
var ch4V = 1;
var ch5V = 1;
var ch6V = 1;

// channel play values
var mPlay = 0;
var ch1Play = 0;
var ch2Play = 0;
var ch3Play = 0;
var ch4Play = 0;
var ch5Play = 0;
var ch6Play = 0;
// play buttons in master
function masterChPlayBtn(ch){
    let play;
    let V;
    if (ch == 1) {
        gn = ch1Value.gainNode;
        play = ch1Play
        V = ch1V
            console.log(gn);
    } else if (ch == 2) {
        gn = ch2Value.gainNode;
        play = ch2Play
        V = ch2V
            console.log(gn);
    } else if (ch == 3) {
        gn = ch3Value.gainNode;
        play = ch3Play
        V = ch3V
            console.log(gn);
    } else if (ch == 4) {
        gn = ch4Value.gainNode;
        play = ch4Play
        V = ch4V
            console.log(gn);
    } else if (ch == 5) {
        gn = ch5Value.gainNode;
        play = ch5Play
        V = ch5V
            console.log(gn);
    } else if (ch == 6){
        gn = ch6Value.gainNode;
        play = ch6Play
        V = ch6V
            console.log(gn);
    } else {
        gn = mGain;
        play = mPlay
        V = mV
            console.log(gn);
    }

        if (play == 0) {
            gn.gain.linearRampToValueAtTime(0, audCtx.currentTime + 5);
            play = 1;
            document.getElementById('ch'+ch+'PlayBtn').style.backgroundColor = "red";
            // document.querySelector('p#ch'+ch+'PlayBtn').innerHTML = gn.value
            document.querySelector('p#ch'+ch+'PlayBtn').innerHTML = "Paused"
            console.log(play);
        } else if (play == 1) {
            gn.gain.linearRampToValueAtTime(V, audCtx.currentTime + 5);
            play = 0;
            document.getElementById('ch'+ch+'PlayBtn').style.backgroundColor = "green";
            // document.querySelector('p#ch'+ch+'PlayBtn').innerHTML = gn.value
            document.querySelector('p#ch'+ch+'PlayBtn').innerHTML = "Playing"
            console.log(play);
        }

    if (ch == 1) {
        ch1Play = play;
    } else if (ch == 2) {
        ch2Play = play;
    } else if (ch == 3) {
        ch3Play = play;
    } else if (ch == 4) {
        ch4Play = play;
    } else if (ch == 5) {
        ch5Play = play;
    } else if (ch == 6) {
        ch6Play = play;
    } else {
        mPlay= play;
    }
}

// volume/gain controls
function mVolume(){
        // retrieve value from slider 
    var x = document.getElementById('mVol').value;
            // convert to a scale from 0 - 1
        x = x / 100;
            // output to gainNode
    mGain.gain.setValueAtTime(x, audCtx.currentTime);
    mV = x; 
}
//channel 1
function ch1Volume(){
    var x = document.getElementById('ch1Vol').value;
        x = x / 100;
    ch1Gain.gain.setValueAtTime(x, audCtx.currentTime);
    ch1V = x;
}
    ch1X = 0;
    function ch1Mute(){
        if (ch1X == 0){
            ch1Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch1X = 1;
            document.getElementById('ch1MuteBtn').style.backgroundColor = "red";
            console.log(ch1X);
        } else if(ch1X == 1){
            ch1Gain.gain.setValueAtTime(ch1V, audCtx.currentTime);
            ch1X = 0;
            document.getElementById('ch1MuteBtn').style.backgroundColor = "grey";
            console.log(ch1X);
        }
    }
    ch1Y = 0;
    function ch1Solo(){
        if (ch1Y == 0){
            ch2Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch3Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch4Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch5Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch6Gain.gain.setValueAtTime(0, audCtx.currentTime);

            ch1Y = 1;

            document.getElementById('ch1SoloBtn').style.backgroundColor = "orange";
            document.getElementById('ch2MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch3MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch4MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch5MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch6MuteBtn').style.backgroundColor = "red";
            console.log(ch1Y);
        } else if(ch1Y == 1){
            ch2Gain.gain.setValueAtTime(ch2V, audCtx.currentTime);
            ch3Gain.gain.setValueAtTime(ch3V, audCtx.currentTime);
            ch4Gain.gain.setValueAtTime(ch4V, audCtx.currentTime);
            ch5Gain.gain.setValueAtTime(ch5V, audCtx.currentTime);
            ch6Gain.gain.setValueAtTime(ch6V, audCtx.currentTime);

            ch1Y = 0;

            document.getElementById('ch1SoloBtn').style.backgroundColor = "grey";
            document.getElementById('ch2MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch3MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch4MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch5MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch6MuteBtn').style.backgroundColor = "grey";
            console.log(ch1Y);
        }
    }
function ch1Pan(){
    var x = document.getElementById('ch1Pan').value;
        x = x / 100;
    ch1PanNode.pan.setValueAtTime(x, audCtx.currentTime);
}
//channel 2
function ch2Volume(){
    var x = document.getElementById('ch2Vol').value;
        x = x / 100;
    ch2Gain.gain.setValueAtTime(x, audCtx.currentTime);
    ch2V = x;
}
    ch2X = 0;
    function ch2Mute(){
        if (ch2X == 0){
            ch2Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch2X = 1;
            document.getElementById('ch2MuteBtn').style.backgroundColor = "red";
            console.log(ch2X);
        } else if(ch2X == 1){
            ch2Gain.gain.setValueAtTime(ch2V, audCtx.currentTime);
            ch2X = 0;
            document.getElementById('ch2MuteBtn').style.backgroundColor = "grey";
            console.log(ch2X);
        }
    }
    ch2Y = 0;
    function ch2Solo(){
        if (ch2Y == 0){
            ch1Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch3Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch4Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch5Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch6Gain.gain.setValueAtTime(0, audCtx.currentTime);

            ch2Y = 1;

            document.getElementById('ch2SoloBtn').style.backgroundColor = "orange";
            document.getElementById('ch1MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch3MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch4MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch5MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch6MuteBtn').style.backgroundColor = "red";
            console.log(ch2Y);
        } else if(ch2Y == 1){
            ch1Gain.gain.setValueAtTime(ch1V, audCtx.currentTime);
            ch3Gain.gain.setValueAtTime(ch3V, audCtx.currentTime);
            ch4Gain.gain.setValueAtTime(ch4V, audCtx.currentTime);
            ch5Gain.gain.setValueAtTime(ch5V, audCtx.currentTime);
            ch6Gain.gain.setValueAtTime(ch6V, audCtx.currentTime);

            ch2Y = 0;

            document.getElementById('ch2SoloBtn').style.backgroundColor = "grey";
            document.getElementById('ch1MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch3MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch4MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch5MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch6MuteBtn').style.backgroundColor = "grey";
            console.log(ch2Y);
        }
    }
function ch2Pan(){
    var x = document.getElementById('ch2Pan').value;
        x = x / 100;
    ch2PanNode.pan.setValueAtTime(x, audCtx.currentTime);
}
//channel 3
function ch3Volume(){
    var x = document.getElementById('ch3Vol').value;
        x = x / 100;
    ch3Gain.gain.setValueAtTime(x, audCtx.currentTime);
    ch3V = x;
}
    ch3X = 0;
    function ch3Mute(){
        if (ch3X == 0){
            ch3Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch3X = 1;
            document.getElementById('ch3MuteBtn').style.backgroundColor = "red";
            console.log(ch3X);
        } else if(ch3X == 1){
            ch3Gain.gain.setValueAtTime(ch3V, audCtx.currentTime);
            ch3X = 0;
            document.getElementById('ch3MuteBtn').style.backgroundColor = "grey";
            console.log(ch3X);
        }
    }
    ch3Y = 0;
    function ch3Solo(){
        if (ch3Y == 0){
            ch1Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch2Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch4Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch5Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch6Gain.gain.setValueAtTime(0, audCtx.currentTime);

            ch3Y = 1;

            document.getElementById('ch3SoloBtn').style.backgroundColor = "orange";
            document.getElementById('ch1MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch2MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch4MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch5MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch6MuteBtn').style.backgroundColor = "red";
            console.log(ch3Y);
        } else if(ch3Y == 1){
            ch1Gain.gain.setValueAtTime(ch1V, audCtx.currentTime);
            ch2Gain.gain.setValueAtTime(ch2V, audCtx.currentTime);
            ch4Gain.gain.setValueAtTime(ch4V, audCtx.currentTime);
            ch5Gain.gain.setValueAtTime(ch5V, audCtx.currentTime);
            ch6Gain.gain.setValueAtTime(ch6V, audCtx.currentTime);
            
            ch3Y = 0;

            document.getElementById('ch3SoloBtn').style.backgroundColor = "grey";
            document.getElementById('ch1MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch2MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch4MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch5MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch6MuteBtn').style.backgroundColor = "grey";
            console.log(ch3Y);
        }
    }
function ch3Pan(){
    var x = document.getElementById('ch3Pan').value;
        x = x / 100;
    ch3PanNode.pan.setValueAtTime(x, audCtx.currentTime);
}
//channel 4
function ch4Volume(){
    var x = document.getElementById('ch4Vol').value;
        x = x / 100;
    ch4Gain.gain.setValueAtTime(x, audCtx.currentTime);
    ch4V = x;
}
    ch4X = 0;
    function ch4Mute(){
        if (ch4X == 0){
            ch4Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch4X = 1;
            document.getElementById('ch4MuteBtn').style.backgroundColor = "red";
            console.log(ch4X);
        } else if(ch4X == 1){
            ch4Gain.gain.setValueAtTime(ch4V, audCtx.currentTime);
            ch4X = 0;
            document.getElementById('ch4MuteBtn').style.backgroundColor = "grey";
            console.log(ch4X);
        }
    }
    ch4Y = 0;
    function ch4Solo(){
        if (ch4Y == 0){
            ch1Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch2Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch3Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch5Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch6Gain.gain.setValueAtTime(0, audCtx.currentTime);

            ch4Y = 1;

            document.getElementById('ch4SoloBtn').style.backgroundColor = "orange";
            document.getElementById('ch1MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch2MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch3MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch5MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch6MuteBtn').style.backgroundColor = "red";
            console.log(ch4Y);
        } else if(ch4Y == 1){
            ch1Gain.gain.setValueAtTime(ch1V, audCtx.currentTime);
            ch2Gain.gain.setValueAtTime(ch2V, audCtx.currentTime);
            ch3Gain.gain.setValueAtTime(ch3V, audCtx.currentTime);
            ch5Gain.gain.setValueAtTime(ch5V, audCtx.currentTime);
            ch6Gain.gain.setValueAtTime(ch6V, audCtx.currentTime);
            
            ch4Y = 0;

            document.getElementById('ch4SoloBtn').style.backgroundColor = "grey";
            document.getElementById('ch1MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch2MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch3MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch5MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch6MuteBtn').style.backgroundColor = "grey";
            console.log(ch4Y);
        }
    }
function ch4Pan(){
    var x = document.getElementById('ch4Pan').value;
        x = x / 100;
    ch4PanNode.pan.setValueAtTime(x, audCtx.currentTime);
}
//channel 5
function ch5Volume(){
    var x = document.getElementById('ch5Vol').value;
        x = x / 100;
    ch5Gain.gain.setValueAtTime(x, audCtx.currentTime);
    ch5V = x;
}
    ch5X = 0;
    function ch5Mute(){
        if (ch5X == 0){
            ch5Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch5X = 1;
            document.getElementById('ch5MuteBtn').style.backgroundColor = "red";
            console.log(ch5X);
        } else if(ch5X == 1){
            ch5Gain.gain.setValueAtTime(ch5V, audCtx.currentTime);
            ch5X = 0;
            document.getElementById('ch5MuteBtn').style.backgroundColor = "grey";
            console.log(ch5X);
        }
    }
    ch5Y = 0;
    function ch5Solo(){
        if (ch5Y == 0){
            ch1Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch2Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch3Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch4Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch6Gain.gain.setValueAtTime(0, audCtx.currentTime);

            ch5Y = 1;

            document.getElementById('ch5SoloBtn').style.backgroundColor = "orange";
            document.getElementById('ch1MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch2MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch3MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch4MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch6MuteBtn').style.backgroundColor = "red";
            console.log(ch5Y);
        } else if(ch5Y == 1){
            ch1Gain.gain.setValueAtTime(ch1V, audCtx.currentTime);
            ch2Gain.gain.setValueAtTime(ch2V, audCtx.currentTime);
            ch3Gain.gain.setValueAtTime(ch3V, audCtx.currentTime);
            ch4Gain.gain.setValueAtTime(ch4V, audCtx.currentTime);
            ch6Gain.gain.setValueAtTime(ch6V, audCtx.currentTime);
            
            ch5Y = 0;

            document.getElementById('ch5SoloBtn').style.backgroundColor = "grey";
            document.getElementById('ch1MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch2MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch3MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch4MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch6MuteBtn').style.backgroundColor = "grey";
            console.log(ch5Y);
        }
    }
function ch5Pan(){
    var x = document.getElementById('ch5Pan').value;
        x = x / 100;
    ch5PanNode.pan.setValueAtTime(x, audCtx.currentTime);
}
//channel 6
function ch6Volume(){
    var x = document.getElementById('ch6Vol').value;
        x = x / 100;
    ch6Gain.gain.setValueAtTime(x, audCtx.currentTime);
    ch6V = x;
}
    ch6X = 0;
    function ch6Mute(){
        if (ch6X == 0){
            ch6Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch6X = 1;
            document.getElementById('ch6MuteBtn').style.backgroundColor = "red";
            console.log(ch6X);
        } else if(ch6X == 1){
            ch6Gain.gain.setValueAtTime(ch6V, audCtx.currentTime);
            ch6X = 0;
            document.getElementById('ch6MuteBtn').style.backgroundColor = "grey";
            console.log(ch6X);
        }
    }
    ch6Y = 0;
    function ch6Solo(){
        if (ch6Y == 0){
            ch1Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch2Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch3Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch4Gain.gain.setValueAtTime(0, audCtx.currentTime);
            ch5Gain.gain.setValueAtTime(0, audCtx.currentTime);

            ch6Y = 1;

            document.getElementById('ch6SoloBtn').style.backgroundColor = "orange";
            document.getElementById('ch1MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch2MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch3MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch4MuteBtn').style.backgroundColor = "red";
            document.getElementById('ch5MuteBtn').style.backgroundColor = "red";
            console.log(ch6Y);
        } else if(ch6Y == 1){
            ch1Gain.gain.setValueAtTime(ch1V, audCtx.currentTime);
            ch2Gain.gain.setValueAtTime(ch2V, audCtx.currentTime);
            ch3Gain.gain.setValueAtTime(ch3V, audCtx.currentTime);
            ch4Gain.gain.setValueAtTime(ch4V, audCtx.currentTime);
            ch5Gain.gain.setValueAtTime(ch5V, audCtx.currentTime);
            
            ch6Y = 0;

            document.getElementById('ch6SoloBtn').style.backgroundColor = "grey";
            document.getElementById('ch1MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch2MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch3MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch4MuteBtn').style.backgroundColor = "grey";
            document.getElementById('ch5MuteBtn').style.backgroundColor = "grey";
            console.log(ch6Y);
        }
    }
function ch6Pan(){
    var x = document.getElementById('ch6Pan').value;
        x = x / 100;
    ch6PanNode.pan.setValueAtTime(x, audCtx.currentTime);
}

// fx section

// reverb section
var reverb = audCtx.createConvolver();
var reverb2 = audCtx.createConvolver();
function loadImp() {
    // create new XML request passing in the url from the selSrc
    var request = new XMLHttpRequest();
    request.open('GET', './audio/revImpulse.ogg', true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
    audCtx.decodeAudioData(request.response, function(buffer) {
        myImpulseBuffer = buffer;
        reverb.buffer = myImpulseBuffer;
        reverb2.buffer = myImpulseBuffer;
    });
    }
    request.send();
}
reverbGain = audCtx.createGain();

// delay unit
let delayMasIn = audCtx.createGain();
delayMasIn.gain.value = 0.1;

var delay1 = audCtx.createDelay();
var delay2 = audCtx.createDelay();
var delay3 = audCtx.createDelay();

let delayMasOut = audCtx.createGain();
let delayMasOut2 = audCtx.createGain();
delay2.delayTime = 20;
delay3.delayTime = 40;

delayMasIn.connect(delay1);
delayMasIn.connect(delay2);
delayMasIn.connect(delay3);
delay1.connect(delayMasOut);
delay2.connect(delayMasOut);
delay3.connect(delayMasOut);

delay1.connect(delayMasOut2);
delay2.connect(delayMasOut2);
delay3.connect(delayMasOut2);

// compressor unit
compressor1 = audCtx.createDynamicsCompressor();
compressor2 = audCtx.createDynamicsCompressor();

//fx gainnodes
fx1Gain = audCtx.createGain();
fx2Gain = audCtx.createGain();
fx3Gain = audCtx.createGain();

//fx
function fx1Sel(){
    document.getElementById("fx1Sel2").disabled = false;
    e = document.getElementById('fx1Sel');
    var value = e.value;
        if (value == 'rev') {
                document.getElementById('fx1RevSec').style.visibility = "visible";
                document.getElementById('fx1DelSec').style.visibility = "hidden";
                document.getElementById('fx1CompSec').style.visibility = "hidden";
            delayMasOut.disconnect();
            compressor1.disconnect();
            loadImp();
            console.log(reverb);

            fx1.connect(fx1Gain);
            fx1Gain.connect(mGain);
            fx1.connect(reverb);
            reverb.connect(reverbGain);
            reverbGain.connect(mGain);
        } else if (value == 'del') {
                document.getElementById('fx1RevSec').style.visibility = "hidden";
                document.getElementById('fx1DelSec').style.visibility = "visible";
                document.getElementById('fx1CompSec').style.visibility = "hidden";
            reverb.disconnect();
            compressor1.disconnect();

            fx1.connect(fx1Gain);
            fx1Gain.connect(mGain);
            fx1.connect(delayMasIn);
            delayMasOut.connect(mGain);
        } else if (value =='comp') {
                document.getElementById('fx1RevSec').style.visibility = "hidden";
                document.getElementById('fx1DelSec').style.visibility = "hidden";
                document.getElementById('fx1CompSec').style.visibility = "visible";
            reverb.disconnect();
            delayMasOut.disconnect();

            fx1.connect(compressor1);
            compressor1.connect(mGain);
        } else {
                document.getElementById('fx1RevSec').style.visibility = "hidden";
                document.getElementById('fx1DelSec').style.visibility = "hidden";
                document.getElementById('fx1CompSec').style.visibility = "hidden";
            fx1.connect(mGain);
            reverb.disconnect();
            delayMasOut.disconnect();
        }
        var x = document.getElementById('fx1Sel2');
            x.addEventListener("click", function(){
            value = x.value;
                if (value == 'rev') {
                        document.getElementById('fx1RevSec2').style.visibility = "visible";
                        document.getElementById('fx1DelSec2').style.visibility = "hidden";
                        document.getElementById('fx1CompSec2').style.visibility = "hidden";
                    delayMasOut2.disconnect();
                    loadImp();
                    console.log(reverb2);
    
                    fx1.connect(reverb2);
                    reverb2.connect(reverbGain);
                    reverbGain.connect(mGain);
                } else if (value == 'del') {
                        document.getElementById('fx1RevSec2').style.visibility = "hidden";
                        document.getElementById('fx1DelSec2').style.visibility = "visible";
                        document.getElementById('fx1CompSec2').style.visibility = "hidden";
                    reverb2.disconnect();
    
                    fx1.connect(delayMasIn);
                    delayMasOut2.connect(mGain);
                } else if (value =='comp') {
                        document.getElementById('fx1RevSec2').style.visibility = "hidden";
                        document.getElementById('fx1DelSec2').style.visibility = "hidden";
                        document.getElementById('fx1CompSec2').style.visibility = "visible";
                    reverb2.disconnect();
                    delayMasOut2.disconnect();
                    
                    fx1.connect(compressor2);
                    compressor2.connect(mGain);
                } else {
                    fx1.connect(mGain);
                    reverb2.disconnect();
                    delayMasOut2.disconnect();
                    compressor2.disconnect();
                }
        });
}

function revMix(fx) {
    var x = document.getElementById('fx'+fx+'RMix').value;
        x = x / 100;
    var y = 1 - x;
    if (fx == 1){
        fx1Gain.gain.setValueAtTime(y, audCtx.currentTime);
    } else if (fx == 2){
        fx2Gain.gain.setValueAtTime(y, audCtx.currentTime);
    } else {
        fx3Gain.gain.setValueAtTime(y, audCtx.currentTime);
    }
    reverbGain.gain.setValueAtTime(x, audCtx.currentTime);
}
function delMasMix(fx) {
    var x = document.getElementById('fx'+fx+'DmMix').value;
        x = x / 100;
    var y = 1 - x;
    if (fx == 1){
        fx1Gain.gain.setValueAtTime(y, audCtx.currentTime);
    } else if (fx == 2){
        fx2Gain.gain.setValueAtTime(y, audCtx.currentTime);
    } else {
        fx3Gain.gain.setValueAtTime(y, audCtx.currentTime);
    }
    delayMasOut.gain.setValueAtTime(x, audCtx.currentTime);
}
function del1Mix(fx) {
    var x = document.getElementById('fx'+fx+'D1Mix').value;
        x = x / 100;
        console.log(x);
    delay1.delayTime.setValueAtTime(x, audCtx.currentTime);
}
function del2Mix(fx) {
    var x = document.getElementById('fx'+fx+'D2Mix').value;
        x = x / 100;
        console.log(x);
    delay2.delayTime.setValueAtTime(x, audCtx.currentTime);
}
function del3Mix(fx) {
    var x = document.getElementById('fx'+fx+'D3Mix').value;
        x = x / 100;
        console.log(x);
    delay3.delayTime.setValueAtTime(x, audCtx.currentTime);
}

function compThres(fx) {
    var x = document.getElementById('fx'+fx+'CmThres').value;
        console.log(x);
    compressor1.threshold.setValueAtTime(x, audCtx.currentTime);
    compressor2.threshold.setValueAtTime(x, audCtx.currentTime);
}
function compKnee(fx) {
    var x = document.getElementById('fx'+fx+'CmKnee').value;
        console.log(x);
    compressor1.knee.setValueAtTime(x, audCtx.currentTime);
    compressor2.knee.setValueAtTime(x, audCtx.currentTime);
}
function compRatio(fx) {
    var x = document.getElementById('fx'+fx+'CmRatio').value;
        console.log(x);
    compressor1.ratio.setValueAtTime(x, audCtx.currentTime);
    compressor2.ratio.setValueAtTime(x, audCtx.currentTime);
}