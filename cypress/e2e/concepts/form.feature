Feature: Event registration

    Scenario: Submit form with valid data
        Form should submit successfully, loader should appear, and confirmation dialog should display with generated ticket IDs
    Scenario: Submit form with missing required fields
        Submit button should remain disabled until all fields are filled correctly
    Scenario: Invalid email format validation
        Error message should appear below the email field and submission should be blocked
    Scenario: Phone number with less than 7 digits
        Error message should appear below the phone field and submission should be blocked
    Scenario: Tickets less than 1
        Error message should appear below tickets field and Register button should remain disabled
    Scenario: Verify Reset button functionality
         All fields should be cleared and tickets reset to 1
    Scenario: Multiple tickets generate unique IDs
        Confirmation dialog should display as many ticket IDs as number of tickets entered, all unique