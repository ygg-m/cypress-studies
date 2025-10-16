describe("Following a suggested user", () => {
  it("should follow a suggested user with correct state transitions", () => {
    // Given: I am on the suggestions page with an unfollowed user
    cy.visit("/concepts/button#try-it-yourself");

    // When: I click the Follow button
    cy.get('[aria-label="Follow"] button:not(:disabled)')
      .should("not.be.disabled")
      .and("contain.text", "Follow")
      .first()
      .click();

    // Then: Button shows processing state
    cy.get('[aria-label="Follow"] button')
      .eq(1)
      .should("be.disabled")
      .and("contain.text", "Processing...");

    // And: Button transitions to Following state
    cy.get('[aria-label="Unfollow"] button')
      .first()
      .should("not.be.disabled")
      .and("contain.text", "Following")
      .find("svg.done-icon")
      .should("exist");
  });
});

describe("unfollowing from suggested users", () => {
  it("should unfollow a suggested user with correct state transitions", () => {
    // Given: I am on the suggestions page with an followed user
    cy.visit("/concepts/button#try-it-yourself");

    cy.get('[aria-label="Follow"] button:not(:disabled)')
      .should("not.be.disabled")
      .and("contain.text", "Follow")
      .first()
      .click();

    cy.get('[aria-label="Unfollow"] button')
      .first()
      .should("not.be.disabled")
      .and("contain.text", "Following")
      .find("svg.done-icon")
      .should("exist");

    // When: I click the Unfollow button
    cy.get('[aria-label="Unfollow"] button')
      .should("not.be.disabled")
      .and("contain.text", "Following")
      .first()
      .click();

    // Then: Button shows processing state
    cy.get('[aria-label="Unfollow"] button')
      .should("be.disabled")
      .and("contain.text", "Processing...");
  });
});

describe("Removing a suggestion", () => {
  it("should remove a sugested user from the list", () => {
    // Given I am on the "Suggestions for you" page
    cy.visit("/concepts/button#try-it-yourself");

    // When I click the "Remove" button for a suggested user
    let initialCount;

    cy.get('[aria-label="Remove"]')
      .its("length")
      .then((count) => {
        initialCount = count;
        cy.get('[aria-label="Remove"]').first().click();
        // Then that suggestion should no longer appear in the list
        cy.get('[aria-label="Remove"]').should("have.length", initialCount - 1);
      });
  });
});

describe("Tooltip visibility", () => {
  it("should show tooltips when we mouse over buttons", () => {
    // Given I am on the "Suggestions for you" page
    cy.visit("/concepts/button#try-it-yourself");

    // When I hover over the follow button
    cy.get("button:not(:disabled)").contains("Follow").trigger("mouseover");

    // Then I should see the tooltip with "Follow"
    cy.get("[data-popper-placement] div")
      .contains("Follow")
      .should("be.visible");

    // When I hover over the Unfollow button
    cy.get('[aria-label="Follow"] button:not(:disabled)')
      .should("not.be.disabled")
      .and("contain.text", "Follow")
      .first()
      .click();

    cy.get('[aria-label="Unfollow"] button')
      .first()
      .should("not.be.disabled")
      .and("contain.text", "Following")
      .find("svg.done-icon")
      .should("exist");

    cy.get("button:not(:disabled)").contains("Following").trigger("mouseover");

    // Then I should see the tooltip with "Unfollow"
    cy.get("[data-popper-placement] div")
      .contains("Unfollow")
      .should("be.visible");

    // When I hover over the Remove button
    cy.get('[aria-label="Remove"]').first().trigger("mouseover");

    // Then I should see the tooltip with "Remove"
    cy.get("[data-popper-placement] div")
      .contains("Remove")
      .should("be.visible");
  });
});
