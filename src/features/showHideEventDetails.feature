Feature: Show and hide event details
    Scenario: An event is collapsed by default
        Given: the user has clicked on the city for which to browse events
        When: the user receives list of events in that city
        Then: details of all events should be collapsed by default
    Scenario: User can expand an event to see its details
        Given: the user has received a list of collapsed events for a specific city
        When: user clicks on a specific event
        Then: details of the event should be displayed
    Scenario: User can collapse an event to hide its details
        Given: user has expanded an event to show its details
        When: user clicks on expanded event again
        Then: details of the event should be hiden