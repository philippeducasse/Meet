Feature: Filter events by city
    Scenario: When user hasn't searched fora city, show upcoming events for all cities.
    Given user hasn't searched for a city
    When the user opens the app
    Then the user should see the list of all upcoming events.

    Scenario: User should see a list of suggestions when they search for a city.
    Given the main page is open
    When the user types into the city textbox
    Then the user should see a list of suggested cities that match what they typed

    Scenario: User can select a city from the suggestion list.
    Given the user has typed "Berlin" into the textbox
    And the list of suggested cities appears
    When the user clicks on the suggestion "Berlin, Germany" from the list
    Then their city search should be changed to the name of the selected city
    And the user should receive a list of events corresponding to that city