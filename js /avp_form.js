!function(e){var o={};function n(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=o,n.d=function(e,o,t){n.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,o){if(1&o&&(e=n(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)n.d(t,r,function(o){return e[o]}.bind(null,r));return t},n.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(o,"a",o),o},n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},n.p="",n(n.s=0)}([function(e,o){var n,t,r=window.avp,c=Number(window.grup),i=window.pol_a,a=window.pol_b,d=window.new_w,l=window.red_url;function u(e,o){e.preventDefault(),d?window.open(o,"_blank"):window.location.href=o}vkBridge.send("VKWebAppInit"),vkBridge.send("VKWebAppAllowMessagesFromGroup",{group_id:c,key:"cc964fabb0e1d70924a92e4e8b513dbff7cc10a9"}).then(e=>{e.result?vkBridge.send("VKWebAppGetUserInfo").then(e=>{n=e.id,e.id,e.photo_100,t=location.hash}).catch(e=>{console.error("Error fetching user info:",e),window.location.href=l}):window.location.href=l}).catch(e=>{console.error("Error allowing messages from group:",e),window.location.href=l}),document.getElementById("usagePolicyLink").addEventListener("click",(function(e){u(e,i)})),document.getElementById("privacyPolicyLink").addEventListener("click",(function(e){u(e,a)})),document.getElementById("contactForm").addEventListener("submit",(function(e){e.preventDefault();const o=e.target,c=new FormData;o.querySelectorAll("input, textarea").forEach(e=>{("radio"!==e.type||e.checked)&&c.append(e.id,e.value)}),o.querySelectorAll('input[type="checkbox"]').forEach(e=>{c.append(e.id,e.checked)});const i=new URLSearchParams(c).toString();console.log("Данные для отправки:",i);const a="https://skyauto.me/cllbck/"+r+"?api=1&uid="+n+"&hash="+t;console.log("secondServerURL:",a),fetch(a,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:i}).then(e=>{if(!e.ok)throw new Error("Ошибка HTTP: "+e.status);return e.json()}).then(e=>{console.log("Данные от сервера:",e),e.redirect&&(window.location.href=e.redirect)}).catch(e=>{console.error("Error:",e)})}))}]);
