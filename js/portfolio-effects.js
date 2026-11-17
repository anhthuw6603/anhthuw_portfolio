(function(){
  'use strict';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.querySelector('.site-nav');
  function updateNav(){ if(nav) nav.classList.toggle('is-scrolled', window.scrollY > 24); }
  updateNav();
  window.addEventListener('scroll', updateNav, {passive:true});

  // Reveal sections and cards as they enter the viewport.
  var revealSelectors = 'section, .experience-item, .project-card, .education-grid > div, .about-photo, .contact-links > *';
  var targets = document.querySelectorAll(revealSelectors);
  targets.forEach(function(el){
    if(el.closest('.hero')) return;
    el.classList.add('js-reveal');
  });
  if(!reduceMotion && 'IntersectionObserver' in window){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -35px 0px'});
    document.querySelectorAll('.js-reveal').forEach(function(el){observer.observe(el);});
  } else {
    document.querySelectorAll('.js-reveal').forEach(function(el){el.classList.add('is-visible');});
  }

  // Stagger project cards for a more deliberate portfolio presentation.
  document.querySelectorAll('.project-card').forEach(function(card, i){
    card.style.transitionDelay = (i % 3) * 70 + 'ms';
  });

  // Smooth in-page navigation with a safe fallback.
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      var id = link.getAttribute('href');
      if(!id || id === '#') return;
      var target = document.querySelector(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:reduceMotion ? 'auto' : 'smooth', block:'start'});
        if(history.replaceState) history.replaceState(null, '', id);
      }
    });
  });
})();