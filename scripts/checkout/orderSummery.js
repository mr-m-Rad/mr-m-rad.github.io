import {
	cart,
	removeCartItem,
	updateCart,
	saveToStorage,
	updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct, loadProducts } from "../../data/products.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import { renderPayment } from "./calcCart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOption, getOption } from "../../data/deliveryOptions.js";
//////////
function skipDay(resultOption) {
	function isWeekend(day) {
		const dayString = day.format("dddd");
		return dayString === "Saturday" || dayString === "Sunday";
	}
	let today = dayjs();
	let remainingDay = resultOption.days;
	while (remainingDay > 0) {
		today = today.add(1, "day");
		if (!isWeekend(today)) {
			remainingDay--;
		}
	}

	today = today.format("dddd, MMMM D");
	return today;
}

export function renderOrderSummery() {
	let summeryHtml = "";
	cart.forEach((cartItem) => {
		const productId = cartItem.productId;
		let matchingItem = getProduct(productId);
		const selectedOption = cartItem.deliveryOption;
		const resultOption = getOption(selectedOption);

		const todayStringed = skipDay(resultOption);
		///////////
		summeryHtml += `
<div class="cart-item-container container-${productId}">
    <div class="delivery-date">Delivery date: ${todayStringed}</div>

    <div class="cart-item-details-grid">
        <img
            class="product-image"
            src="${matchingItem.image}"
        />

        <div class="cart-item-details">
            <div class="product-name">
                ${matchingItem.name}
            </div>
            <div class="product-price">$${matchingItem.getPrice()}</div>
            <div class="product-quantity">
                <span> Quantity: <span class="quantity-label js-quantity-id-${productId}">${
			cartItem.quantity
		}</span>
                <span data-product-id="${productId}" class="update-quantity-link link-primary js-update js-update-${productId}">
                    Update
                </span>
                <input data-product-id="${productId}" class="quantity-input input-${productId}"></input>
                <span data-product-id="${productId}"  class="save-quantity-link link-primary">Save</span>
                
                <span data-product-id="${productId}" class="delete-quantity-link link-primary js-delete">
                    Delete
                </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
			${deliveryHtml(productId, cartItem)}
        </div>
    </div>
</div>
`;
	});

	function deliveryHtml(productId, cartItem) {
		let htmlResult = "";
		deliveryOption.forEach((option) => {
			const todayStringed = skipDay(option);
			const priceString =
				option.priceCent === 0
					? "FREE"
					: `$ ${(option.priceCent / 100).toFixed(2)}`;
			///////////
			const isChecked = option.id === cartItem.deliveryOption;
			htmlResult += `
		 <div data-id="${productId}" data-delivery-id="${
				option.id
			}" class="delivery-option js-delivery-option">
                <input 
                    type="radio"
                    ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${productId}"
                />
                <div>
                    <div class="delivery-option-date">${todayStringed}</div>
                    <div class="delivery-option-price">${priceString} - Shipping</div>
                </div>
            </div>
		`;
		});
		return htmlResult;
	}

	document.querySelector(".js-order-Summary").innerHTML = summeryHtml;
	document.querySelectorAll(".js-delete").forEach((deleteBut) => {
		deleteBut.addEventListener("click", () => {
			const delId = deleteBut.dataset.productId;
			removeCartItem(delId);
			updateCartCheckout();
			renderPayment();
			renderOrderSummery();
		});
	});
	document.querySelectorAll(".js-update").forEach((updateBut) => {
		updateBut.addEventListener("click", () => {
			const updateId = updateBut.dataset.productId;
			const cartCounter = document.querySelector(`.container-${updateId}`);
			cartCounter.classList.add("is-editing-quantity");
		});
	});
	document.querySelectorAll(".save-quantity-link").forEach((saveBut) => {
		saveBut.addEventListener("click", () => {
			savingQuantity(saveBut);
		});
	});
	document.querySelectorAll(".quantity-input").forEach((inputItem) => {
		inputItem.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				savingQuantity(inputItem);
			}
		});
	});
	document.querySelectorAll(".js-delivery-option").forEach((element) => {
		element.addEventListener("click", () => {
			const productId = element.dataset.id;
			const resultOption = element.dataset.deliveryId;
			updateDeliveryOption(productId, resultOption);
			renderOrderSummery();
			renderPayment();
		});
	});

	function savingQuantity(saveBut) {
		const productId = saveBut.dataset.productId;
		const num = document.querySelector(`.input-${productId}`);

		const updateValue = Number(num.value);
		console.log(updateValue);
		num.value = "";
		if (updateValue < 1 || updateValue > 100) {
			alert("pick between 0 and 100");
			return;
		}
		updateQuantity(productId, updateValue);

		const cartCounter = document.querySelector(`.container-${productId}`);

		cartCounter.classList.remove("is-editing-quantity");
		document;
		const changeQuantityText = document.querySelector(
			`.js-quantity-id-${productId}`
		);
		renderOrderSummery();
	}

	function updateQuantity(productId, newQuantity) {
		cart.forEach((item) => {
			if (item.productId === productId) {
				item.quantity = newQuantity;
			}
			console.log(cart);
			saveToStorage();
			updateCart();
			updateCartCheckout();
			renderOrderSummery();
			renderPayment();
		});
	}

	function updateCartCheckout() {
		let cartCount = updateCart();
		cartCount = document.querySelector(
			".js-cart-count"
		).innerText = `${cartCount} items`;
	}
	updateCartCheckout();
}
