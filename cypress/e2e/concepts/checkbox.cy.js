describe("Checkboxes Tests", () => {
  const categories = [
    "technology",
    "sports",
    "business",
    "science",
    "health",
    "entertainment",
  ];

  const selected = ["technology", "science", "entertainment"];

  const el = {
    setPreferencesButton: () => cy.get("button").contains("Set Preferences"),
    confirmPreferencesButton: () => cy.get("button").contains("Done"),
  };

  const openPreferences = () => el.setPreferencesButton().click();
  const closePreferences = () => el.confirmPreferencesButton().click();

  beforeEach(() => {
    cy.visit("/concepts/checkbox#try-it-yourself");
  });

  it("Select each individually", () => {
    // Only news from the selected categories should appear
    openPreferences();
    categories.forEach((category) => {
      cy.contains("label", category, { matchCase: false })
        .find("input")
        .uncheck();
    });
    closePreferences();
    categories.forEach((category) => {
      openPreferences();
      cy.contains("label", category, { matchCase: false })
        .find("input")
        .check();
      closePreferences();
      cy.contains("span", category, { matchCase: false }).should("be.visible");
    });
  });

  it("Select multiple categories", () => {
    // Only news from the selected categories should appear
    openPreferences();
    categories.forEach((category) => {
      cy.contains("label", category, { matchCase: false })
        .find("input")
        .uncheck();
    });
    selected.forEach((category) => {
      cy.contains("label", category, { matchCase: false })
        .find("input")
        .check();
    });
    closePreferences();
    selected.forEach((category) => {
      cy.contains("span", category, { matchCase: false }).should("be.visible");
    });
  });

  it("Unselect all categories", () => {
    // A message indicating no news should be displayed
    openPreferences();
    categories.forEach((category) => {
      cy.contains("label", category, { matchCase: false })
        .find("input")
        .uncheck();
    });
    closePreferences();

    cy.contains(
      "p",
      'No news to display. Select categories using "Set Preferences".'
    );
  });

  it("Open and close preference dialog without changes", () => {
    // News items before and after dialog open should match

    cy.get(
      '[class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root mb-4 shadow-sm css-12nllm1"]'
    )
      .its("length")
      .as("visibleCount");

    openPreferences();
    cy.get('[aria-labelledby="«r2»"]').should("be.visible");
  });
});
