(() => {
 'use strict';
 let trigger;
 const close=()=>{document.querySelector('.vm-lightbox')?.remove();document.body.style.overflow='';if(trigger?.isConnected)trigger.focus()};
 document.addEventListener('click',event=>{
 const b=event.target.closest('[data-media-src]');if(!b)return;trigger=b;
 const d=document.createElement('dialog');d.className='vm-lightbox open';d.setAttribute('aria-label',b.querySelector('img').alt);
 const img=document.createElement('img');img.src=b.dataset.mediaSrc;img.alt=b.querySelector('img').alt;
 const x=document.createElement('button');x.type='button';x.textContent='×';x.setAttribute('aria-label','Close image');x.onclick=close;
 d.append(x,img);d.addEventListener('cancel',e=>{e.preventDefault();close()});d.onclick=e=>{if(e.target===d)close()};
 document.body.append(d);document.body.style.overflow='hidden';d.showModal();x.focus();
 });window.addEventListener('hashchange',close);
})();
