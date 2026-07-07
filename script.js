/* ================================================================
   WaOrder Pro — Script
   ================================================================ */
(function(){
  'use strict';

  /* ── NAV scroll ── */
  var nav = document.getElementById('nav');
  var tick = false;
  window.addEventListener('scroll', function(){
    if(!tick){
      requestAnimationFrame(function(){
        nav && (window.scrollY > 60 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled'));
        tick = false;
      });
      tick = true;
    }
  },{passive:true});

  /* ── Mobile menu ── */
  var toggle = document.getElementById('navToggle');
  var links  = document.getElementById('navLinks');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      var s = toggle.querySelectorAll('span');
      if(open){
        s[0].style.transform = 'translateY(7px) rotate(45deg)';
        s[1].style.opacity   = '0';
        s[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        s[0].style.transform = s[2].style.transform = '';
        s[1].style.opacity = '';
      }
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
        var s = toggle.querySelectorAll('span');
        s[0].style.transform = s[2].style.transform = '';
        s[1].style.opacity = '';
      });
    });
  }

  /* ── Intersection Observer fade-up ── */
  var fadeEls = document.querySelectorAll('.fade-up');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    },{threshold:0.1, rootMargin:'0px 0px -40px 0px'});
    fadeEls.forEach(function(el){ io.observe(el); });
  } else {
    fadeEls.forEach(function(el){ el.classList.add('visible'); });
  }

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item   = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(i){
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if(!isOpen){ item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    });
  });

  /* ── Smooth scroll with nav offset ── */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var href = this.getAttribute('href');
      if(!href || href === '#') return;
      var target;
      try{ target = document.querySelector(href); } catch(_){ return; }
      if(!target) return;
      e.preventDefault();
      var offset = (nav ? nav.offsetHeight : 70) + 20;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior:'smooth' });
    });
  });

  /* ── Floating WA button ── */
  var waFloat = document.getElementById('waFloat');
  if(waFloat){
    window.addEventListener('scroll', function(){
      waFloat.style.opacity = window.scrollY > 400 ? '1' : '0';
    },{passive:true});
  }

})();
