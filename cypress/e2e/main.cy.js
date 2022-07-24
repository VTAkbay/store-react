/// <reference types="cypress" />

describe("Main Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("test", () => {
    cy.contains("UPayments Store");
  });
});
