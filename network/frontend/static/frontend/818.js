"use strict";(self.webpackChunkfullstacknetwork=self.webpackChunkfullstacknetwork||[]).push([[818],{4818:(e,t,a)=>{a.r(t),a.d(t,{default:()=>W});var r=a(5861),n=a(885),s=a(7757),l=a.n(s),o=a(7294),m=a(7109),i=a(6914),c=a(6720),u=a(1732),d=a(6634),p=a(5725),E=a(1508),f=a(3845),Z=a(2658),w=a(4065),g=a(6186),h=a(4776),x=a(3034),v=a(5974),y=a(5977),b=a(9571),k=a(2986),P=a(3484),C=(0,x.Z)();function W(e){var t=(0,o.useContext)(P.S).dispatch,a=(0,b.Ds)().enqueueSnackbar,s=(0,y.k6)(),x=o.useState({message:"",close:!1,isError:!1}),W=(0,n.Z)(x,2),q=W[0],S=W[1],D=function(){var e=(0,r.Z)(l().mark((function e(r,n,o,m){var i,c,u,d,p;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k.h.post("register/",{username:r,email:n,password:o,password2:m});case 3:i=e.sent,localStorage.setItem("knox",i.data.token),t({type:"LogedIn",payload:i.data.user}),a("you are registered successfully!",{variant:"success"}),s.push("/"),e.next=14;break;case 10:if(e.prev=10,e.t0=e.catch(0),c=e.t0.response)for(u=c.data,d=["username","password","email"],p=0;p<d.length;p++)u[d[p]]&&S({close:!1,isError:!0,message:u[d[p]].isArray?u[d[p]][0]:u[d[p]]});case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,a,r,n){return e.apply(this,arguments)}}();return o.createElement(v.Z,{theme:C},o.createElement(w.Z,{component:"main",maxWidth:"xs"},o.createElement(c.ZP,null),o.createElement(E.Z,{sx:{marginTop:8,display:"flex",flexDirection:"column",alignItems:"center"}},o.createElement(m.Z,{sx:{m:1,bgcolor:"secondary.main"}},o.createElement(f.Z,null)),o.createElement(Z.Z,{component:"h1",variant:"h5"},"Register"),o.createElement(E.Z,{component:"form",validate:!0,onSubmit:function(e){S({isError:!1,message:"",close:!0}),e.preventDefault();var t=new FormData(e.currentTarget);D(t.get("username"),t.get("email"),t.get("password"),t.get("password2"))},sx:{mt:3}},o.createElement(p.ZP,{container:!0,spacing:2},o.createElement(p.ZP,{item:!0,xs:12},o.createElement(u.Z,{autoComplete:"given-name",name:"username",required:!0,fullWidth:!0,id:"username",label:"Username",autoFocus:!0})),o.createElement(p.ZP,{item:!0,xs:12},o.createElement(u.Z,{required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",type:"email",autoComplete:"email"})),o.createElement(p.ZP,{item:!0,xs:12},o.createElement(u.Z,{required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"new-password"})),o.createElement(p.ZP,{item:!0,xs:12},o.createElement(u.Z,{required:!0,fullWidth:!0,name:"password2",label:"Password Confirmation",type:"password",id:"password",autoComplete:"new-password"}))),o.createElement(h.Z,{direction:"up",in:q.isError,mountOnEnter:!0,unmountOnExit:!0},o.createElement(g.Z,{severity:"error"},q.message)),o.createElement(i.Z,{disabled:q.close,hidden:!0,type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2}},"Register"),o.createElement(p.ZP,{container:!0,justifyContent:"flex-end"},o.createElement(p.ZP,{item:!0},o.createElement(d.Z,{href:"/login",variant:"body2"},"Already have an account? Log In")))))))}}}]);