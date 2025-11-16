function toDolor(num) {
	const result = (Math.round(num) / 100).toFixed(2);
	return result;
}

describe("suite:format Currency", () => {
	it("convert cents to dollar", () => {
		expect(toDolor(2095)).toEqual("20.95");
	});
	it("works with 0", () => {
		expect(toDolor(0)).toEqual("0.00");
	});
	it("round to nearest value", () => {
		expect(toDolor(2000.5)).toEqual("20.01");
	});
});
