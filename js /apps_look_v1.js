!function(e){var n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=0)}([function(e,n){const r=window.w_a_url.replace(/\/+$/,"")+"/get_order",t=Number(window.vk_a_group),o=(window.vk_a_group,window.order_a);let a;var i;const c=window.not_a_g_url,p=window.not_a_o_url,u=window.location.href,d=new URL(window.location.href).searchParams.get("vk_app_id");function l(e){$.get(e,(function(e){$("#apps_look_vk").html(e)})).fail((function(e,n,r){console.error("Ошибка загрузки контента:",r)}))}function s(){const e=new URL(c);e.searchParams.append("apps_id",d),e.searchParams.append("fullUrl",u),l(e.toString())}function f(){const e=new URL(p);e.searchParams.append("apps_id",d),e.searchParams.append("fullUrl",u),l(e.toString())}window.onload=function(){vkBridge.send("VKWebAppInit"),vkBridge.send("VKWebAppAllowMessagesFromGroup",{group_id:t,key:"cc964fabb0e1d70924a92e4e8b513dbff7cc10a9"}).then(e=>{e.result?vkBridge.send("VKWebAppGetUserInfo").then(e=>{a=e.id,function(){const e=r,n=new FormData;n.append("vk_id",a),n.append("order",o),n.append("apps_id",d),n.append("fullUrl",u),fetch(e,{method:"POST",body:n}).then(e=>{if(!e.ok)throw new Error("Ошибка HTTP: "+e.status);return e.json()}).then(e=>{const n=e[o];n&&"not"!==n?(i=n,function(){const e=new URL(i);e.searchParams.append("apps_id",d),e.searchParams.append("fullUrl",u),l(e.toString())}()):f()}).catch(e=>{f()})}()}).catch(e=>{s()}):s()}).catch(e=>{s()})}}]);