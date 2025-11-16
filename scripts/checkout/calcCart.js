import { cart, updateCart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getOption } from "../../data/deliveryOptions.js";
import { addOrders } from "../../data/orders.js";
function toDolor(num) {
	const result = (Math.round(num) / 100).toFixed(2);
	return result;
}
export function renderPayment() {
	let sumProducts = 0;
	let ShippingSum = 0;
	cart.forEach((cartItem) => {
		const mach = getProduct(cartItem.productId);
		sumProducts += mach.priceCents * cartItem.quantity;

		const option = getOption(cartItem.deliveryOption);
		ShippingSum += option.priceCent;
	});
	const beforeTax = ShippingSum + sumProducts;
	const TaxCents = beforeTax * 0.1;
	const total = beforeTax + TaxCents;

	const paymentHtml = `
	<div class="payment-summary-row">
						<div>Items (${updateCart()}):</div>
						<div class="payment-summary-money">$${toDolor(sumProducts)}</div>
					</div>

					<div class="payment-summary-row">
						<div>Shipping &amp; handling:</div>
						<div class="payment-summary-money">$${toDolor(ShippingSum)}</div>
					</div>

					<div class="payment-summary-row subtotal-row">
						<div>Total before tax:</div>
						<div class="payment-summary-money">$${toDolor(beforeTax)}</div>
					</div>

					<div class="payment-summary-row">
						<div>Estimated tax (10%):</div>
						<div class="payment-summary-money">$${toDolor(TaxCents)}</div>
					</div>

					<div class="payment-summary-row total-row">
						<div>Order total:</div>
						<div class="payment-summary-money">$${toDolor(total)}</div>
					</div>

					<button class="place-order-button button-primary js-place-but">
						Place your order
					</button>
	
	`;
	document.querySelector(".js-payment-summery").innerHTML = paymentHtml;
	document
		.querySelector(".js-place-but")
		.addEventListener("click", async () => {
			try {
				const response = await fetch("https://supersimplebackend.dev/orders", {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({ cart: cart }),
				});

				const order = await response.json();
				addOrders(order);
				console.log("order added");
			} catch (error) {
				console.log(error);
			}
			window.location.href = "orders.html";
		});
}
