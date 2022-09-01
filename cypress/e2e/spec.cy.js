describe("empty spec", () => {
	it("visits timetabler", () => {
		cy.visit("https://timetabler.in");
		// cy.visit("https://example.cypress.io");
		cy.contains("");
	});
});
