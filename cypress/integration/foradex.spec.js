describe("Note app", function () {
  this.beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  //   it("front page can be opened", function () {
  //     cy.contains("Foradex");
  //   });

  it("login form can be opened", function () {
    cy.contains("show login").click();
    cy.get("#loginInputUsername").type("testUser");
    cy.get("#loginInputPassword").type("test-user-password");
    cy.get("#loginButton").click();
    cy.contains("Test User logged in");
  });
});
