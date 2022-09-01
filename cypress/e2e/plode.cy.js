describe("plode complete testing", () => {
	it("login", () => {
		cy.visit("https://plode.org/biboxselection");
		cy.contains("Play Computer");
		cy.get(".active").click();

		cy.get(".DeviceSelect_Skip_Button__1yP0C").click();
		cy.contains("YES");
		cy.contains("NO");

		// cy.get("YES").click();
		// cy.get("img");
	});
});
