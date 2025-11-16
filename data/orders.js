export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrders(order) {
	orders.unshift(order);
	saveOrder();
}
function saveOrder() {
	localStorage.setItem("orders", JSON.stringify(orders));
}
