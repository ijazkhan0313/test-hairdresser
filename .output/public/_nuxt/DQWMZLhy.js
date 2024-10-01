import{s as P}from"./lij41l4B.js";import{m as I,k as E,j as D,_ as V,o as m,c as g,q as x,g as A,a as o,s as R,v as O,p as k,e as B}from"./C2egFmNW.js";import{u as a,c as T}from"./C-QmXMO2.js";import{A as f}from"./CMS5Braa.js";import{H as y}from"./D3j8g8Cz.js";import{u as _}from"./Cq3l7X6R.js";import{i as z}from"./DQqw_gti.js";import{i as H}from"./O97EOHsH.js";import{_ as L}from"./evITL-mf.js";import{_ as Y}from"./lXXSD6iP.js";const U={name:"RNBOPlayer",props:{scenery:{type:String,default:"forest"}},data(){return{audioContext:null,micSource:null,html5AudioPoolSize:0,music:null,noiseAudioSource:null,musicAudioSource:null,noiseDevice:null,musicDevice:null,noiseGainNode:null,musicGainNode:null,outputNoiseGain:0,outputMusicGain:0,musicInputChannelSplitter:null,noiseInputChannelSplitter:null,micStream:null,isFading:!1,startTime:0,pauseTime:0,startOffset:0,isStopPlayRunning:!1,isStartPlayRunning:!1,eventLog:"",hoveringNoiseSlider:!1,hoveringMusicSlider:!1}},computed:{...I(a,["playing"]),...I(D,["user"]),normalizedNoiseGain:function(){return this.outputNoiseGain/100},normalizedMusicGain:function(){return this.outputMusicGain/100}},watch:{scenery(){},async outputMusicGain(e){this.outputMusicGain=e;const i=this.musicGainNode,t=await a().getAudioContext();i&&!this.isFading&&i.gain.linearRampToValueAtTime(this.normalizedMusicGain,t.currentTime+.5)},async outputNoiseGain(e){this.outputNoiseGain=e;const i=this.noiseGainNode,t=await a().getAudioContext();i&&!this.isFading&&i.gain.linearRampToValueAtTime(this.normalizedNoiseGain,t.currentTime+.5)}},beforeUnmount(){this.slowlyFadeOutAudio(1e3),a().resetAudioContext()},mounted(){const e=a(),i=_();Howler.volume(1),i.getMicrophone(),this.startPlay(),this.audioContext=e.getAudioContext();const t=document.getElementById("hiddenAudio");t?.addEventListener("play",u=>{(!this.isStartPlayRunning||!a().playing)&&this.startPlay()}),t?.addEventListener("pause",u=>{this.stopPlay()}),"mediaSession"in navigator&&(this.showMediaInformation(),navigator.mediaSession.setActionHandler("play",u=>{(this.isStartPlayRunning||!a().playing)&&this.startPlay()}),navigator.mediaSession.setActionHandler("pause",u=>{this.stopPlay()}))},methods:{...E(a,["addNode","startAllSources","startNode"]),showMediaInformation(){"mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:this.scenery,artist:"Mindboost",artwork:[{src:"/images/scenery/"+this.scenery+".jpg",sizes:"96x96",type:"image/jpeg"}]}))},changeNoiseGain(e){e.preventDefault();const i=Math.sign(e.deltaY);this.outputNoiseGain-i<101&&this.outputNoiseGain-i>-1&&(this.outputNoiseGain-=i)},changeMusicGain(e){e.preventDefault();const i=Math.sign(e.deltaY);this.outputMusicGain-i<101&&this.outputMusicGain-i>-1&&(this.outputMusicGain-=i)},stopPlay(){this.isStopPlayRunning||(this.isStopPlayRunning=!0,a().isPlaying&&this.slowlyFadeOutAudio(1e3),_().detachMicrophoneSource(),this.isStopPlayRunning=!1)},slowlyFadeOutAudio(e=5e3){this.isFading=!0;let i=100;const t=0,u=t/(e/100);this.musicGainNode?.gain.linearRampToValueAtTime(0,e/1e3),this.noiseGainNode?.gain.linearRampToValueAtTime(0,e/1e3);const n=P(()=>{i+=u,i>=t&&(i=t,clearInterval(n)),this.outputNoiseGain=i,this.outputMusicGain=i,this.musicAudioSource instanceof MediaElementAudioSourceNode&&(this.musicAudioSource.disconnect(),this.musicAudioSource=null),this.noiseAudioSource instanceof MediaElementAudioSourceNode&&(this.noiseAudioSource.disconnect(),this.noiseAudioSource=null),a().setPlaying(!1)},50);this.isFading=!1},slowlyFadeInAudio(e=5e3){this.isFading=!0;let i=1;const t=100,u=t/(e/100),n=P(()=>{i+=u,i>=t&&(i=t,clearInterval(n)),this.outputNoiseGain=i,this.outputMusicGain=i},30);this.isFading=!1},testHowler(){},async startPlay(){const e=a(),i=_();if(this.isStartPlayRunning)return;this.isStartPlayRunning=!0;const t=await a().getAudioContext(),u=await i.getMicrophone(),n=a().getMicrophoneNode();this.micSource=u.microphoneNode,this.micStream=u.microphoneStream;const r=await e.getBufferSourceNode("noise"),s=await e.getBufferSourceNode(this.scenery);this.musicDevice=await T(t,H),this.noiseDevice=await T(t,z);const c=e.addNode("musicDevice",this.musicDevice.node),d=e.addNode("noiseDevice",this.noiseDevice.node);this.musicInputChannelSplitter=new ChannelSplitterNode(t,{numberOfOutputs:2});const l=e.addNode("musicInputChannelSplitter",this.musicInputChannelSplitter);this.noiseInputChannelSplitter=new ChannelSplitterNode(t,{numberOfOutputs:2});const N=e.addNode("noiseInputChannelSplitter",this.noiseInputChannelSplitter),b=new ChannelSplitterNode(t,{numberOfOutputs:2}),S=e.addNode("musicOutputChannelSplitter",b),v=t.createGain(),G=t.createGain();v.gain.value=.5,G.gain.value=.5,this.noiseGainNode=G,this.musicGainNode=v;const w=e.addNode("musicGainNode",v),M=e.addNode("noiseGainNode",G);try{n&&c&&e.connectNodes(n,c,0,0),s&&l&&e.connectNodes(s,l,0,0),c&&l&&e.connectNodes(l,c,0,1),c&&l&&e.connectNodes(l,c,1,2)}catch{}const C=await e.addNode("destination",t.destination);e.connectNodes(c,w),e.connectNodes(w,C),e.connectNodes(n,d,0,0),e.connectNodes(r,N,0,0),e.connectNodes(N,d,0,1),e.connectNodes(N,d,1,2),e.connectNodes(c,S,0,0),e.connectNodes(S,d,0,3),e.connectNodes(S,d,1,4),e.connectNodes(d,M,0,0),e.connectNodes(M,C),this.startTime=t.currentTime,this.pauseTime=0;const F=this.noiseDevice.parametersById.get("attenuation");F.value=j("Yes","OverEar"),this.noiseDevice.messageEvent.subscribe(p=>{p.tag==="out7"&&(this.eventLog=p.payload+`
`)}),this.noiseDevice.messageEvent.subscribe(p=>{p.tag==="out7"&&(this.eventLog=p.payload+`
`)}),this.slowlyFadeInAudio(3e3),this.isStartPlayRunning=!1}}};function j(e,i){return D(),e===f.Yes&&i===y.OverEar?.0562:e===f.No&&i===y.OverEar?.5623:e===f.Yes&&i===y.InEar?.0316:e===f.No&&i===y.InEar?.1778:.5623}const h=e=>(k("data-v-a3b949d6"),e=e(),B(),e),W={class:"container",style:{display:"flex","flex-wrap":"wrap",gap:"20px"}},q=h(()=>o("h1",null,"The component is currently not working regarding to the change of buffersource nodes to audioelement source nodes",-1)),J=h(()=>o("audio",{id:"hiddenAudio",controls:"",style:{display:"none"}},null,-1)),K=[J],Q=h(()=>o("audio",{id:"hiddenAudio",controls:"",style:{display:"none"}},null,-1)),X=[Q],Z={key:2,class:"spinner-border spinner-border-sm yellow",role:"status"},$=h(()=>o("span",{class:"sr-only"},'"Loading..."',-1)),ee=[$],ie={class:"row"},te={class:"slider"},ne=h(()=>o("div",{class:"icon"},[o("img",{style:{width:"25px"},src:L})],-1)),se={class:"row"},oe={class:"slider"},ae=h(()=>o("div",{class:"icon"},[o("img",{style:{width:"25px"},src:Y})],-1));function ue(e,i,t,u,n,r){return m(),g("div",W,[q,e.playing==!1?(m(),g("div",{key:0,class:"play yellow",onClick:i[0]||(i[0]=x((...s)=>r.startPlay&&r.startPlay(...s),["prevent"]))},K)):A("",!0),e.playing==!0&&n.isStartPlayRunning==!1?(m(),g("div",{key:1,class:"pause yellow",onClick:i[1]||(i[1]=x((...s)=>r.stopPlay&&r.stopPlay(...s),["prevent"]))},X)):A("",!0),n.isStartPlayRunning?(m(),g("div",Z,ee)):A("",!0),o("div",ie,[o("div",te,[ne,R(o("input",{id:"gain-control","onUpdate:modelValue":i[2]||(i[2]=s=>n.outputNoiseGain=s),type:"range",min:"0",max:"100",step:"1",onWheel:i[3]||(i[3]=(...s)=>r.changeNoiseGain&&r.changeNoiseGain(...s))},null,544),[[O,n.outputNoiseGain]])])]),o("div",se,[o("div",oe,[ae,R(o("input",{id:"gain-control","onUpdate:modelValue":i[4]||(i[4]=s=>n.outputMusicGain=s),type:"range",min:"0",max:"100",step:"1",onWheel:i[5]||(i[5]=(...s)=>r.changeMusicGain&&r.changeMusicGain(...s))},null,544),[[O,n.outputMusicGain]])])])])}const Ne=V(U,[["render",ue],["__scopeId","data-v-a3b949d6"]]);export{Ne as R};
