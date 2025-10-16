class Form {
  el = {
    fullName: () => cy.get('[data-testid="input-fullname"]'),
    fullNameError: () => cy.get("p").contains("Enter at least 3 characters"),
    email: () => cy.get('[data-testid="input-email"]'),
    emailError: () => cy.get("p").contains("Enter a valid email address"),
    phoneNumber: () => cy.get('[data-testid="input-phone"]'),
    phoneNumberError: () =>
      cy.get("p").contains("Enter a valid phone (7-15 digits)"),
    eventSelector: () => cy.get('[aria-label="Select Event"]'),
    eventSelectorError: () => cy.get("p").contains("Please select an event"),
    numberOfTickets: () => cy.get('[data-testid="input-tickets"]'),
    numberOfTicketsError: () =>
      cy.get("p").contains("Enter an integer between 1 and 10"),
    registerButton: () => cy.get('[data-testid="btn-submit"]'),
    resetButton: () => cy.get('[data-testid="btn-reset"]'),

    confirm: {
      fullName: () => cy.get('[data-testid="confirm-fullname"]'),
      email: () => cy.get('[data-testid="confirm-email"]'),
      phoneNumber: () => cy.get('[data-testid="confirm-phone"]'),
      event: () => cy.get('[data-testid="confirm-event"]'),
      numberOfTickets: () => cy.get('[data-testid="confirm-tickets"]'),
      ticketIdItem: () => cy.get('[data-testid="ticket-id-item"]'),

      confirmButton: () => cy.get('[aria-label="Confirm Registration"]'),
      closeButton: () => cy.get('[aria-label="Close Dialog"]'),
    },
  };

  visitUrl() {
    cy.visit("/concepts/form#try-it-yourself");
  }

  selectEvent(option) {
    this.el.eventSelector().click();
    cy.get('[role="listbox"]').contains(option).click();
  }

  changeNumberOfTickets(number) {
    form.el.numberOfTickets().type("{backspace}" + number);
  }
}

const form = new Form();

const validData = {
  fullName: "Ygor Goulart",
  email: "ygorgoulart@email.com",
  phoneNumber: "1234567890",
  event: "Automation Summit",
  numberOfTickets: 6,
};

const invalidData = {
  fullName: "a",
  email: "email",
  phoneNumber: "999",
  event: "none",
  numberOfTickets: -99,
};

describe("Submit form with valid data", () => {
  it("Should open confirmation with same data and get ticket IDs", () => {
    // Given we are in the form page
    form.visitUrl();

    // When we fill inputs with valid data
    form.el.fullName().type(validData.fullName);
    form.el.email().type(validData.email);
    form.el.phoneNumber().type(validData.phoneNumber);
    form.selectEvent(validData.event);
    form.changeNumberOfTickets(validData.numberOfTickets);

    // Then the Register button should not be disabled and we should click it
    form.el.registerButton().should("not.be.disabled").click();
    form.el.registerButton().should("contain", "Submitting...");

    // Then a modal should open with confirmation information
    form.el.confirm.fullName().then((e) => {
      form.el.confirm.fullName().should("contain", validData.fullName);
    });
    form.el.confirm.email().should("contain", validData.email);
    form.el.confirm.phoneNumber().should("contain", validData.phoneNumber);
    form.el.confirm.event().should("contain", validData.event);
    form.el.confirm
      .numberOfTickets()
      .should("contain", validData.numberOfTickets);

    form.el.confirm.ticketIdItem().then((tickets) => {
      expect(tickets.length).to.equal(validData.numberOfTickets);
    });

    // When we click the Confirm button
    form.el.confirm.confirmButton().click();

    // Then the modal should close and the form be clean
    form.el.confirm.confirmButton().should("not.exist");
    form.el.fullName().should("be.empty");
    form.el.email().should("be.empty");
    form.el.phoneNumber().should("be.empty");
    form.el.eventSelector().should("have.value", "");
    form.el.numberOfTickets().should("have.value", 1);
  });
});

describe("Submit form with missing required fields", () => {
  it("Submit button should remain disabled until all fields are filled correctly", () => {
    // Given we are in the form page
    form.visitUrl();

    // When we click the Register button while missing required fields
    form.el.registerButton().click({ force: true });

    // Then register button should be disabled
    form.el.registerButton().should("be.disabled");
  });
});

describe("Invalid email format validation", () => {
  it("Error message should appear below the email field and submission should be blocked", () => {
    // Given we are in the form page
    form.visitUrl();

    // When we type an invalid e-mail
    form.el.email().type(invalidData.email);

    // And focus another field
    form.el.phoneNumber().click();

    // Then the error message should be visible
    form.el.emailError().should("be.visible");

    // Then register button should be disabled
    form.el.registerButton().should("be.disabled");
  });
});

describe("Phone number with less than 7 digits", () => {
  it("Error message should appear below the phone field and submission should be blocked", () => {
    // Given we are in the form page
    form.visitUrl();

    // When we type an invalid e-mail
    form.el.phoneNumber().type(invalidData.email);

    // And focus another field
    form.el.email().click();

    // Then the error message should be visible
    form.el.phoneNumberError().should("be.visible");

    // Then register button should be disabled
    form.el.registerButton().should("be.disabled");
  });
});

describe("Tickets less than 1", () => {
  it("Error message should appear below tickets field and Register button should remain disabled", () => {
    // Given we are in the form page
    form.visitUrl();

    // When we type an invalid e-mail
    form.el.phoneNumber().type(invalidData.email);

    // And focus another field
    form.el.email().click();

    // Then the error message should be visible
    form.el.phoneNumberError().should("be.visible");

    // Then register button should be disabled
    form.el.registerButton().should("be.disabled");
  });
});

describe("Verify Reset button functionality", () => {
  it("All fields should be cleakered and tickets reset to 1", () => {
    // Given we are in the form page
    form.visitUrl();

    // When we fill inputs with valid data
    form.el.fullName().type(validData.fullName);
    form.el.email().type(validData.email);
    form.el.phoneNumber().type(validData.phoneNumber);
    form.selectEvent(validData.event);
    form.changeNumberOfTickets(validData.numberOfTickets);

    // And we click the Reset button
    form.el.resetButton().click();

    // Then the input fields should be reset to default
    form.el.fullName().should("be.empty");
    form.el.email().should("be.empty");
    form.el.phoneNumber().should("be.empty");
    form.el.eventSelector().should("have.value", "");
    form.el.numberOfTickets().should("have.value", 1);
  });
});

describe("Multiple tickets generate unique IDs", () => {
  it("Confirmation dialog should display as many ticket IDs as number of tickets entered, all unique", () => {
    // Given we are in the form page
    form.visitUrl();

    // When we fill inputs with valid data
    form.el.fullName().type(validData.fullName);
    form.el.email().type(validData.email);
    form.el.phoneNumber().type(validData.phoneNumber);
    form.selectEvent(validData.event);
    form.changeNumberOfTickets(10);

    // Then the Register button should not be disabled and we should click it
    form.el.registerButton().should("not.be.disabled").click();
    form.el.registerButton().should("contain", "Submitting...");

    // Then a modal should open with confirmation information
    form.el.confirm.ticketIdItem().then(($tickets) => {
      // Validate length
      expect($tickets.length).to.equal(10);

      // Validate unique IDs
      const ids = [...$tickets].map((el) => el.textContent.trim());
      const uniqueIds = new Set(ids);
      expect(ids.length).to.equal(uniqueIds.size);
    });
  });
});
