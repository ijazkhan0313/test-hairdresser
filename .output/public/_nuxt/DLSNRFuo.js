import{A as x}from"./lEC4QW_W.js";import{i as p}from"./O97EOHsH.js";import{i as f}from"./DQqw_gti.js";import{c as N}from"./C-QmXMO2.js";import{_ as v}from"./lXXSD6iP.js";import{_ as w}from"./evITL-mf.js";import{_ as G,o as h,c as g,a as u,d as _,t as T,l as S,w as A,g as C,r as E,p as y,e as k}from"./C2egFmNW.js";import"./C4iS2aBk.js";const V={components:{AudioElement:x},data(){return{audioList:[{id:1,title:"Lagoon",src:window.location.origin+"/sounds/lagoon.m4a"},{id:2,title:"Forest",src:window.location.origin+"/sounds/forest.m4a"},{id:3,title:"Meadow",src:window.location.origin+"/sounds/meadow.m4a"},{id:4,title:"Tropics",src:window.location.origin+"/sounds/tropics.m4a"}],noise:{id:5,title:"Noise",src:window.location.origin+"/masking/noise.flac"},selectedAudioTitle:"",currentElement:{},createdNodes:{},musicPatch:p,noisePatch:f,audioContext:null,playState:!1}},computed:{selectedAudio(){return this.audioList.find(e=>e.title===this.selectedAudioTitle)||null},isPlaying(){return this.playState}},beforeUnmount(){this.disconnectNodes(),this.audioContext&&this.audioContext.close(),this.audioContext=null},mounted(){this.audioContext=new AudioContext,this.selectAudioByTitle(this.audioList[0].title),this.addUserNavigationHandling(),this.musicPatch=p,this.noisePatch=f},methods:{checkAudioContext(){if(Object.keys(this.createdNodes).length===0)return!1;if(this.createdNodes.musicGain&&this.createdNodes.musicGain.context){const e=this.createdNodes.musicGain.context;return this.audioContext===e?!0:(e.state==="closed"||e.state==="suspended"||(this.audioContext=e),!1)}else return!1},changeNoiseVolume(e){this.createdNodes.noiseGain&&(this.createdNodes.noiseGain.gain.linearRampToValueAtTime(e,this.createdNodes.noiseGain.context.currentTime+.3),this.noiseGain=this.createdNodes.noiseGain.gain.value)},changeMusicVolume(e){this.createdNodes.musicGain&&(this.createdNodes.musicGain.gain.linearRampToValueAtTime(e,this.createdNodes.musicGain.context.currentTime+.3),this.musicGain=this.createdNodes.musicGain.gain.value)},addUserNavigationHandling(){"mediaSession"in navigator&&(navigator.mediaSession.setActionHandler("nexttrack",()=>{this.skip("next")}),navigator.mediaSession.setActionHandler("previoustrack",()=>{this.skip("previous")}))},getSong(e,s){let o=this.audioList.findIndex(t=>t.title===e)+(s==="next"?1:-1);return o>=this.audioList.length?o=0:o<0&&(o=this.audioList.length-1),this.audioList[o]},skip(e){const s=this.getSong(this.selectedAudioTitle,e);this.selectAudioByTitle(s.title)},updateCurrentElement(e){this.currentElement=this.audioList.find(s=>s.title===e)},selectAudioByTitle(e){this.selectedAudioTitle=e,this.currentElement=this.audioList[this.audioList.findIndex(s=>s.title===e)]},areAllNodesAvailable(){return["musicSource","musicSplitter","microphoneSource","musicDevice","outputSplitter","musicGain","noiseSource","noiseSplitter","noiseDevice","noiseGain","merger"].every(s=>this.createdNodes[s]!==void 0)},connectNodes(){const{musicSource:e,musicSplitter:s,microphoneSource:a,musicDevice:o,outputSplitter:t,musicGain:i,noiseSource:n,noiseSplitter:c,noiseDevice:d,noiseGain:r,merger:l}=this.createdNodes;e.connect(s),a.connect(o,0,0),s.connect(o,0,1),s.connect(o,1,2),o.connect(t),o.connect(i),n.connect(c),a.connect(d,0,0),c.connect(d,0,1),c.connect(d,1,2),t.connect(d,0,3),t.connect(d,1,4),d.connect(r),r.connect(l,0,0),r.connect(l,0,1),i.connect(l,0,2),i.connect(l,0,3),l.connect(l.context.destination)},handlePlayingUpdate(e){const s=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.oAudioContext||window.msAudioContext,a=this.audioContext?this.audioContext:new s;let o=null;if(e)if(this.areAllNodesAvailable()&&this.checkAudioContext()){this.disconnectNodes();const t=this.$refs[this.currentElement.title].$refs.audioElement,i=this.createdNodes.musicGain.value,n=this.createdNodes.noiseGain.value;this.$refs[this.currentElement.title].$refs.audioElement.muted=!1,this.$refs.Noise.$refs.audioElement.muted=!1,this.createdNodes.musicSource=null,this.createdNodes.musicSource=a.createMediaElementSource(t),this.connectNodes(),i>0&&i<=1&&this.createdNodes.musicGain.gain.linearRampToValueAtTime(i||1,a.currentTime+2),n>0&&n<=1&&this.createdNodes.noiseGain.gain.linearRampToValueAtTime(n||1,a.currentTime+3)}else navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1},video:!1}).then(t=>(o=this.audioContext.createMediaStreamSource(t),this.createdNodes.microphoneSource||=o,{audioContext:a,microphoneSource:o})).then(({audioContext:t,microphoneSource:i})=>N(t,this.noisePatch).then(n=>(this.createdNodes.noiseRNBODevice||=n,{audioContext:t,microphoneSource:i,noiseRNBODevice:n}))).then(({audioContext:t,microphoneSource:i,noiseRNBODevice:n})=>N(t,this.musicPatch).then(c=>(this.createdNodes.musicRNBODevice||=c,{audioContext:t,microphoneSource:i,noiseRNBODevice:n,musicRNBODevice:c}))).then(({audioContext:t,microphoneSource:i,noiseRNBODevice:n,musicRNBODevice:c})=>{const r=this.$refs[this.currentElement.title].$refs.audioElement;this.createdNodes||={},this.createdNodes.microphoneSource||=i,this.createdNodes.musicDevice||=c.node,this.createdNodes.noiseDevice||=n.node,this.createdNodes.noiseSource||=t.createMediaElementSource(this.$refs.Noise.$refs.audioElement),this.createdNodes.musicSource||=t.createMediaElementSource(r),this.createdNodes.musicSplitter||=t.createChannelSplitter(2),this.createdNodes.noiseSplitter||=t.createChannelSplitter(2),this.createdNodes.outputSplitter||=t.createChannelSplitter(2),this.createdNodes.musicGain||=t.createGain(),this.createdNodes.noiseGain||=t.createGain(),this.createdNodes.merger||=t.createChannelMerger(4),r.muted=!1,this.$refs.Noise.$refs.audioElement.muted=!1,this.createdNodes.musicGain.gain.value=1e-4,this.createdNodes.noiseGain.gain.value=1e-4,this.connectNodes(),setTimeout(()=>{this.playState=!0,this.createdNodes.musicGain.gain.exponentialRampToValueAtTime(1,t.currentTime+3),this.createdNodes.noiseGain.gain.exponentialRampToValueAtTime(1,t.currentTime+4)},150)}).catch(t=>{this.disconnectNodes(),this.audioContext&&this.audioContext.destination.disconnect()});else{this.disconnectNodes();const t=new AudioContext;this.audioContext.close(),this.audioContext=t}},disconnectNodes(){typeof this.createdNodes=="object"&&this.createdNodes!==null&&(Object.values(this.createdNodes).forEach(e=>{e&&typeof e.disconnect=="function"&&e.disconnect(),e instanceof OscillatorNode&&e.stop()}),this.playState=!1)}}},m=e=>(y("data-v-6d3610ac"),e=e(),k(),e),P=m(()=>u("h2",null,"Press Space to start, wait few seconds then the sound should start. You will hear the arifacts right after the music begins",-1)),U=m(()=>u("h2",null,"These file contain both patches, use Gainsliders of AudioElement to control volume and allow to skip. No AudioStore used",-1)),b={class:"rnboplayer"},L={key:0},M=m(()=>u("img",{style:{width:"25px"},src:v},null,-1)),D=m(()=>u("img",{style:{width:"25px"},src:w},null,-1));function B(e,s,a,o,t,i){const n=E("AudioElement");return h(),g("div",null,[P,U,u("div",b,[t.selectedAudioTitle?(h(),g("div",L,[_(T(i.selectedAudio.title)+" ",1),(h(),S(n,{ref:i.selectedAudio.title,key:i.selectedAudio.id,src:i.selectedAudio.src,title:i.selectedAudio.title,"onUpdate:playing":i.handlePlayingUpdate,"onUpdate:volume":i.changeMusicVolume},{default:A(({})=>[M]),_:1},8,["src","title","onUpdate:playing","onUpdate:volume"]))])):C("",!0),(h(),S(n,{ref:t.noise.title,key:t.noise.id,src:t.noise.src,title:t.noise.title,"onUpdate:volume":i.changeNoiseVolume},{default:A(({})=>[D]),_:1},8,["src","title","onUpdate:volume"])),u("button",{onClick:s[0]||(s[0]=(...c)=>i.skip&&i.skip(...c))}," Skip ")])])}const Y=G(V,[["render",B],["__scopeId","data-v-6d3610ac"]]);export{Y as default};
