(function(e){function t(t){for(var r,o,a=t[0],u=t[1],s=t[2],l=0,f=[];l<a.length;l++)o=a[l],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&f.push(i[o][0]),i[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(t);while(f.length)f.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,o=1;o<n.length;o++){var a=n[o];0!==i[a]&&(r=!1)}r&&(c.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={app:0},i={app:0},c=[];function a(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-2d0c94bf":"a1529fc2","chunk-2d0e13fc":"ff1151a8","chunk-2d2290a4":"34968255","chunk-622d682f":"83131143","chunk-64e10d25":"d3d3e910","chunk-6f6c6c5c":"831ed2b7"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-622d682f":1,"chunk-64e10d25":1,"chunk-6f6c6c5c":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d0c94bf":"31d6cfe0","chunk-2d0e13fc":"31d6cfe0","chunk-2d2290a4":"31d6cfe0","chunk-622d682f":"820bf27e","chunk-64e10d25":"321e20bb","chunk-6f6c6c5c":"a4685e0c"}[e]+".css",i=u.p+r,c=document.getElementsByTagName("link"),a=0;a<c.length;a++){var s=c[a],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===i))return t()}var f=document.getElementsByTagName("style");for(a=0;a<f.length;a++){s=f[a],l=s.getAttribute("data-href");if(l===r||l===i)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||i,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete o[e],d.parentNode.removeChild(d),n(c)},d.href=i;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=i[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=i[e]=[t,n]}));t.push(r[2]=c);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=a(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=i[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}i[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"058e":function(e,t,n){},"2b19":function(e,t,n){"use strict";n("f6e5")},"981c":function(e,t,n){"use strict";n("9911");var r=n("7a23");Object(r["w"])("data-v-3933aeda");var o={id:"Header"},i={class:"container"},c={class:"links"};function a(e,t,n,a,u,s){var l=Object(r["B"])("router-link");return Object(r["t"])(),Object(r["f"])("div",o,[Object(r["g"])("div",i,[Object(r["g"])("ul",c,[(Object(r["t"])(!0),Object(r["f"])(r["a"],null,Object(r["z"])(e.links,(function(e,t){return Object(r["t"])(),Object(r["f"])("li",{key:t},[Object(r["i"])(l,{to:e.link},{default:Object(r["I"])((function(){return[Object(r["h"])(Object(r["D"])(e.label),1)]})),_:2},1032,["to"])])})),128))])])])}Object(r["u"])();var u=Object(r["j"])({data:function(){return{links:[{link:"/",label:"Home"},{link:"/forum",label:"Forum"},{link:"/login",label:"Login"}]}},computed:{},methods:{}});n("2b19");u.render=a,u.__scopeId="data-v-3933aeda";t["a"]=u},a78d:function(e,t,n){},b737:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23");function o(e,t){var n=Object(r["B"])("router-view");return Object(r["t"])(),Object(r["d"])(n)}const i={};i.render=o;var c=i,a=n("9483");Object(a["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("d3b7"),n("3ca3"),n("ddb0");var u=n("6c02"),s={class:"home"},l=Object(r["g"])("div",{class:"container"}," home ",-1);function f(e,t,n,o,i,c){var a=Object(r["B"])("Header");return Object(r["t"])(),Object(r["f"])("div",s,[Object(r["i"])(a,{logo:i.logoLink,links:e.links},null,8,["logo","links"]),l])}var d=n("981c"),p={components:{Header:d["a"]},data:function(){return{logoLink:"./../assets/logo.png"}}};p.render=f;var h=p,m=[{path:"/",name:"Home",component:h},{path:"/login",name:"Login",component:function(){return n.e("chunk-622d682f").then(n.bind(null,"a55b"))}},{path:"/game",name:"Game",component:function(){return n.e("chunk-6f6c6c5c").then(n.bind(null,"88e6"))}},{path:"/forum",name:"Forum",component:function(){return n.e("chunk-2d0c94bf").then(n.bind(null,"5916"))}},{path:"/game/user/info",name:"User info",component:function(){return n.e("chunk-64e10d25").then(n.bind(null,"0562"))}},{path:"/game/user/skills",name:"User skills",component:function(){return n.e("chunk-2d0e13fc").then(n.bind(null,"7a40"))}},{path:"/game/user/backpack",name:"User backpack",component:function(){return n.e("chunk-2d2290a4").then(n.bind(null,"dc6e"))}}],b=Object(u["a"])({history:Object(u["b"])("/"),routes:m}),g=b,v=n("5502"),k=n("1da1"),j=(n("96cf"),n("99af"),{name:"",loaded:!1,profile_picture:"",lvl:0,experience:0,class_id:0,base_strength:0,base_stamina:0,base_agility:0,base_wisdom:0,base_luck:0,free_attributes:0,inventory_head:0,inventory_boots:0,inventory_left_hand:0,inventory_right_hand:0,inventory_neck:0,calculated_health:0,calculated_mana:0,calculated_weight:0,current_health:0,current_mana:0,current_weight:0}),y={state:j,mutations:{updateUserData:function(e,t){for(var n in t)e[n]=t[n];e.loaded=!0}},actions:{doLogin:function(e,t){var n=e.commit;return new Promise((function(e,r){fetch("/api/users/login?login=".concat(t.login,"&password=").concat(t.password)).then((function(e){if(!e.ok)throw e.text();return e.json()})).then((function(r){r.session_id&&(document.cookie="session_id=".concat(r.session_id)),n("updateUserData",{login:t.login}),e(r)})).catch(function(){var e=Object(k["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=r,e.next=3,t;case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))},getProfile:function(e){var t=e.commit;return new Promise((function(e,n){fetch("/api/users/").then((function(e){if(!e.ok)throw e.text();return e.json()})).then((function(n){t("updateUserData",n),e(n)})).catch(function(){var e=Object(k["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=n,e.next=3,t;case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))},checkStatus:function(e){e.commit;return new Promise((function(e,t){fetch("/api/users/get_status/").then((function(e){if(!e.ok)throw e.text();return e.json()})).then((function(t){e(t)})).catch(function(){var e=Object(k["a"])(regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=t,e.next=3,n;case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))},useRoute:function(e,t){return new Promise((function(e,n){fetch("/api/users/go/?location_id=".concat(t)).then((function(t){if(!t.ok)throw t.text();return e(t.json())})).catch(function(){var e=Object(k["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=n,e.next=3,t;case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))},requestAttributesChange:function(e,t){return new Promise((function(n,r){fetch("/api/users/set_attributes/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){if(!e.ok)throw e.text();return e.json()})).then((function(t){e.commit("updateUserData",t),n(t)})).catch(function(){var e=Object(k["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=r,e.next=3,t;case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))}}},w=(n("b0c0"),n("a4d3"),n("e01a"),{id:0,time:0,name:""}),O={id:0,name:"",description:"",neighbours:[w]},_={state:O,mutations:{updateLocation:function(e,t){for(var n in t)e[n]=t[n]}},actions:{getLocationData:function(e){var t=e.commit;return new Promise((function(e,n){fetch("/api/location/").then((function(e){if(!e.ok)throw e.text();return e.json()})).then((function(n){t("updateLocation",{id:n.id,name:n.name,description:n.description,neighbours:n.neighbours}),e(n)})).catch(function(){var e=Object(k["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.t0=n,e.next=3,t;case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))}},getters:{getLocationInfo:function(e){return{id:e.id,name:e.name,description:e.description}},getLocationNeighbours:function(e){return e.neighbours}}},x=Object(v["a"])({modules:{user:y,location:_},state:{preloader:!1},mutations:{setPreloader:function(e,t){e.preloader=t}}});Object(r["w"])("data-v-687da569");var P={class:"popup-content"};function A(e,t,n,o,i,c){return Object(r["t"])(),Object(r["f"])("div",{class:Object(r["o"])(["popup",{"animate-in":!0===e.isAnimating,"animate-out":!1===e.isAnimating,"animation-in-end":null===e.isAnimating&&!0===e.visibility,"animation-out-end":null===e.isAnimating&&!1===e.visibility}]),onMousedown:t[4]||(t[4]=function(){return e.close&&e.close.apply(e,arguments)}),style:Object(r["p"])({transition:"".concat(e.animationDuration,"ms")})},[Object(r["g"])("div",{class:"popup-table",onMousedown:t[3]||(t[3]=function(){return e.close&&e.close.apply(e,arguments)})},[Object(r["g"])("div",{class:"popup-content-row",onMousedown:t[2]||(t[2]=function(){return e.close&&e.close.apply(e,arguments)})},[Object(r["g"])("div",{class:"popup-content-cell",onMousedown:t[1]||(t[1]=function(){return e.close&&e.close.apply(e,arguments)})},[Object(r["g"])("div",P,[e.closerVisibility?(Object(r["t"])(),Object(r["f"])("div",{key:0,class:"popup-closer",onMousedown:t[0]||(t[0]=function(){return e.close&&e.close.apply(e,arguments)})},null,32)):Object(r["e"])("",!0),Object(r["A"])(e.$slots,"default",{},void 0,!0)])],32)],32)],32)],38)}Object(r["u"])();n("a9e3");var L=Object(r["j"])({props:{closerVisibility:{type:Boolean,default:!0},visibility:{type:Boolean,default:!1},animationDuration:{type:Number,default:300}},data:function(){return{isAnimating:null,timeoutFunc:null}},methods:{close:function(e){e.stopPropagation(),e.target===e.currentTarget&&this.$emit("popupVisibilityChange",!1)},changeVisibility:function(e){var t=this;this.isAnimating=e,"function"===typeof this.timeoutFunc&&clearTimeout(this.timeoutFunc),this.timeoutFunc=setTimeout((function(){t.isAnimating=null}),this.animationDuration)}},watch:{visibility:{handler:function(e){this.changeVisibility(e)}}}});n("e60f");L.render=A,L.__scopeId="data-v-687da569";var S=L;n("0953"),n("058e"),n("a78d");!localStorage.theme&&(localStorage.theme="dark"),"dark"===localStorage.theme&&document.body.classList.add("theme-dark"),"light"===localStorage.theme&&document.body.classList.add("theme-light"),Object(r["c"])(c).use(x).use(g).component("Popup",S).mount("#app")},e60f:function(e,t,n){"use strict";n("b737")},f6e5:function(e,t,n){}});
//# sourceMappingURL=app.0753b4b8.js.map