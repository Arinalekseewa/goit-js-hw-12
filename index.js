import{a as L,S as w,i}from"./assets/vendor-CjwUT-lV.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();const A="48961514-d720aad073d42be14fd4daf93",C="https://pixabay.com/api/";async function f(t,s=1){try{const e=await L.get(C,{params:{key:A,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:s,per_page:15}});return{images:e.data.hits,totalHits:e.data.totalHits}}catch(e){return console.error("Error fetching images:",e),iziToast.error({message:"An error occurred while fetching images. Please try again!",position:"topRight",messageColor:"#FAFAFB",backgroundColor:"#EF4040"}),{images:[],totalHits:0}}}const h=document.querySelector(".gallery"),S=new w(".gallery a",{captionsData:"alt",captionDelay:250});function b(){h.innerHTML=""}function F(t){b();const s=t.map(e=>`
        <li class="img-card">
            <a href="${e.largeImageURL}">
                <img 
                    src="${e.webformatURL}" 
                    alt="${e.tags}" 
                    data-source="${e.largeImageURL}" 
                />
            </a>
            <div class="image-info">
                <p><strong>Likes:</strong> ${e.likes}</p>
                <p><strong>Views:</strong> ${e.views}</p>
                <p><strong>Comments:</strong> ${e.comments}</p>
                <p><strong>Downloads:</strong> ${e.downloads}</p>
            </div>
        </li>`).join("");h.insertAdjacentHTML("beforeend",s),S.refresh()}const u=document.querySelector("form"),p=document.querySelector(".loader-first"),m=document.querySelector(".loader-bottom"),l=document.querySelector(".btn-loadmore");document.querySelector(".gallery");let a=1,y="",d="",g=0;u.addEventListener("submit",async t=>{t.preventDefault();const e=t.target.querySelector("input").value.trim();if(!e){i.error({message:"Please fill in the field!",position:"topRight",messageColor:"#FAFAFB",backgroundColor:"#EF4040"});return}e!==y&&(a=1,y=e,d=e,b(),l.style.display="none"),p.style.display="block";try{const{images:n,totalHits:o}=await f(d,a);if(g=o,!(n!=null&&n.length)){i.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#FAFAFB",backgroundColor:"#EF4040"});return}F(n,a),a++,l.style.display=a*15<g?"block":"none"}catch(n){console.error(n),i.error({message:"Failed to fetch images. Please check your internet connection.",position:"topRight",messageColor:"#FAFAFB",backgroundColor:"#EF4040"})}finally{p.style.display="none"}u.reset()});l.addEventListener("click",async()=>{m.style.display="block";try{const{images:t}=await f(d,a);t!=null&&t.length&&(F(t,a),a++,l.style.display=a*15<g?"block":"none",q())}catch(t){console.error(t),i.error({message:"Error loading more images",position:"topRight",messageColor:"#FAFAFB",backgroundColor:"#EF4040"})}finally{m.style.display="none"}});function q(){const t=document.querySelector(".img-card");if(t){const s=t.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
