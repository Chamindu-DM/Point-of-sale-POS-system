document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartTableBody = document.querySelector("#cart-table tbody");
    const totalPriceElement = document.getElementById("total-price");
    const amountPaidInput = document.getElementById("amount-paid");
    const balanceElement = document.getElementById("balance");
    let cart = [];
    let cartItemId = 0;

    function addToCart(name, price) {
        const cartItem = {
            id: cartItemId++,
            name: name,
            price: parseFloat(price),
            quantity: 1
        };
        cart.push(cartItem);
        updateCart();
    }

    function updateCart() {
        cartTableBody.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="quantity-btn minus" data-item-id="${item.id}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn plus" data-item-id="${item.id}">+</button>
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="remove-item" data-item-id="${item.id}">Remove</button>
                </td>
            `;
            cartTableBody.appendChild(row);
            totalPrice += item.price * item.quantity;
        });
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    productList.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) {
            const productElement = e.target.parentElement;
            const name = productElement.getAttribute("data-name");
            const price = parseFloat(productElement.getAttribute("data-price"));

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                addToCart(name, price);
            }

            updateCart();
        }
    });

    amountPaidInput.addEventListener("input", () => {
        const amountPaid = parseFloat(amountPaidInput.value) || 0;
        const total = parseFloat(totalPriceElement.textContent);
        const balance = amountPaid - total;
        balanceElement.textContent = Math.max(0, balance).toFixed(2);
    });

    document.getElementById("checkout").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const total = parseFloat(totalPriceElement.textContent);
        const amountPaid = parseFloat(amountPaidInput.value) || 0;

        if (amountPaid < total) {
            alert("Insufficient payment amount!");
            return;
        }

        const balance = amountPaid - total;
        alert(`Checkout successful!\nTotal: $${total.toFixed(2)}\nAmount Paid: $${amountPaid.toFixed(2)}\nChange Due: $${balance.toFixed(2)}`);
        
        cart = [];
        updateCart();
        amountPaidInput.value = "";
        balanceElement.textContent = "0.00";
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const itemId = parseInt(e.target.getAttribute('data-item-id'));
            cart = cart.filter(item => item.id !== itemId);
            updateCart();
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn')) {
            const itemId = parseInt(e.target.getAttribute('data-item-id'));
            const isPlus = e.target.classList.contains('plus');
            
            const itemIndex = cart.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                if (isPlus) {
                    cart[itemIndex].quantity++;
                } else {
                    cart[itemIndex].quantity--;
                    if (cart[itemIndex].quantity === 0) {
                        cart = cart.filter(item => item.id !== itemId);
                    }
                }
                updateCart();
            }
        }
    });
});
