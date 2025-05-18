fetch('/api/trackVisit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ page: 'home' })
});

const products = [
  {
    name: "NESCAFE COFFEE TRADITIONAL",
    casePrice: "$25.50",
    unitsPerCase: 12,
    image: "https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210504-120635-NESCAFE_COFFEE_TRADITIONAL_STRONG_230G.png"
  },
  {
    name: "PALMOLIVE DISH 5L",
    casePrice: "$22.00",
    unitsPerCase: 4,
    image: "https://app.verybestusa.com/media/_images/large/DSH-244.jpg"
  },
  {
    name: "GRAND POTATO CHIPS 3.17OZ (SOUR CREAM & ONION)",
    casePrice: "$13.50",
    unitsPerCase: 16,
    image: "https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210826-115043-GRAND%20POTATO%20CHIPS%20SOUR%20CREAM%20ONION.jpg"
  },
  {
    name: "GRAND POTATO CHIPS 3.17OZ (WASABI)",
    casePrice: "$13.50",
    unitsPerCase: 16,
    image: "https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210909-113205-GRAND%20POTATO%20CHIPS%20WASABI.jpg"
  },
  {
    name: "GRAND POTATO CHIPS 3.17OZ (SEA SALT)",
    casePrice: "$13.50",
    unitsPerCase: 16,
    image: "https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210826-114749-GRAND%20POTATO%20CHIPS%20SEA%20SALT.jpg"
  },
  {
    name: "GRAND POTATO CHIPS 3.17OZ (CHEESE & ONION)",
    casePrice: "$13.50",
    unitsPerCase: 16,
    image: "https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210826-115034-GRAND%20POTATO%20CHEESE%20ONION.jpg"
  },
  {
    name: "GRAND POTATO CHIPS 3.17OZ (BBQ)",
    casePrice: "$13.50",
    unitsPerCase: 16,
    image: "https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210909-113156-GRAND%20POTATO%20CHIPS%20BBQ.jpg"
  },
  {
    name: "NESTLE MILO POWDER 1.5KG",
    casePrice: "$36.00",
    unitsPerCase: 6,
    image: "https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210406-111900-GRO-617.jpg"
  },
  {
    name: "COSBY NATURAL DRAJELI MIX TOY W/STAND",
    casePrice: "$240.80",
    unitsPerCase: 140,
    image: "https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20210503-123634-COSBY%20MIX%20TOY%20STAND%20DISPLAY.jpg"
  },
  {
    name: "COSBY BLOCK RENKLI KRISTAL EGG W/STAND",
    casePrice: "$136.80",
    unitsPerCase: 144,
    image: "https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20220203-155707-COSBY%20KRISTAL%20EGG%20DISPLAY.jpg"
  },
  {
    name: "COSBY EGG FUN BLOCK STAND",
    casePrice: "$240.80",
    unitsPerCase: 128,
    image: "https://app.verybestusa.com/upload.api/Media/_images%5Clarge%5C20220203-155513-COSBY%20FUN%20BLOCK%20EGG%20DISPLAY.jpg"
  }
];

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
    const price = parseFloat(item.casePrice.replace('$', ''));
    totalCost += price * item.quantity;
    totalUnits += item.unitsPerCase * item.quantity;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.quantity} x ${item.name} - ${item.casePrice} per case (${item.unitsPerCase} units)
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
    const price = parseFloat(item.casePrice.replace('$', ''));
    total += price * item.quantity;
    totalUnits += item.unitsPerCase * item.quantity;
  });

  alert(`Thank you for your order!\nTotal Cost: $${total.toFixed(2)}\nTotal Units: ${totalUnits}`);

  for (const key in cart) {
    delete cart[key];
  }
  updateCart();
}

const grid = document.getElementById('product-grid');
products.forEach(product => {
  const div = document.createElement('div');
  div.className = 'product';
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-image" />
    <h4>${product.name}</h4>
    <p>Case Price: ${product.casePrice}</p>
    <p>Units per Case: ${product.unitsPerCase}</p>
    <button class="btn" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
  `;
  grid.appendChild(div);
});

fetch('/api/products')
  .then(res => res.json())
  .then(data => {
    console.log('Loaded products:', data);
  });
