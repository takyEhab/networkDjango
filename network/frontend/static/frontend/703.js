"use strict";(self.webpackChunkfullstacknetwork=self.webpackChunkfullstacknetwork||[]).push([[703],{6562:(e,t,n)=>{n.d(t,{Z:()=>b});var r=n(885),o=n(7294),a=n(5295),i=n(8515),l=n(2643),s=n(9161),c=n(7109),u=n(6867),f=n(2658),m=n(6949),d=n(6111),p=n(3484),g=n(3727),h=n(2986),Z=n(1732),w=n(6914),E=n(6186),v=n(4776),y=n(7957),k=n(9571);function b(e){var t=(0,o.useContext)(p.S),n=t.state,b=t.refresh,S=t.CONFIG,x=(0,o.useState)(null),C=(0,r.Z)(x,2),I=C[0],L=C[1],A=(0,o.useState)(e.post.post),T=(0,r.Z)(A,2),D=T[0],F=T[1],P=o.useState(!1),U=(0,r.Z)(P,2),O=U[0],_=U[1],G=(0,o.useState)(!0),j=(0,r.Z)(G,2),q=j[0],z=j[1],M=(0,k.Ds)().enqueueSnackbar;(0,o.useEffect)((function(){e.post.UsersLikes.includes(n.isLogedIn&&n.myInfo.id)?L(!0):L(!1)}),[n.isLogedIn]);var N=function(){"main"===e.from?b():"following"===e.from?e.getFollowingPosts():e.GetUserPosts()};return o.createElement(a.Z,{style:{textAlign:"center",width:"auto",margin:"auto",marginTop:"2%"},sx:{maxWidth:550}},o.createElement(i.Z,{avatar:o.createElement(g.rU,{style:{textDecoration:"initial"},to:"/profile/".concat(e.post.writer)},o.createElement(c.Z,{sx:{bgcolor:m.Z[500]},"aria-label":"recipe"},e.post.writer.charAt(0).toUpperCase())),action:n.isLogedIn&&(n.myInfo.username===e.post.writer?o.createElement(u.Z,{onClick:function(){return z(!q)}},o.createElement(y.Z,null)):""),title:e.post.writer,subheader:e.post.created_at}),o.createElement(l.Z,null,q?o.createElement(f.Z,{variant:"body2",color:"text.secondary"},e.post.post):o.createElement(o.Fragment,null,o.createElement(Z.Z,{id:"outlined-multiline-static",value:D,multiline:!0,rows:5,style:{width:"100%",marginTop:"1%"},onChange:function(e){F(e.target.value)}}),o.createElement(w.Z,{onClick:function(){var t,n;D.length>5?(t=D,n=e.post.id,h.h.patch("posts/".concat(n,"/"),{post:t},S).then((function(){return N()})),M("Post Edited!",{variant:"info"}),z(!0)):_(!0)}},"Save"),o.createElement(v.Z,{direction:"up",in:O,mountOnEnter:!0,unmountOnExit:!0},o.createElement(E.Z,{severity:"warning"},"you should at least type 5 letters")))),o.createElement(s.Z,{disableSpacing:!0},o.createElement(u.Z,{onClick:function(){var t;n.isLogedIn&&(L(!I),t=e.post.id,h.h.patch("posts/".concat(t,"/like/"),{},S).then((function(){return N()})))},style:{color:I?"red":"gray"},"aria-label":"add to favorites"},o.createElement(d.Z,null),0==e.post.likes?"":e.post.likes)))}},6703:(e,t,n)=>{n.r(t),n.d(t,{default:()=>g});var r=n(907),o=n(181);var a=n(5861),i=n(885),l=n(7757),s=n.n(l),c=n(7294),u=n(3484),f=n(2986),m=n(6562),d=n(6492),p=n(9041);const g=function(){var e=(0,c.useContext)(u.S).state,t=(0,c.useState)("loading"),n=(0,i.Z)(t,2),l=n[0],g=n[1],h=(0,c.useState)(""),Z=(0,i.Z)(h,2),w=Z[0],E=Z[1],v=(0,c.useState)(1),y=(0,i.Z)(v,2),k=y[0],b=y[1];(0,c.useEffect)((0,a.Z)(s().mark((function e(){return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:S();case 1:case"end":return e.stop()}}),e)}))),[w]),(0,c.useEffect)((function(){e.isLogedIn&&e.myInfo.following.forEach((function(e){E((function(t){return[].concat(function(e){if(Array.isArray(e))return(0,r.Z)(e)}(n=t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(n)||(0,o.Z)(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[e.following_user_id]);var n}))}))}),[e.myInfo]);var S=(0,c.useCallback)((0,a.Z)(s().mark((function e(){var t,n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.h.get("posts/").then((function(e){return e.data}));case 2:t=e.sent,n=t.filter((function(e){return w.includes(e.writer)})),g(n);case 5:case"end":return e.stop()}}),e)}))),[w]),x=10*k,C=x-10,I=Math.ceil((null!==l&&"loading"!==l&&l.length)/10);return c.createElement("div",null,null!==l&&"loading"!==l&&l.sort((function(e,t){return new Date(e.id)-new Date(t.id)})).slice(C,x).map((function(e,t){return c.createElement(m.Z,{key:t,post:e,from:"following",getFollowingPosts:S})})),"loading"===l?c.createElement(p.Z,{sx:{marginTop:"10%"}}):c.createElement(d.Z,{size:"large",count:I,page:k,onChange:function(e,t){b(t),window.scrollTo({top:0,behavior:"smooth"})}}))}}}]);