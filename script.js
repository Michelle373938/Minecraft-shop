// Datenmodell
const cart = [];

// Elemente holen
const productsEl = document.getElementById('products');
const cartBtn = document.getElementById('cartBtn');
const cartCountEl = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Produkte laden
fetch('items.json')
  .then(res => res.json())
  .then(items => {
    items.forEach(item => addProductCard(item));
  })
  .catch(err => console.error('Fehler beim Laden der Produkte:', err));

// Produktkarte erzeugen
function addProductCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>${item.price} Diamanten</p>
    <button data-id="${item.id}">In den Warenkorb</button>
  `;
  card.querySelector('button').addEventListener('click', () => addToCart(item));
  productsEl
