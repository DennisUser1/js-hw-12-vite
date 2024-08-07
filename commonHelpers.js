import{a as g,S as f,i}from"./assets/vendor-BjmtRwYh.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const y of r.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&s(y)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const m="https://pixabay.com/api/",h="45195508-74bd54d08c443e52e59ea1f0e";async function p(o,t=1){const a={key:h,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15};try{return(await g.get(m,{params:a})).data}catch(s){throw console.error("Error fetching images:",s),s}}function d(o){const t=document.querySelector(".gallery"),a=o.map(e=>`
    <li class="gallery-item gallery-animation">
      <a href="${e.largeImageURL}">
        <figure class="gallery-figure">
            <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" loading="lazy">
            <figcaption class="gallery-figcaption">
                <ul class="info">
                    <li>Likes <span>${e.likes}</span></li>
                    <li>Views <span>${e.views}</span></li>
                    <li>Comments <span>${e.comments}</span></li>
                    <li>Downloads <span>${e.downloads}</span></li>
                </ul>
            </figcaption>
		</figure>
      </a>
    </li>
  `).join("");t.innerHTML+=a,new f(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}const b=document.querySelector("#search-form"),S=document.querySelector("#search"),n=document.querySelector(".loader"),u=document.querySelector(".load-more");let l=1,c="";b.addEventListener("submit",async o=>{if(o.preventDefault(),c=S.value.trim(),l=1,!c){i.info({title:"Info",position:"topRight",message:"Please enter a value in the search field!",timeout:3e3});return}u.style.display="none",n.style.display="block";try{const t=await p(c,l);if(n.style.display="none",t.totalHits==0){i.warning({title:"Warning",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",timeout:3e3});return}i.success({title:"Success",position:"topRight",message:`Hooray! We found ${t.totalHits} images.`,timeout:3e3}),document.querySelector(".gallery").innerHTML="",d(t.hits),t.totalHits>t.hits.length&&(u.style.display="block")}catch{n.style.display="none",i.error({title:"Error",position:"topRight",message:"Sorry, there is no connection to the server. Please try again later!",timeout:3e3})}});u.addEventListener("click",async()=>{l+=1,n.style.display="block";try{const o=await p(c,l);n.style.display="none",d(o.hits),l*15>=o.totalHits&&(u.style.display="none",i.info({title:"Info",position:"topRight",message:"We're sorry, but you've reached the end of search results.",timeout:3e3}));const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch{n.style.display="none",i.error({title:"Error",position:"topRight",message:"Sorry, there is no connection to the server. Please try again later!",timeout:3e3})}});
//# sourceMappingURL=commonHelpers.js.map
