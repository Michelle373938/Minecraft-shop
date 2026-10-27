document.addEventListener('DOMContentLoaded', () => {
  const productsEl = document.getElementById('products')
  const cartCountEl = document.getElementById('cartCount')
  const cartItemsEl = document.getElementById('cartItems')
  const cartModal = document.getElementById('cartModal')
  const cartBtn = document.getElementById('cartBtn')
  const closeCart = document.getElementById('closeCart')

  const cart = {}

  fetch('items.json')
    .then(r => r.json())
    .then(items => {
      items.forEach(item => {
        const div = document.createElement('div')
        div.className = 'product'
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>€${item.price}</p>
          <button data-id="${item.id}">In den Warenkorb</button>
        `
        productsEl.appendChild(div)
      })
    })

  productsEl.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      const id = e.target.dataset.id
      const item = items.find(i => i.id === id)
      cart[id] = (cart[id] || 0) + 1
      updateCart()
    }
  })

  function updateCart() {
    const count = Object.values(cart).reduce((a,b)=>a+b,0)
    cartCountEl.textContent = count
    cartItemsEl.innerHTML = ''
    Object.entries(cart).forEach(([id, qty]) => {
      const item = items.find(i => i.id === id)
      const li = document.createElement('li')
      li.textContent = `${item.name} × ${qty}`
      cartItemsEl.appendChild(li)
    })
  }

  cartBtn.addEventListener('click', () => cartModal.classList.toggle('hidden'))
  closeCart.addEventListener('click', () => cartModal.classList.add('hidden'))
})
