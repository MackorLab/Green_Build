!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n=window.w_url.replace(/\/+$/,"")+"/add_user_senler",o=window.w_url.replace(/\/+$/,"")+"/get_Lo_Mess_senler",l=window.w_url.replace(/\/+$/,"")+"/del_user_senler",a=Number(window.vk_grup),r=window.vk_grup,c=window.s_grup,d=window.red_on,i=window.on_url,s=window.clarity_on,u=window.clarity_id,p=window.clarity_ses,m=window.clarity_tar,y=window.funnel,w=window.clarity_ev,g=window.ups;let _,f,h,k,B,b,E,P;const v=new URL(window.location.href),I=v.searchParams.get("vk_user_id");v.searchParams.get("vk_app_id"),window.location.href;E=window.location.hash.substring(1);const S=new URLSearchParams(E);_=S.get("gcpc")||"",f=S.get("utm_source")||"",h=S.get("utm_medium")||"",k=S.get("utm_campaign")||"",B=S.get("utm_content")||"",b=S.get("utm_term")||"";const T=I.toString();v.searchParams.get("vk_app_id");function L(){document.getElementById("loyaltyBlock").style.display="block",document.getElementById("formBlock").style.display="none",s&&(window.clarity?window.clarity("set","loyalty","not"):console.log("Clarity is not initialized"))}function j(){const e=new URLSearchParams;e.append("vk_user_id",P),e.append("vk_group_id",r),e.append("sub_id",c),e.append("utm_source",f),e.append("utm_medium",h),e.append("utm_campaign",k),e.append("utm_content",B),e.append("utm_term",b),fetch(n,{method:"POST",body:e}).then(e=>{if(!e.ok)throw new Error("Ошибка HTTP: "+e.status);return e.json()}).then(e=>{if(e&&e.success)if(document.getElementById("formBlock").style.display="none",document.getElementById("loyaltyBlock").style.display="none",document.getElementById("loaderBlock").style.display="none",document.getElementById("thankBlock").style.display="block",document.getElementById("stopBlock").style.display="block",d){s&&(x(w),O());let e=new URL(i);e.searchParams.append("ups",g),e.searchParams.append("uid",P),e.searchParams.append("gcpc",_),e.searchParams.append("utm_source",f),e.searchParams.append("utm_medium",h),e.searchParams.append("utm_campaign",k),e.searchParams.append("utm_content",B),e.searchParams.append("utm_term",b),window.open(e.toString(),"_blank")}else s&&(x(w),O(),document.getElementById("loaderBlock").style.display="none");else L(),document.getElementById("loaderBlock").style.display="none"}).catch(e=>{console.error("Error:",e),L()})}function x(e){window.clarity?window.clarity("event",e):console.log("Clarity is not initialized")}function O(){window.clarity?window.clarity("set","loyalty","yes"):console.log("Clarity is not initialized")}var U,R,M,z,A,C,D;console.log("test=20"),vkBridge.send("VKWebAppInit"),document.getElementById("formBlock").addEventListener("submit",(function(e){e.preventDefault(),vkBridge.send("VKWebAppAllowMessagesFromGroup",{group_id:a,key:"cc964fabb0e1d70924a92e4e8b513dbff7cc10a9"}).then(e=>{e.result?vkBridge.send("VKWebAppGetUserInfo").then(e=>{P=e.id,document.getElementById("loaderBlock").style.display="flex",setTimeout(j,1e3)}).catch(e=>{L()}):L()}).catch(e=>{L()})})),s&&(U=window,R=document,z="script",A=u,U[M="clarity"]=U[M]||function(){(U[M].q=U[M].q||[]).push(arguments)},(C=R.createElement(z)).async=1,C.src="https://www.clarity.ms/tag/"+A,(D=R.getElementsByTagName(z)[0]).parentNode.insertBefore(C,D),function(e,t,n){window.clarity?window.clarity("identify",e,t,n):console.log("Clarity is not initialized")}(T,p,m),function(e,t,n,o,l,a){window.clarity?(window.clarity("set","utm_source",e),window.clarity("set","utm_medium",t),window.clarity("set","utm_campaign",n),window.clarity("set","utm_content",o),window.clarity("set","utm_term",l),window.clarity("set","funnel",a)):console.log("Clarity is not initialized")}(f,h,k,B,b,y)),$(document).ready((function(){$("#linkThank").on("click",(function(e){if(e.preventDefault(),d){let e=new URL($(this).attr("href"));e.searchParams.append("ups",g),e.searchParams.append("uid",P),e.searchParams.append("gcpc",_),e.searchParams.append("utm_source",f),e.searchParams.append("utm_medium",h),e.searchParams.append("utm_campaign",k),e.searchParams.append("utm_content",B),e.searchParams.append("utm_term",b),window.open(e.toString(),"_blank")}else window.open($(this).attr("href"),"_blank")})),function(){const e=new URLSearchParams;e.append("vk_user_id",I),e.append("vk_group_id",r),e.append("sub_id",c),document.getElementById("loaderBlock").style.display="flex",fetch(o,{method:"POST",body:e}).then(e=>{if(!e.ok)throw new Error("Ошибка HTTP: "+e.status);return e.json()}).then(e=>{e&&"1"===e.status?(document.getElementById("formBlock").style.display="none",document.getElementById("thankBlock").style.display="block",document.getElementById("stopBlock").style.display="block",document.getElementById("loaderBlock").style.display="none",console.log("Есть подписка")):(document.getElementById("formBlock").style.display="block",document.getElementById("loaderBlock").style.display="none",console.log("Нет подписки"))}).catch(e=>{console.error("Error:",e)})}(),$("#linkStopBlock").on("click",(function(e){e.preventDefault(),function(){const e=new URLSearchParams;e.append("vk_user_id",I),e.append("vk_group_id",r),e.append("sub_id",c),document.getElementById("loaderBlock").style.display="flex",fetch(l,{method:"POST",body:e}).then(e=>{if(!e.ok)throw new Error("Ошибка HTTP: "+e.status);return e.json()}).then(e=>{console.log("Ответ от сервера:",e),e&&"success"===e.status?(document.getElementById("formBlock").style.display="block",document.getElementById("stopBlock").style.display="none",document.getElementById("thankBlock").style.display="none",document.getElementById("loaderBlock").style.display="none",console.log("Подписка отменена")):(console.log("Ошибка или подписка не отменена"),document.getElementById("loaderBlock").style.display="none")}).catch(e=>{console.error("Error:",e)})}()}))})),s&&(document.addEventListener("copy",(function(e){console.log("Текст скопирован:",window.getSelection().toString()),window.clarity&&window.clarity("set","text_copy","yes")})),document.querySelectorAll("img").forEach(e=>{e.addEventListener("contextmenu",(function(e){console.log("Контекстное меню открыто на изображении:",e.target.src),e.preventDefault(),window.clarity&&window.clarity("set","img_save","yes")}))}))}]);
