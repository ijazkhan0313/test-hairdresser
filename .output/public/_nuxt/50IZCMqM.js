import{_ as l}from"./BvTjjB-h.js";import{_ as v,u as f,h as y,m as d,k as c,o as w,c as M,b as a,w as m,a as o,n as S,t as h,a7 as k,r as A}from"./C2egFmNW.js";import{u as i}from"./BVasKSaO.js";import{u}from"./C-QmXMO2.js";import{u as _}from"./Cq3l7X6R.js";import{_ as P}from"./Bll8vgP_.js";import"./C4iS2aBk.js";const C={setup(){const{t:e}=f(),t=y();return{t:e,localePath:t}},data(){return{bar_val:25,bar_width:0,analyser:null,dataArray:null}},computed:{...d(i,["count"]),...d(u,["audioContext"])},beforeUnmount(){_().detachMicrophoneSource()},mounted(){try{this.getAudioContext().then(async e=>{const s=(await _().getMicrophone()).microphoneNode;this.analyser=e.createAnalyser(),s.connect(this.analyser),this.analyser.fftSize=2048;const n=this.analyser.frequencyBinCount;this.dataArray=new Uint8Array(n),this.updateMeter()})}catch{this.$toast.error("Error connecting to the microphone")}},methods:{...c(i,["increment"]),...c(i,["decrement"]),...c(u,["getAudioContext"]),updateMeter(){requestAnimationFrame(this.updateMeter),this.analyser.getByteFrequencyData(this.dataArray);const e=this.getRMS(this.dataArray);let t=20*Math.log10(e/128);t=Math.max(0,Math.min(100,t+100)),this.bar_width=t},getRMS(e){let t=0;for(let s=0;s<e.length;s++)t+=e[s]*e[s];return t/=e.length,t=Math.sqrt(t),t}}},B={class:"container-fluid pt-3"},N={class:"row"},q={class:"col-12 col-lg-3 text-center text-sm-start"},z=o("img",{src:P,height:"35",class:"img",alt:"imae"},null,-1),L={class:"col-12 text-center d-flex justify-content-center col-lg-12 pt-1"},D={class:"progress mx-auto mt-2",style:{width:"50%",height:"12px"}},E={class:"col-12 pt-3"},F={class:"text-muted text-center"},R={class:"row pt-5 mt-0 mt-sm-4",style:{position:"fixed",bottom:"0px",left:"0",right:"0"}},U={class:"col-12 text-center pt-5 mt-3 pb-2 mb-2"},V={class:"text-muted text-center pt-3"};function j(e,t,s,n,p,I){const x=l,g=k,r=l,b=A("video-background");return w(),M("div",null,[a(b,{src:"/video/bg-video.mp4",style:{height:"100vh"},poster:"/images/poster.png"},{default:m(()=>[o("div",B,[o("div",N,[o("div",q,[a(x,{class:"navbar-brand",to:"/"},{default:m(()=>[z]),_:1})]),o("div",L,[o("div",D,[o("div",{class:"progress-bar bar",style:S([{transition:"0.1s !important"},{width:p.bar_width+"%"}]),role:"progressbar","aria-valuenow":"0","aria-valuemin":"0","aria-valuemax":"100"},null,4)])]),o("div",E,[o("h6",F,h(n.t("We are analyzing your background noise...")),1)])]),a(g,{"page-key":"child"}),o("div",R,[o("div",U,[a(r,{class:"btn btn-warning px-2 mx-1","exact-active-class":"px-4 mx-2",to:n.localePath("/onboarding/selectinput")},null,8,["to"]),a(r,{class:"btn btn-warning px-2","exact-active-class":"px-4 mx-2",to:n.localePath("/onboarding")},null,8,["to"]),a(r,{class:"btn btn-warning px-2 mx-2","exact-active-class":"px-4 mx-2",to:n.localePath("/onboarding/onboarding2")},null,8,["to"]),a(r,{class:"btn btn-warning px-2","exact-active-class":"px-4 mx-2",to:n.localePath("/onboarding/onboarding3")},null,8,["to"]),a(r,{class:"btn btn-warning px-2 mx-2","exact-active-class":"px-4 mx-2",to:n.localePath("/onboarding/onboarding4")},null,8,["to"]),o("h6",V,h(n.t("You can customize your selection later")),1)])])])]),_:1})])}const Q=v(C,[["render",j]]);export{Q as default};
