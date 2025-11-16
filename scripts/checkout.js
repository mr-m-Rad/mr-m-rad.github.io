import { renderOrderSummery } from "./checkout/orderSummery.js";
import { renderPayment } from "./checkout/calcCart.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";
async function loadPage() {
	try {
		// throw "error1";
		await loadProductsFetch();
		await new Promise((resolve, reject) => {
			// throw "error2";
			loadCart(() => {
				//reject is used in the promise when something is gonna happen in future
				// reject("error3");
				resolve();
			});
		});
	} catch (error) {
		console.log("Error. pls check your ethernet");
		console.log(error);
	}
	renderOrderSummery();
	renderPayment();
}
loadPage();

// Promise.all([
// 	loadProductsFetch(),
// 	new Promise((resolve) => {
// 		loadCart(() => {
// 			resolve();
// 		});
// 	}),
// ]).then(() => {
// 	renderOrderSummery();
// 	renderPayment();
// });

// new Promise((resolve) => {
// 	loadProducts(() => {
// 		resolve();
// 	});
// })
// 	.then(() => {
// 		return new Promise((resolve) => {
// 			loadCart(() => {
// 				resolve();
// 			});
// 		});
// 	})
// 	.then(() => {
// 		renderOrderSummery();
// 		renderPayment();
// 	});

// loadProducts(() => {
// 	loadCart(() => {
// 		renderOrderSummery();
// 		renderPayment();
// 	});
// });
