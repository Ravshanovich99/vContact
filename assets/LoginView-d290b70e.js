import{d as b,r as t,u as y,i as k,o as c,c as v,a as r,e as o,w as p,h as $,F as I,g as _,p as L}from"./index-4c45d05b.js";import{I as f,_ as S}from"./Button.vue_vue_type_script_setup_true_lang-12dcff61.js";import{_ as j}from"./Toast.vue_vue_type_script_setup_true_lang-50c9b145.js";const C=["onSubmit"],N={class:"w-full flex justify-start items-start cursor-pointer underline"},h=b({__name:"LoginForm",setup(g){const n=t(!1),u=t(!1),i=t(""),d=t(""),V=y(),m=t(""),l=t(""),w=()=>{const a=JSON.parse(localStorage.getItem("user"));!a||a.email!==i.value?(m.value="error",l.value="Нет такого пользователя"):a.password!==d.value?(m.value="error",l.value="Ошибка пароля"):(L.set("user_logged_in_token","your_logged_in_token_here"),V.push("/"))};return(a,e)=>{const x=k("RouterLink");return c(),v(I,null,[r("form",{onSubmit:$(w,["prevent"]),class:"w-full flex flex-col items-center justify-center gap-6"},[o(f,{modelValue:i.value,"onUpdate:modelValue":e[0]||(e[0]=s=>i.value=s),type:"email",label:"Введите email",required:!0,onIsValid:e[1]||(e[1]=s=>n.value=s)},null,8,["modelValue"]),o(f,{modelValue:d.value,"onUpdate:modelValue":e[2]||(e[2]=s=>d.value=s),type:"password",label:"Введите пароль",required:!0,onIsValid:e[3]||(e[3]=s=>u.value=s)},null,8,["modelValue"]),r("div",N,[o(x,{to:"/register"},{default:p(()=>[_("Ещё не аккаунта ?")]),_:1})]),o(S,{type:"submit",disabled:!n.value||!u.value},{default:p(()=>[_(" Submit ")]),_:1},8,["disabled"])],40,C),o(j,{type:m.value,message:l.value,onCloseToast:e[4]||(e[4]=s=>l.value=null)},null,8,["type","message"])],64)}}}),B={class:"w-full flex items-center justify-center"},F={class:"responsive-width border p-4 rounded-md pb-11"},R=r("div",{class:"flex justify-center pb-5 text-xl"},"Вход",-1),M={__name:"LoginView",setup(g){return(n,u)=>(c(),v("div",B,[r("div",F,[R,o(h)])]))}};export{M as default};
