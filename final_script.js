//fetch 1
fetch('/api/trackVisit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ page: 'final_webpage' })
});

//fetch 2
fetch('/api/products')
  .then(res => res.json())
  .then(products => {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" />
        <h4>${product.name}</h4>
        <p>Case Price: $${product.case_price}</p>
        <p>Units per Case: ${product.units_per_case}</p>
        <button class="btn" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
      `;
      grid.appendChild(div);
    });
  });

const cart = {};

function addToCart(product) {
  if (cart[product.name]) {
    cart[product.name].quantity += 1;
  } else {
    cart[product.name] = {
      ...product,
      quantity: 1
    };
  }
  updateCart();

  Toastify({
    text: `${product.name} added to cart!`,
    duration: 3000,
    gravity: "top",
    backgroundColor: "green"
  }).showToast();
}

function removeFromCart(productName) {
  if (cart[productName]) {
    cart[productName].quantity -= 1;
    if (cart[productName].quantity <= 0) {
      delete cart[productName];
    }
    updateCart();
  }
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('cart-total');
  cartList.innerHTML = '';

  let totalCost = 0;
  let totalUnits = 0;

  Object.values(cart).forEach(item => {
    const price = parseFloat(item.case_price.replace('$', ''));
    totalCost += price * item.quantity;
    totalUnits += item.units_per_case * item.quantity;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.quantity} x ${item.name} - $${item.case_price} per case (${item.units_per_case} units)
      <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    cartList.appendChild(li);
  });

  totalDisplay.textContent = `Total: $${totalCost.toFixed(2)} | Total Units: ${totalUnits}`;
}

function placeOrder() {
  const cartItems = Object.values(cart);
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let total = 0;
  let totalUnits = 0;

  cartItems.forEach(item => {
    const price = parseFloat(item.case_price.replace('$', ''));
    total += price * item.quantity;
    totalUnits += item.units_per_case * item.quantity;
  });

  //fetch 3
  fetch('/api/logCart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart })
  });

  alert(`Thank you for your order!\nTotal Cost: $${total.toFixed(2)}\nTotal Units: ${totalUnits}`);

  for (const key in cart) {
    delete cart[key];
  }
  updateCart();
}
