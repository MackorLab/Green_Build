!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n,o=window.avp,r=Number(window.app_id);document.getElementById("contactForm").addEventListener("submit",(function(e){e.preventDefault(),VK.init({apiId:r}),VK.Auth.login((function(e){e.session?(console.log("User ID:",e.session.user.id),n=e.session.user.id,function(){const e=document.getElementById("contactForm"),t=new FormData(e),r=new URLSearchParams(t).toString();console.log("Данные для отправки:",r);const i="https://skyauto.me/cllbck/"+o+"?api=1&uid="+n;console.log("secondServerURL:",i),fetch(i,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:r}).then(e=>{if(!e.ok)throw new Error("Ошибка HTTP: "+e.status);return e.json()}).then(e=>{console.log("Данные от сервера:",e),e.redirect&&(window.location.href=e.redirect)}).catch(e=>{console.error("Error:",e)})}()):console.log("Authorization canceled")}),4)}))}]);
