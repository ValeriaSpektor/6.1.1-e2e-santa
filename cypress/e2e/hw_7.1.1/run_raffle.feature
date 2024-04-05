Feature: Successful Box Management

  Scenario: Create, Add Participants, Conduct Raffle, and Delete Box
    Given the user is logged in
    When the user creates a box with the name "Test Box"
    And adds participants
    Then the box is successfully created
    When the user navigates to the box and adds participants manually
    Then participants are successfully added
    When the user conducts a prize drawing
    Then the drawing is successfully completed
    When the user deletes the box
    Then the box is successfully deleted
