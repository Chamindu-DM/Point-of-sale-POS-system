document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartTableBody = document.querySelector("#cart-table tbody");
    const totalPriceElement = document.getElementById("total-price");
    const amountPaidInput = document.getElementById("amount-paid");
    const balanceElement = document.getElementById("balance");
    let cart = [];

    function updateCart() {
        cartTableBody.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = item.name;

            const priceCell = document.createElement("td");
            priceCell.textContent = `$${item.price.toFixed(2)}`;

            const quantityCell = document.createElement("td");
            quantityCell.textContent = item.quantity;

            const totalCell = document.createElement("td");
            const itemTotal = item.price * item.quantity;
            totalCell.textContent = `$${itemTotal.toFixed(2)}`;

            const actionCell = document.createElement("td");
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-item");
            removeButton.addEventListener("click", () => {
                cart.splice(index, 1);
                updateCart();
            });
            actionCell.appendChild(removeButton);

            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(quantityCell);
            row.appendChild(totalCell);
            row.appendChild(actionCell);

            cartTableBody.appendChild(row);

            totalPrice += itemTotal;
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
                cart.push({ name, price, quantity: 1 });
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
});
