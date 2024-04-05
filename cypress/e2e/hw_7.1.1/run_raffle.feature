# run_raffle.feature

Feature: Run Raffle

  Scenario: Successfully run raffle
    Given I am logged in as "userAutor"
    When I navigate to "Моя коробка"
    And I click on the box named "Zvezda"
    And I click on "Жеребьевка"
    And I initiate the raffle
    Then I should see the message "Жеребьевка проведена"
