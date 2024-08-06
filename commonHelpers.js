import{a as g,S as f,i}from"./assets/vendor-BjmtRwYh.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const y of o.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&r(y)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();const m="https://pixabay.com/api/",h="45195508-74bd54d08c443e52e59ea1f0e";async function p(s,e=1){const a={key:h,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15};try{return(await g.get(m,{params:a})).data}catch(r){throw console.error("Error fetching images:",r),r}}function d(s){const e=document.querySelector(".gallery"),a=s.map(r=>`
    <li class="gallery-item gallery-animation">
      <a href="${r.largeImageURL}">
        <figure class="gallery-figure">
            <img class="gallery-image" src="${r.webformatURL}" alt="${r.tags}" loading="lazy">
            <figcaption class="gallery-figcaption">
                <ul class="info">
                    <li>Likes <span>${r.likes}</span></li>
                    <li>Views <span>${r.views}</span></li>
                    <li>Comments <span>${r.comments}</span></li>
                    <li>Downloads <span>${r.downloads}</span></li>
                </ul>
            </figcaption>
		</figure>
      </a>
    </li>
  `).join("");e.innerHTML=a,new f(".gallery a").refresh()}const S=document.querySelector("#search-form"),w=document.querySelector("#search"),n=document.querySelector(".loader"),u=document.querySelector(".load-more");let l=1,c="";S.addEventListener("submit",async s=>{if(s.preventDefault(),c=w.value.trim(),l=1,!c){i.info({title:"Info",position:"topRight",message:"Please enter a value in the search field!",timeout:3e3});return}u.style.display="none",n.style.display="block";try{const e=await p(c,l);if(n.style.display="none",e.totalHits===0){i.warning({title:"Warning",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",timeout:3e3});return}i.success({title:"Success",position:"topRight",message:`Hooray! We found ${e.totalHits} images.`,timeout:3e3}),document.querySelector(".gallery").innerHTML="",d(e.hits),e.totalHits>e.hits.length&&(u.style.display="block")}catch{n.style.display="none",i.error({title:"Error",position:"topRight",message:"Sorry, there is no connection to the server. Please try again later!",timeout:3e3})}});u.addEventListener("click",async()=>{l+=1,n.style.display="block";try{const s=await p(c,l);n.style.display="none",d(s.hits),l*15>=s.totalHits&&(u.style.display="none",i.info({title:"Info",position:"topRight",message:"We're sorry, but you've reached the end of search results.",timeout:3e3}));const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}catch{n.style.display="none",i.error({title:"Error",position:"topRight",message:"Sorry, there is no connection to the server. Please try again later!",timeout:3e3})}});
//# sourceMappingURL=commonHelpers.js.map
