// describe("Appointments", () => {

//   it("should visit root", () => {
//     cy.visit("/");
//   });

//   // this doesn't work cause the test selects li then selects Tuesday which is H2 and h2 doesn't have css properties we are testing for
//   // it("should navigate to Tuesday", () => {
//   //   cy.visit("/");
//   //   cy.get("li")
//   //     .contains("Tuesday")
//   //     .click()
//   //     .should("have.css", "background-color", "rgb(242, 242, 242)");
//   // });

//   //this works cause you are selecting the elements li and Tuesday
//   //https://docs.cypress.io/api/commands/contains#Syntax
//   it("should navigate to Tuesday", () => {
//     cy.visit("/")
//     cy.contains("[data-testid=day]", "Tuesday")
//       .click()
//       .should("have.class", "day-list__item--selected");
//   });

// });

describe("Appointments", () => {
  beforeEach(() => {
    //cy.request('http://localhost:8001/api/debug/reset')
    //resets data sincce data has been changed in other tests
    cy.request("GET", "/api/debug/reset");
      // Visits the root of our web server
    cy.visit("/");
    cy.contains("Monday"); //basically indicating that the data is finished loading.
    //why would this be needed? Because if you see on cypress, without this, you don't have data loaded on the page
  });

  it("should book an interview", () => {
  
    // Clicks on the "Add" button in the second appointment
    // Enters their name
    // Chooses an interviewer
    // Clicks the save button
    // Sees the booked appointment

    cy.get("[alt=Add]")
      .first()
      .click();
    cy.get('[data-testid="student-name-input"]')
      .type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    //cy.get(".button--confirm").click();//works but compass uses .contains("Save")
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // Clicks the edit button for the existing appointment
    cy.get("[alt=Edit]").first().click({ force: true })
    // Changes the name and interviewer
    cy.get("[alt='Tori Malcolm']").click();
    cy.get('[data-testid="student-name-input"]').clear().type("Lydia Miller-Jones");
    // Clicks the save button
    cy.contains("Save").click();
    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
   
  });

  it("should cancel an interview", () => {
    // Visits the root of our web server
    cy.get("[alt=Delete]").first().click({ force: true })
    cy.contains("Confirm").click();
    cy.contains("DELETING").should("exist");
    cy.contains("DELETING").should('not.exist');
    cy.contains(".appointment__card--show", "Archie Cohen").should('not.exist');
    // Clicks the delete button for the existing appointment
    // Clicks the confirm button
    // Sees that the appointment slot is empty
        // First check that the "Deleting" indicator should exist. Cypress will make sure that we show the "Deleting" indicator before moving to the next command.
        // Then check that the "Deleting" indicator should not exist. Cypress will keep checking until we remove the indicator, or reach a timeout. In this case, it waits until we remove the indicator to move on.
        // Last check that the ".appointment__card--show" element that contains the text "Archie Cohen" should not exist.
  });
});
