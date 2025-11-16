export const deliveryOption = [
	{
		id: "1",
		days: 7,
		priceCent: 0,
	},
	{
		id: "2",
		days: 3,
		priceCent: 499,
	},
	{
		id: "3",
		days: 1,
		priceCent: 999,
	},
];
export function getOption(selectedOption) {
	let resultOption;
	deliveryOption.forEach((option) => {
		if (option.id === selectedOption) {
			resultOption = option;
		}
	});
	return resultOption || deliveryOption[0];
}
