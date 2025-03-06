describe("NY Times Most Viewed Articles", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json*",
      { fixture: "articles.json" }
    ).as("getArticles");

    cy.visit("/");
  });

  it("displays articles and allows navigation", () => {
    // Wait for articles to load
    cy.wait("@getArticles");

    // Check if articles are displayed
    cy.get('[data-testid="article-list"]').should("exist");
    cy.get('[data-testid="article-item"]').should("have.length.gt", 0);

    // Test period selection
    cy.get('[data-testid="period-select"]').select("30");
    cy.wait("@getArticles");

    // Click on an article and verify navigation
    cy.get('[data-testid="article-item"]').first().click();
    cy.url().should("include", "/article/");

    // Verify article detail page
    cy.get("button").contains("Back to Articles").should("exist");
    cy.get("a").contains("Read Full Article on NY Times").should("exist");
  });

  it("handles loading and error states", () => {
    // Test loading state
    cy.intercept(
      "GET",
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json*",
      {
        delay: 1000,
        fixture: "articles.json",
      }
    ).as("getDelayedArticles");

    cy.visit("/");
    cy.get('[data-testid="loading-spinner"]').should("exist");
    cy.wait("@getDelayedArticles");

    // Test error state
    cy.intercept(
      "GET",
      "https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json*",
      {
        statusCode: 500,
        body: { error: "Server error" },
      }
    ).as("getErrorArticles");

    cy.visit("/");
    cy.get('[data-testid="error-message"]').should("exist");
  });
});
