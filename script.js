'use strict';
document.documentElement.classList.add('js');
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
menu.hidden=false;
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.innerHTML='Menu <span aria-hidden="true">☰</span>';nav.classList.remove('is-open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';if(open)closeMenu();else{menu.setAttribute('aria-expanded','true');menu.innerHTML='Close <span aria-hidden="true">✕</span>';nav.classList.add('is-open');}});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
const gallery=[...document.querySelectorAll('.gallery-item')],dialog=document.querySelector('#lightbox'),photo=document.querySelector('#lightbox-image');let photoIndex=0,opener;
function showPhoto(index){photoIndex=(index+gallery.length)%gallery.length;const original=gallery[photoIndex].querySelector('img');photo.src=gallery[photoIndex].href;photo.alt=original.alt;document.querySelector('#photo-caption').textContent=original.alt;document.querySelector('#photo-counter').textContent=`${photoIndex+1} / ${gallery.length}`;}
gallery.forEach((link,index)=>link.addEventListener('click',e=>{if(typeof dialog.showModal!=='function')return;e.preventDefault();opener=link;showPhoto(index);dialog.showModal();document.body.classList.add('modal-open');document.querySelector('#close-lightbox').focus();}));
document.querySelector('#close-lightbox').addEventListener('click',()=>dialog.close());document.querySelector('#previous-photo').addEventListener('click',()=>showPhoto(photoIndex-1));document.querySelector('#next-photo').addEventListener('click',()=>showPhoto(photoIndex+1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(photoIndex+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(photoIndex-1);}});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus();});
const search=document.querySelector('#search-form');search.querySelector('button').disabled=false;search.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(search),min=data.get('min'),max=data.get('max'),status=document.querySelector('#search-status');if(min!==''&&max!==''&&Number(min)>Number(max)){status.textContent='Please enter a maximum price greater than or equal to your minimum price.';search.elements.max.focus();return;}const selected=[...search.querySelectorAll('select')].filter(el=>el.value!=='').map(el=>`${el.closest('label').firstChild.textContent.trim()}: ${el.selectedOptions[0].textContent}`);if(min!=='')selected.push(`Min Price: $${Number(min).toLocaleString()}`);if(max!=='')selected.push(`Max Price: $${Number(max).toLocaleString()}`);status.textContent=`${selected.length?'Your preferences: '+selected.join(' · ')+'. ':''}This is a preview; no search was run. Open the original listings page above and enter these preferences there.`;});
const contact=document.querySelector('#contact-form');contact.querySelector('button').disabled=false;contact.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#contact-status').textContent='Your message has not been sent. This preview is not connected to a messaging service. Please call (206) 919-6886 to speak with Marci.';});
const mapButton=document.querySelector('.map-load');mapButton.hidden=false;mapButton.addEventListener('click',()=>{const frame=document.createElement('iframe');frame.title='Map of The Ridge Realty Group office at 3190 HW-160, Suite F, Pahrump';frame.src='https://maps.google.com/maps?q=3190+HW-160+Suite+F+Pahrump+Nevada+89048&output=embed';frame.referrerPolicy='no-referrer-when-downgrade';frame.loading='lazy';const map=document.querySelector('#office-map');map.replaceChildren(frame);map.classList.add('loaded');});

// Animate only when a section enters view; never hide content while waiting.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;
function setupReveals() {
  revealObserver?.disconnect();
  document.querySelectorAll('.motion-reveal').forEach(el => el.classList.remove('motion-reveal'));
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.portrait, .about-copy, .section-heading, .sales-feature, .sold-support article, .search-heading, .search-form-heading, .partners img, .gallery-item, .services-grid article, .contact-section h2, .contact-grid > *');
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      // Only stagger items that share a row on wider screens.
      const siblings = [...el.parentElement.children];
      const stagger = window.innerWidth > 760 ? Math.min(siblings.indexOf(el), 2) * 80 : 0;
      el.style.setProperty('--reveal-delay', `${stagger}ms`);
      el.classList.add('motion-reveal');
      el.addEventListener('animationend', () => el.classList.remove('motion-reveal'), { once: true });
      revealObserver.unobserve(el);
    });
  }, { threshold: 0, rootMargin: '0px 0px -35px 0px' });
  targets.forEach(el => revealObserver.observe(el));
}
setupReveals();
motionPreference.addEventListener('change', setupReveals);
