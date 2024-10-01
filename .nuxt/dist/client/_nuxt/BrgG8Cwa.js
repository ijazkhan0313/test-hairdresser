import{A as S}from"./lEC4QW_W.js";import{i as f}from"./O97EOHsH.js";import{i as N}from"./DQqw_gti.js";import{u as m,c as g}from"./C-QmXMO2.js";import{_ as x}from"./evITL-mf.js";import{_ as G}from"./lXXSD6iP.js";import{_ as v,r as w,o as l,c as C,d as _,a as u,l as p,w as A,F as E,p as V,e as y}from"./C2egFmNW.js";import"./C4iS2aBk.js";const L={components:{AudioElement:S},props:{soundscape:{type:String,default:"Lagoon"}},data(){return{audioList:[{id:1,title:"Lagoon",src:window.location.origin+"/sounds/lagoon.m4a"},{id:2,title:"Forest",src:window.location.origin+"/sounds/forest.m4a"},{id:3,title:"Meadow",src:window.location.origin+"/sounds/meadow.m4a"},{id:4,title:"Tropics",src:window.location.origin+"/sounds/tropics.m4a"}],noise:{id:5,title:"Noise",src:window.location.origin+"/masking/noise.flac"},selectedAudioTitle:"",currentElement:{},createdNodes:{},musicPatch:f,noisePatch:N,audioContext:m().getContext()}},computed:{selectedAudio(){return this.audioList.find(e=>e.title===this.selectedAudioTitle)||null}},beforeUnmount(){this.disconnectNodes(),this.audioContext&&this.audioContext.close(),this.audioContext=null},beforeMount(){this.audioContext=new AudioContext},mounted(){this.soundscape&&(this.audioList=this.audioList.filter(e=>e.title.toLowerCase()===this.soundscape.toLowerCase())),this.selectAudioByTitle(this.audioList[0].title),this.currentElement=this.audioList[0],this.addUserNavigationHandling(),this.musicPatch=f,this.noisePatch=N},methods:{fadeOutGains(){const i=this.audioContext.currentTime,n=i+2;this.fading=!0,this.createdNodes.noiseGain&&(this.createdNodes.noiseGain.gain.cancelScheduledValues(i),this.createdNodes.noiseGain.gain.setValueAtTime(this.createdNodes.noiseGain.gain.value,i),this.createdNodes.noiseGain.gain.linearRampToValueAtTime(0,n)),this.createdNodes.musicGain&&(this.createdNodes.musicGain.gain.cancelScheduledValues(i),this.createdNodes.musicGain.gain.setValueAtTime(this.createdNodes.musicGain.gain.value,i),this.createdNodes.musicGain.gain.linearRampToValueAtTime(0,n)),setTimeout(()=>{this.fading=!1},2*1e3)},refreshAudioContext(){const e=new AudioContext;this.audioContext.close(),m().audioContext=e,this.audioContext=m().getContext()},changeMusicVolume(e){this.createdNodes.musicGain.gain&&(this.createdNodes.musicGain.gain.cancelScheduledValues(this.createdNodes.musicGain.context.currentTime),this.createdNodes.musicGain.gain.setValueAtTime(e,this.createdNodes.musicGain.context.currentTime+.01))},changeNoiseVolume(e){this.createdNodes.noiseGain.gain&&this.createdNodes.noiseGain.gain.setValueAtTime(e,this.createdNodes.noiseGain.context.currentTime+.01)},addUserNavigationHandling(){"mediaSession"in navigator&&(navigator.mediaSession.setActionHandler("nexttrack",()=>{this.skip("next")}),navigator.mediaSession.setActionHandler("previoustrack",()=>{this.skip("previous")}))},getSong(e,i){let s=this.audioList.findIndex(t=>t.title===e)+(i==="next"?1:-1);return s>=this.audioList.length?s=0:s<0&&(s=this.audioList.length-1),this.audioList[s]},skip(e){const i=this.getSong(this.selectedAudioTitle,e);this.selectAudioByTitle(i.title)},updateCurrentElement(e){this.currentElement=this.audioList.find(i=>i.title===e)},selectAudioByTitle(e){this.selectedAudioTitle=e,this.currentElement=this.audioList[this.audioList.findIndex(i=>i.title===e)]},areAllNodesAvailable(){return["musicSource","musicSplitter","microphoneSource","musicDevice","outputSplitter","musicGain","noiseSource","noiseSplitter","noiseDevice","noiseGain","merger"].every(i=>this.createdNodes[i]!==void 0)},connectNodes(){const{musicSource:e,musicSplitter:i,microphoneSource:n,musicDevice:s,outputSplitter:t,musicGain:o,noiseSource:a,noiseSplitter:c,noiseDevice:d,noiseGain:h,merger:r}=this.createdNodes;e.connect(i),n.connect(s,0,0),i.connect(s,0,1),i.connect(s,1,2),s.connect(t),s.connect(o),a.connect(c),n.connect(d,0,0),c.connect(d,0,1),c.connect(d,1,2),t.connect(d,0,3),t.connect(d,1,4),d.connect(h),h.connect(r,0,0),h.connect(r,0,1),o.connect(r,0,2),o.connect(r,0,3),r.connect(r.context.destination)},handlePlayingUpdate(e){const i=window.AudioContext||window.webkitAudioContext||window.mozAudioContext||window.oAudioContext||window.msAudioContext;let n=this.audioContext?this.audioContext:new i,s=null;e?this.areAllNodesAvailable()?(this.disconnectNodes(),this.connectNodes(),this.createdNodes.noiseGain.gain.linearRampToValueAtTime(0,this.audioContext.currentTime),this.createdNodes.musicGain.gain.linearRampToValueAtTime(0,this.audioContext.currentTime),this.createdNodes.noiseGain.gain.linearRampToValueAtTime(1,this.audioContext.currentTime+2),this.createdNodes.musicGain.gain.linearRampToValueAtTime(1,this.audioContext.currentTime+3)):navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1},video:!1}).then(t=>(n=this.audioContext,s=n.createMediaStreamSource(t),this.createdNodes.microphoneSource||=s,{audioContext:n,microphoneSource:s})).then(({audioContext:t,microphoneSource:o})=>g(t,this.noisePatch).then(a=>(this.createdNodes.noiseRNBODevice||=a,{audioContext:t,microphoneSource:o,noiseRNBODevice:a}))).then(({audioContext:t,microphoneSource:o,noiseRNBODevice:a})=>g(t,this.musicPatch).then(c=>(this.createdNodes.musicRNBODevice||=c,{audioContext:t,microphoneSource:o,noiseRNBODevice:a,musicRNBODevice:c}))).then(({audioContext:t,microphoneSource:o,noiseRNBODevice:a,musicRNBODevice:c})=>{this.createdNodes||={},this.createdNodes.microphoneSource||=o,this.createdNodes.musicDevice||=c.node,this.createdNodes.noiseDevice||=a.node,this.createdNodes.noiseSource||=t.createMediaElementSource(this.$refs.Noise.$refs.audioElement),this.createdNodes.musicSource||=t.createMediaElementSource(this.$refs[this.currentElement.title].$refs.audioElement),this.createdNodes.musicSplitter||=t.createChannelSplitter(2),this.createdNodes.noiseSplitter||=t.createChannelSplitter(2),this.createdNodes.outputSplitter||=t.createChannelSplitter(2),this.createdNodes.musicGain||=t.createGain(),this.createdNodes.noiseGain||=t.createGain(),this.createdNodes.merger||=t.createChannelMerger(4),this.createdNodes.musicGain.gain.value=.001,this.createdNodes.noiseGain.gain.value=.001,this.connectNodes(),setTimeout(()=>{this.createdNodes.musicGain.gain.exponentialRampToValueAtTime(.5,t.currentTime+3),this.createdNodes.noiseGain.gain.exponentialRampToValueAtTime(.5,t.currentTime+4)},150)}).catch(t=>{this.disconnectNodes(),this.refreshAudioContext(),this.audioContext&&this.audioContext.destination.disconnect()}):(this.disconnectNodes(),this.refreshAudioContext())},disconnectNodes(){typeof this.createdNodes=="object"&&this.createdNodes!==null&&Object.values(this.createdNodes).forEach(e=>{e&&typeof e.disconnect=="function"&&e.disconnect(),e instanceof OscillatorNode&&e.stop()})}}},T=e=>(V("data-v-f84a2711"),e=e(),y(),e),U={class:"rnboplayer"},M=T(()=>u("div",{class:"icon"},[u("img",{style:{width:"25px"},src:x})],-1)),k=T(()=>u("div",{class:"icon"},[u("img",{style:{width:"25px"},src:G})],-1));function D(e,i,n,s,t,o){const a=w("AudioElement");return l(),C(E,null,[_(" AudioElementManager "),u("div",U,[(l(),p(a,{ref:t.noise.title,key:t.noise.id,src:t.noise.src,title:t.noise.title,"onUpdate:volume":e.updateNoiseGain,"onUpdate:loaded":i[0]||(i[0]=c=>e.noiseReady=!0)},{default:A(({})=>[M]),_:1},8,["src","title","onUpdate:volume"])),(l(),p(a,{ref:o.selectedAudio.title,key:o.selectedAudio.id,src:o.selectedAudio.src,title:o.selectedAudio.title,"onUpdate:volume":e.updateMusicGain,"onUpdate:playing":o.handlePlayingUpdate,"onUpdate:fadeout":o.fadeOutGains,"onUpdate:loaded":i[1]||(i[1]=c=>e.musicReady=!0)},{default:A(({})=>[k]),_:1},8,["src","title","onUpdate:volume","onUpdate:playing","onUpdate:fadeout"]))])],64)}const R=v(L,[["render",D],["__scopeId","data-v-f84a2711"]]),q={__name:"AudioElementManager2",setup(e){return(i,n)=>(l(),p(R))}};export{q as default};
