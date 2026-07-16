(function () {
  'use strict';

  var quotes = [
    { text: 'El mejor lugar para tomar café y charlar de anime.', author: 'Equipo KooHii' },
    { text: 'Un buen café y un buen anime, ¿qué más se puede pedir?', author: 'KooHii' },
    { text: 'Acá el café se toma con estilo y buena compañía.', author: 'KooHii' },
    { text: 'Tu café favorito con la vibra de tus series favoritas.', author: 'KooHii' },
    { text: 'Momentos buenos se disfrutan mejor con una taza en la mano.', author: 'KooHii' },
    { text: 'Cada taza es una nueva aventura.', author: 'KooHii' },
  ];

  // HEADER SCROLL
  var header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // HAMBURGER
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('main-nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // SCROLL REVEAL
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { observer.observe(el); });
  }

  // HERO QUOTE ROTATOR
  var quoteEl = document.getElementById('heroQuote');
  var authorEl = document.getElementById('quoteAuthor');
  if (quoteEl && authorEl) {
    var qi = 0;
    setInterval(function () {
      quoteEl.style.opacity = '0';
      authorEl.style.opacity = '0';
      setTimeout(function () {
        qi = (qi + 1) % quotes.length;
        quoteEl.textContent = '"' + quotes[qi].text + '"';
        authorEl.textContent = '- ' + quotes[qi].author;
        quoteEl.style.opacity = '1';
        authorEl.style.opacity = '1';
      }, 300);
    }, 5000);
  }

  // BACK TO TOP
  var btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', function () {
      btt.classList.toggle('visible', window.scrollY > 400);
    });
    btt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  // FAQ ACCORDION
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.querySelector('.faq-question').addEventListener('click', function () {
      var wasOpen = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!wasOpen) {
        item.classList.add('active');
        item.querySelector('.faq-answer').style.maxHeight = item.querySelector('.faq-answer').scrollHeight + 'px';
      }
    });
  });

  // LIGHTBOX
  var gallery = document.getElementById('galleryGrid');
  var lightbox = document.getElementById('lightbox');
  if (gallery && lightbox) {
    var lbImg = document.getElementById('lightboxImg');
    var items = gallery.querySelectorAll('.gallery-item');
    var ci = 0;
    function showLb(i) { lbImg.src = items[i].getAttribute('data-src'); ci = i; lightbox.classList.add('active'); }
    function closeLb() { lightbox.classList.remove('active'); }
    items.forEach(function (item, i) { item.addEventListener('click', function () { showLb(i); }); });
    document.getElementById('lightboxClose').addEventListener('click', closeLb);
    document.getElementById('lightboxPrev').addEventListener('click', function () { showLb((ci - 1 + items.length) % items.length); });
    document.getElementById('lightboxNext').addEventListener('click', function () { showLb((ci + 1) % items.length); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') showLb((ci + 1) % items.length);
      if (e.key === 'ArrowLeft') showLb((ci - 1 + items.length) % items.length);
    });
  }

  // NEWSLETTER
  var nlForm = document.getElementById('newsletterForm');
  if (nlForm) {
    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('¡Gracias por suscribirte! 🎌');
      nlForm.reset();
    });
  }

  // TOAST
  function showToast(msg) {
    var c = document.getElementById('toastContainer');
    if (!c) return;
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.remove(); }, 3000);
  }

  window.KooHii = { showToast: showToast };

  // ─── KAWAII EFFECTS ───
  var kawaiiEmojis = ['♡', '✿', '☆', '✧', '♥', '❀', '♡', '✿'];

  // hearts on card hover
  document.querySelectorAll('.product-card, .feature-card, .testimonial-card').forEach(function (card) {
    card.addEventListener('mouseenter', function (e) {
      for (var i = 0; i < 3; i++) {
        (function (delay) {
          setTimeout(function () {
            var el = document.createElement('span');
            el.className = 'kawaii-particle';
            el.textContent = kawaiiEmojis[Math.floor(Math.random() * kawaiiEmojis.length)];
            el.style.left = (e.clientX + (Math.random() - 0.5) * 40) + 'px';
            el.style.top = (e.clientY + (Math.random() - 0.5) * 20) + 'px';
            document.body.appendChild(el);
            setTimeout(function () { el.remove(); }, 800);
          }, delay * 100);
        })(i);
      }
    });
  });

  // sparkle on add-to-cart click
  document.querySelectorAll('.btn-add-cart').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      for (var i = 0; i < 6; i++) {
        (function (delay) {
          setTimeout(function () {
            var el = document.createElement('span');
            el.className = 'kawaii-particle';
            el.textContent = kawaiiEmojis[Math.floor(Math.random() * kawaiiEmojis.length)];
            el.style.left = (e.clientX + (Math.random() - 0.5) * 60) + 'px';
            el.style.top = (e.clientY + (Math.random() - 0.5) * 30) + 'px';
            el.style.fontSize = '1.2rem';
            document.body.appendChild(el);
            setTimeout(function () { el.remove(); }, 800);
          }, delay * 60);
        })(i);
      }
    });
  });

  // subtle sparkle trail on gallery hover
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('mousemove', function (e) {
      if (Math.random() > 0.7) {
        var el = document.createElement('span');
        el.className = 'kawaii-particle';
        el.textContent = '✧';
        el.style.left = e.clientX + 'px';
        el.style.top = e.clientY + 'px';
        el.style.fontSize = '0.7rem';
        el.style.color = 'var(--orange)';
        document.body.appendChild(el);
        setTimeout(function () { el.remove(); }, 600);
      }
    });
  });

})();
