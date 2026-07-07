/* ================================================================
   WaOrder Pro — Main Script
   ================================================================ */
(function () {
  'use strict';

  /* ── NAV: scroll effects ── */
  var nav = document.getElementById('nav');
  var lastScrollY = window.scrollY;
  var ticking = false;

  function handleScroll() {
    var y = window.scrollY;
    if (nav) {
      if (y > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    lastScrollY = y;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  /* ── Mobile Menu ── */
  var navToggle = document.getElementById('navToggle');
  var navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      var spans = navToggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        var spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      });
    });
  }

  /* ── Animate on Scroll (Fade-up) ── */
  var fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item    = btn.closest('.faq__item');
      var isOpen  = item.classList.contains('open');

      // close all
      document.querySelectorAll('.faq__item.open').forEach(function (i) {
        i.classList.remove('open');
        i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      // open clicked (unless it was already open)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Smooth Scroll with nav offset ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      var target;
      try { target = document.querySelector(href); } catch (_) { return; }
      if (!target) return;
      e.preventDefault();
      var offset = nav ? nav.offsetHeight + 20 : 80;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ── Show floating WA button after scroll ── */
  var waFloat = document.querySelector('.wa-float');
  if (waFloat) {
    waFloat.style.opacity = '0';
    waFloat.style.transition = 'opacity .4s ease, transform .25s cubic-bezier(.4,0,.2,1), box-shadow .25s ease';
    window.addEventListener('scroll', function () {
      waFloat.style.opacity = window.scrollY > 300 ? '1' : '0';
    }, { passive: true });
  }

})();
