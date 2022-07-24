/// <reference types="cypress" />

const uuid = () => Cypress._.random(0, 1e6);

describe("Main Test", () => {
  const id = uuid();

  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Visited home page", () => {
    cy.contains("UPayments Store");
  });

  it("Product and categories checked", () => {
    cy.intercept(
      "GET",
      "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/"
    ).as("get-products");

    cy.intercept(
      "GET",
      "https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/"
    ).as("get-categories");

    cy.wait("@get-products").then((response: any) => {
      expect(response.response.statusCode).to.eq(200);

      response.response.body.map((m: any) => {
        cy.contains(m.name);
      });
    });

    cy.wait("@get-categories").then((response: any) => {
      expect(response.response.statusCode).to.eq(200);

      response.response.body.map((m: any) => {
        cy.contains(m.name);

        cy.get("select").contains(`${m.name}`);
      });
    });
  });

  it("Went to create page and created product then navigated to home page with updated data", () => {
    cy.intercept(
      "POST",
      "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products"
    ).as("create-product");

    cy.get("[id^=create-button]").click();

    cy.get("#name").type(`Apple iPhone 13 Pro Max 256 GB ${id}`);

    cy.get("#description").type(`Apple iPhone 13 Pro Max 256 GB ${id}`);

    cy.get("#avatar").type(
      `https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=940&hei=1112&fmt=png-alpha&.v=1645552346288`
    );

    cy.get("#price").type(`${id}`);

    cy.get("[id^=submit-product-button]").click();

    cy.wait("@create-product").then((response: any) => {
      expect(response.state).to.eq("Complete");
    });

    cy.contains(`Apple iPhone 13 Pro Max 256 GB ${id}`);

    cy.contains(`${id}`);
  });

  it("Clicked to created product then navigated to detail page with that product's information", () => {
    cy.contains(`Apple iPhone 13 Pro Max 256 GB ${id}`).click();

    cy.contains(`Apple iPhone 13 Pro Max 256 GB ${id}`);

    cy.contains(`$ ${id}`);
  });

  it("Deleted latest created product", () => {
    cy.intercept(
      "DELETE",
      "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/*"
    ).as("delete-product");

    cy.get("[id^=delete-product-button]").last().click();

    cy.wait("@delete-product").then(({ response }: any) => {
      expect(response.statusCode).to.eq(200);
    });
  });

  it("Checked filter the listed items according to their categories", () => {
    cy.request({
      method: "GET",
      url: "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/",
    }).as("get-products");

    cy.get("@get-products").then((response: any) => {
      expect(response.status).to.eq(200);

      cy.get("select").select("Electronic").should("have.value", "Electronic");

      response.body.map((m: any) => {
        if (m.category === "Electronic") {
          cy.contains(m.name);
        }
      });

      cy.get("select").select("Furnitures").should("have.value", "Furnitures");

      response.body.map((m: any) => {
        if (m.category === "Furnitures") {
          cy.contains(m.name);
        }
      });

      cy.get("select").select("Clothing").should("have.value", "Clothing");

      response.body.map((m: any) => {
        if (m.category === "Clothing") {
          cy.contains(m.name);
        }
      });

      cy.get("select")
        .select("Accessories")
        .should("have.value", "Accessories");

      response.body.map((m: any) => {
        if (m.category === "Accessories") {
          cy.contains(m.name);
        }
      });
    });
  });
});
