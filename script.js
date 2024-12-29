document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartTableBody = document.querySelector("#cart-table tbody");
    const totalPriceElement = document.getElementById("total-price");
    const amountPaidInput = document.getElementById("amount-paid");
    const balanceElement = document.getElementById("balance");
    let cart = [];
    let cartItemId = 0;
    let currentInvoiceNumber = 1;

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

    function generateInvoiceNumber() {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `INV${year}${month}${day}-${currentInvoiceNumber++}`;
    }

    function getCurrentDateTime() {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        return { date, time };
    }

    function updateCart() {
        cartTableBody.innerHTML = "";
        let totalPrice = 0;

        // Add invoice header
        const { date, time } = getCurrentDateTime();
        const invoiceHeader = document.createElement("tr");
        invoiceHeader.innerHTML = `
            <td colspan="5">
                <div class="invoice-header">
                    <div><strong>Invoice No:</strong> ${generateInvoiceNumber()}</div>
                    <div><strong>Date:</strong> ${date}</div>
                    <div><strong>Time:</strong> ${time}</div>
                </div>
            </td>
        `;
        cartTableBody.appendChild(invoiceHeader);

        // Add cart items
        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="quantity-btn minus" data-item-id="${item.id}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn plus" data-item-id="${item.id}">+</button>
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="remove-item" data-item-id="${item.id}">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
        });

        // Add bill total
        if (cart.length > 0) {
            const totalRow = document.createElement("tr");
            totalRow.innerHTML = `
                <td colspan="5" class="bill-total">
                    <strong>Total Amount: $${totalPrice.toFixed(2)}</strong>
                </td>
            `;
            cartTableBody.appendChild(totalRow);
        }

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
        const { date, time } = getCurrentDateTime();
        const invoiceNo = generateInvoiceNumber();

        if (amountPaid < total) {
            alert("Insufficient payment amount!");
            return;
        }

        const balance = amountPaid - total;
        alert(
            `Invoice No: ${invoiceNo}\n` +
            `Date: ${date}\n` +
            `Time: ${time}\n` +
            `------------------\n` +
            cart.map(item => 
                `${item.name} x${item.quantity}: $${(item.price * item.quantity).toFixed(2)}\n`
            ).join('') +
            `Total: $${total.toFixed(2)}\n` +
            `Amount Paid: $${amountPaid.toFixed(2)}\n` +
            `Change Due: $${balance.toFixed(2)}\n` +
            `------------------\n` +
            `Thank you for your purchase!`
        );
        
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
