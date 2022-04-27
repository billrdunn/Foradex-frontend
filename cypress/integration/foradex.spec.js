// Mocha docs recommends using "function" syntax rather than arrow
// so that "this" is available.

/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const testItems = [
  {
    latin: "Agaricus arvensis",
    common: ["Horse Mushroom"],
    description: {
      cap: "White, sometimes discoloured grey/brown...",
      gills: "When young the gills are almost white...",
      stem: "Stout with a large double ring.",
      flesh: "White, firm, and brusing slightly yellow.",
      spores: "Dark purple/brown.",
    },
    habitat: "Pasture, meadows, lawns, road verges, parks. Often growing in rings.",
    image:
      "https://commons.wikimedia.org/wiki/Agaricus_arvensis#/media/File:2008-08-Agaricus-Stuttgart.JPG",
    flavour: "Excellent. Smells of aniseed. Should be cooked before consumption.",
    frequency: "Common.",
  },
  {
    latin: "Agaricus augustus",
    common: ["The Prince"],
    description: {
      cap: "Spherical when young becoming convex...",
      gills: "Gills starting off white to pink, maturing to dark brown...",
      stem: "White to pale cream and smoooth above the skirt...",
      flesh: "White, sometimes with a yellow tinge where cut or bruised.",
      spores: "Dark purple/brown.",
    },
    habitat: "Mixed woodland, particularly under conifers. Lawns and roadsides.",
    image:
      "https://commons.wikimedia.org/wiki/Category:Agaricus_augustus#/media/File:Agaricus_augustus_2011_G1.jpg",
    flavour: "Excellent. Smells of bitter almonds. Should be cooked before consumption.",
    frequency: "Uncommon.",
  },
];

const testUser = {
  name: "Test User",
  username: "testUser",
  password: "test-user-password",
};

describe("When logged in", function () {
  beforeEach(function () {
    // Ensure the database is in the same state before each test
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users/", testUser);
    cy.request("POST", "http://localhost:3001/api/items", testItems[0]);
    cy.request("POST", "http://localhost:3001/api/items", testItems[1]);
    cy.visit("http://localhost:3000");
    cy.contains("show login").click();
    cy.get("#loginInputUsername").type("testUser");
    cy.get("#loginInputPassword").type("test-user-password");
    cy.get("#loginButton").click();
  });

  it("item turns green when toggle found is clicked", function () {
    cy.contains("toggle found").click();
    cy.get("#itemBasicDiv").should(
      "have.css",
      "background",
      "rgb(144, 238, 144) none repeat scroll 0% 0%"
    );
  });

  it("item can be searched for and only that item is displayed", function () {
    cy.get("#searchBarInput").type("arvensi");
    cy.contains("Agaricus arvensis");
    cy.contains("Agaricus augustus").should("not.exist");
  });
});
