const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

let cart = {};

function loadItems() {
  fetch('items.json')
    .then(r => r.json())
    .then(items => {
      items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.price.toFixed(2)} €</p>
          <button data-id="${item.id}">In den Warenkorb</button>
        `;
        productGrid.appendChild(div);
      });
    });
}

function updateCartCount() {
  const totalQty = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalQty;
}

function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;
  for (const [id, item] of Object.entries(cart)) {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty} – ${(item.price * item.qty
