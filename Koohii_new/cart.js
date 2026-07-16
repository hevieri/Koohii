// ═══════════════════════════════════════════════════════
// KOOHII - Shopping Cart
// ═══════════════════════════════════════════════════════

(function () {
  'use strict';

  const STORAGE_KEY = 'kooHii-cart';
  let cart = [];

  // ─── LOAD / SAVE ───
  function loadCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      cart = data ? JSON.parse(data) : [];
    } catch (e) {
      cart = [];
    }
  }

  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  // ─── FIND ITEM ───
  function findItem(name) {
    return cart.find(function (item) { return item.name === name; });
  }

  // ─── ADD ───
  function addItem(name, price, img) {
    const existing = findItem(name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name: name, price: Number(price), img: img || '', qty: 1 });
    }
    saveCart();
    renderCart();
    updateCount();

    if (window.KooHii && window.KooHii.showToast) {
      window.KooHii.showToast(name + ' agregado al carrito 🛒', 'success');
    }
  }

  // ─── REMOVE ───
  function removeItem(name) {
    cart = cart.filter(function (item) { return item.name !== name; });
    saveCart();
    renderCart();
    updateCount();
  }

  // ─── CHANGE QTY ───
  function changeQty(name, delta) {
    const item = findItem(name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeItem(name);
      return;
    }
    saveCart();
    renderCart();
  }

  // ─── TOTAL ───
  function getTotal() {
    return cart.reduce(function (sum, item) {
      return sum + (item.price * item.qty);
    }, 0);
  }

  // ─── COUNT ───
  function getCount() {
    return cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
  }

  // ─── UPDATE BADGE ───
  function updateCount() {
    const badge = document.getElementById('cartCount');
    if (!badge) return;
    const count = getCount();
    badge.textContent = count > 0 ? count : '';
  }

  // ─── RENDER ───
  function renderCart() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML =
        '<div class="cart-empty">' +
        '  <span class="empty-icon">🛒</span>' +
        '  <p>Tu carrito está vacío</p>' +
        '</div>';
      if (totalEl) totalEl.textContent = '$0';
      return;
    }

    let html = '';
    cart.forEach(function (item) {
      const imgTag = item.img
        ? '<img class="cart-item-img" src="' + item.img + '" alt="' + item.name + '">'
        : '<div class="cart-item-img" style="background:var(--bg-glass);display:flex;align-items:center;justify-content:center;font-size:1.5rem;">☕</div>';

      html +=
        '<div class="cart-item">' +
        imgTag +
        '  <div class="cart-item-info">' +
        '    <h4>' + item.name + '</h4>' +
        '    <span class="cart-item-price">$' + item.price.toLocaleString('es-AR') + '</span>' +
        '    <div class="cart-item-qty">' +
        '      <button data-name="' + item.name + '" data-action="minus">−</button>' +
        '      <span>' + item.qty + '</span>' +
        '      <button data-name="' + item.name + '" data-action="plus">+</button>' +
        '    </div>' +
        '  </div>' +
        '  <button class="cart-item-remove" data-name="' + item.name + '" data-action="remove" title="Eliminar">' +
        '    <i class="fas fa-trash-alt"></i>' +
        '  </button>' +
        '</div>';
    });

    container.innerHTML = html;
    if (totalEl) totalEl.textContent = '$' + getTotal().toLocaleString('es-AR');

    // rebind qty buttons
    container.querySelectorAll('button[data-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var action = btn.getAttribute('data-action');
        var name = btn.getAttribute('data-name');
        if (action === 'plus') changeQty(name, 1);
        else if (action === 'minus') changeQty(name, -1);
        else if (action === 'remove') removeItem(name);
      });
    });
  }

  // ─── SIDEBAR TOGGLE ───
  function openCart() {
    var sidebar = document.getElementById('cartSidebar');
    var overlay = document.getElementById('cartOverlay');
    if (sidebar) sidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    var sidebar = document.getElementById('cartSidebar');
    var overlay = document.getElementById('cartOverlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ─── INIT ───
  document.addEventListener('DOMContentLoaded', function () {
    loadCart();
    renderCart();
    updateCount();

    // cart button
    var cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
      cartBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openCart();
      });
    }

    // close cart
    var closeBtn = document.getElementById('cartClose');
    if (closeBtn) closeBtn.addEventListener('click', closeCart);

    var overlay = document.getElementById('cartOverlay');
    if (overlay) overlay.addEventListener('click', closeCart);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeCart();
    });

    // add-to-cart buttons
    document.querySelectorAll('.btn-add-cart').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.product-card');
        if (!card) return;
        var name = card.getAttribute('data-name');
        var price = card.getAttribute('data-price');
        var img = card.querySelector('.product-card-img');
        var imgSrc = img ? img.getAttribute('src') : '';
        addItem(name, price, imgSrc);
      });
    });

    // checkout
    var checkoutBtn = document.getElementById('btnCheckout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function () {
        if (cart.length === 0) {
          if (window.KooHii && window.KooHii.showToast) {
            window.KooHii.showToast('Tu carrito está vacío', 'info');
          }
          return;
        }
        if (window.KooHii && window.KooHii.showToast) {
          window.KooHii.showToast('¡Pedido enviado! 🎉 Te esperamos.', 'success');
        }
        cart = [];
        saveCart();
        renderCart();
        updateCount();
        setTimeout(closeCart, 1000);
      });
    }
  });
})();
