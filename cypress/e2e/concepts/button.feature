Feature: Follow & Unfollow Button Behavior

  Scenario: Following a suggested user
    Given I am on the "Suggestions for you" page
    And a suggested user is not currently followed
    When I click the "Follow" button
    Then the button should be temporarily disabled
    And the text should display "Processing..."
    When the action completes
    Then the button should be enabled again
    And the text should change to "Following"
    And the icon should display a check mark

  Scenario: Removing a suggestion
    Given I am on the "Suggestions for you" page
    When I click the "Remove" button for a suggested user
    Then that suggestion should no longer appear in the list

  Scenario: Unfollowing someone
    Given I am on the "Suggestions for you" page
    And a suggested user is already being followed
    When I click the "Following" button
    Then the button should be temporarily disabled
    And the text should display "Processing..."
    When the action completes
    Then the button should be enabled again
    And the text should change to "Follow"
    And the icon should display a follow icon

 Scenario: Tooltip visibility
    Given I am on the "Suggestions for you" page
    When I hover over the follow button
    Then I should see the tooltip with "Follow"
    When I hover over the Unfollow button
    Then I should see the tooltip with "Unfollow"
    When I hover over the Remove button
    Then I should see the tooltip with "Remove"