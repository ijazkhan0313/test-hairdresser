import{_ as w}from"./BvTjjB-h.js";import{_ as x,u as y,h as S,x as P,i as I,y as C,m as V,k as N,o as r,c as a,b as m,w as _,a as s,t as e,q as U,s as h,v as p,g as d,d as c,j as b,r as B,p as L,e as T}from"./C2egFmNW.js";import{b as R}from"./r3KgltJ0.js";const q={name:"LoGin",setup(){const{t:l}=y(),i=S(),g=P(),o=I(g.query.token);return C(()=>g.query.token,t=>{o.value=t}),{t:l,localePath:i,token:o}},data(){return{backgroundImagePath:R,loading:!1,errors:[],form:{first_name:"",surname:"",email:"",password:"",token:""}}},computed:{...V(b,["user"])},methods:{...N(b,["login","logout"]),submitRegister(){this.loading=!0,this.form.token=this.token,this.$axios.post("/api/register",this.form).then(({data:l})=>{this.loading=!1,this.$toast.success("Signup successfully...."),this.login(l.user,l.authorisation.token),this.$router.push(this.localePath("/onboarding"))}).catch(l=>{this.loading=!1,l.response.status===422&&(this.errors=l.response.data.errors,this.$toast.error(l.response.data.message))})}}},u=l=>(L("data-v-ed3a2b51"),l=l(),T(),l),A={class:"container-fluid"},E={class:"row"},M=u(()=>s("div",{class:"col-12 col-lg-4 bg-img d-none d-lg-block",style:{"background-image":"url('/images/login.svg')","background-size":"cover",height:"100vh"}},null,-1)),j={class:"col-12 col-lg-8 pt-4 px-3 px-sm-5 px-md-5 pb-5"},D=u(()=>s("div",{class:"row"},[s("div",{class:"col-12 py-3 text-center"},[s("svg",{width:"225",height:"32",viewBox:"0 0 225 32",fill:"none",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"},[s("rect",{width:"225",height:"32",fill:"url(#pattern0)"}),s("defs",null,[s("pattern",{id:"pattern0",patternContentUnits:"objectBoundingBox",width:"1",height:"1"},[s("use",{"xlink:href":"#image0_129_1673",transform:"matrix(0.000429185 0 0 0.0030177 0 -0.000938841)"})])])])])],-1)),F={class:"row",style:{height:"90vh"}},H={class:"col-12 my-auto"},z={class:"col-md-12 align-self-center"},G={class:"row pt-3 pb-5"},O={class:"row",style:{"margin-bottom":"24px"}},Y={class:"text-center pt-1"},J={class:"fw-bolder display-6 text-center"},K=u(()=>s("p",{class:"text-muted pt-2 text-center fs-5 singn-up-text pb-0 mb-0"},null,-1)),Q={class:"col-12"},W=["value"],X={class:"row px-0 px-md-4 pb-2"},Z={class:"col-12 pt-2 col-md-6 col-lg-6"},$={class:"form-label"},ss={key:0,class:"invalid-feedback d-block"},os={class:"col-12 pt-2 col-md-6 col-lg-6"},ts={class:"form-label"},es={key:0,class:"invalid-feedback d-block"},ls={class:"row px-0 px-md-4 pb-2"},is={class:"col-12 col-md-6 pt-2 col-lg-6"},ns={class:"form-label"},rs={key:0,class:"invalid-feedback d-block"},as={class:"col-12 pt-2 col-md-6 col-lg-6"},cs={class:"form-label"},ds={key:0,class:"invalid-feedback d-block"},ms={class:"row px-md-4 pt-3 pb-2"},_s={class:"col-12 col-md-10"},hs={class:"form-check"},ps=u(()=>s("input",{id:"flexCheckIndeterminate",class:"form-check-input",type:"checkbox",value:""},null,-1)),us={class:"form-check-label",for:"flexCheckIndeterminate"},gs={class:"row px-4 pt-3"},fs={class:"col-12"},vs=["disabled"],bs={key:0,class:"spinner-border spinner-border-sm",role:"status"},ks={class:"sr-only"},ws={class:"pt-3"};function xs(l,i,g,o,t,v){const f=w,k=B("video-background");return r(),a("div",null,[m(k,{src:"/video/bg-video.mp4",poster:"/images/poster.png",style:{height:"100vh"}},{default:_(()=>[s("div",A,[s("div",E,[M,s("div",j,[D,s("div",F,[s("div",H,[s("div",z,[s("div",G,[s("div",O,[s("div",Y,[s("h2",J,e(o.t("Hello,"))+" "+e(o.t("Sign Up Header")),1),K])]),s("div",Q,[s("form",{method:"POST",onSubmit:i[4]||(i[4]=U((...n)=>v.submitRegister&&v.submitRegister(...n),["prevent"]))},[s("input",{type:"hidden",name:"token",value:o.token},null,8,W),s("div",X,[s("div",Z,[s("label",$,e(o.t("First Name")),1),h(s("input",{"onUpdate:modelValue":i[0]||(i[0]=n=>t.form.first_name=n),type:"text",placeholder:"First Name",class:"form-control"},null,512),[[p,t.form.first_name]]),t.errors.first_name?(r(),a("div",ss,e(t.errors.first_name[0]),1)):d("",!0)]),s("div",os,[s("label",ts,e(o.t("Surname")),1),h(s("input",{"onUpdate:modelValue":i[1]||(i[1]=n=>t.form.surname=n),type:"text",placeholder:"Surname",class:"form-control"},null,512),[[p,t.form.surname]]),t.errors.surname?(r(),a("div",es,e(t.errors.surname[0]),1)):d("",!0)])]),s("div",ls,[s("div",is,[s("label",ns,e(o.t("Email")),1),h(s("input",{"onUpdate:modelValue":i[2]||(i[2]=n=>t.form.email=n),type:"email",placeholder:"Email",class:"form-control"},null,512),[[p,t.form.email]]),t.errors.email?(r(),a("div",rs,e(t.errors.email[0]),1)):d("",!0)]),s("div",as,[s("label",cs,e(o.t("Password")),1),h(s("input",{"onUpdate:modelValue":i[3]||(i[3]=n=>t.form.password=n),type:"password",placeholder:"Password",class:"form-control"},null,512),[[p,t.form.password]]),t.errors.password?(r(),a("div",ds,e(t.errors.password[0]),1)):d("",!0)])]),s("div",ms,[s("div",_s,[s("div",hs,[ps,s("label",us,[m(f,{class:"signup-link",to:o.localePath("/setting/termsandcondition")},{default:_(()=>[c(e(o.t("Terms & Conditions")),1)]),_:1},8,["to"]),c(" "+e(o.t("I agree to Mindboost's"))+" "+e(o.t("Terms & Conditions"))+" "+e(o.t("You can read about how we use and protect your information in our"))+" ",1),m(f,{class:"signup-link",to:o.localePath("/setting/dataprotection")},{default:_(()=>[c(e(o.t("Privacy Policy"))+". ",1)]),_:1},8,["to"])])])])]),s("div",gs,[s("div",fs,[s("button",{disabled:t.loading,type:"submit",style:{"min-width":"fit-content"},class:"login-btn fw-bold col-4"},[c(e(o.t("Signup"))+" ",1),t.loading?(r(),a("div",bs,[s("span",ks,e(o.t("Loading...")),1)])):d("",!0)],8,vs),s("p",ws,[c(e(o.t("Already have an Account?"))+" ",1),m(f,{class:"signup-link",to:o.localePath("/auth/login")},{default:_(()=>[c(e(o.t("Log In")),1)]),_:1},8,["to"])])])])],32)])])])])])])])])]),_:1})])}const Is=x(q,[["render",xs],["__scopeId","data-v-ed3a2b51"]]);export{Is as default};
