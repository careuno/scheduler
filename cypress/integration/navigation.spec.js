describe("Navigation", () => {

  it("should visit root", () => {
    cy.visit("/");
  });

  // this doesn't work cause the test selects li then selects Tuesday which is H2 and h2 doesn't have css properties we are testing for 
  // it("should navigate to Tuesday", () => {
  //   cy.visit("/");
  //   cy.get("li")
  //     .contains("Tuesday")
  //     .click()
  //     .should("have.css", "background-color", "rgb(242, 242, 242)");
  // });

  //this works cause you are selecting the elements li and Tuesday
  //https://docs.cypress.io/api/commands/contains#Syntax
  it("should navigate to Tuesday", () => {
    cy.visit("/")
    cy.contains("[data-testid=day]", "Tuesday") //
      .click()
      .should("have.class", "day-list__item--selected");
  });

});