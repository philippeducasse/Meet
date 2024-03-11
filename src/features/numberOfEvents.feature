Feature: Specify number of events
    Scenario: When user hasn’t specified a number, 32 is the default number
        Given user has not clicked a city to display the events there and has not specified the number of events to be displayed
        When list of events is displayed
        Then the default number of collapsed events displayed should be 32

    Scenario: User can change the number of events they want to see

        Given the user is presented with a list of collapsed events for a city
        When user selects number of events to be displayed
        Then number of events displayed will match number selected by the user