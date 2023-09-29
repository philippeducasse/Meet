# Meet App #

This app allows users to access different events by cities. Users will be able to filter through different cities and browse through the events happening there. Users will be able to click on specific events of interest from a list in order to show or hide the details of each event. 

This progressive web app (PWA) was built using react and hosted using AWS serverlesss functionality. It was built implementing a Test Driven Development (TDD) approach

Users will be authenticated & authorised using OAuth, in which Google acts as the third party authenticator (users must have a google account to be able to use the app).

<img src = "/Screenshot.png">

## Technologies used

-   React

-   SCSS

-   JavaScript

-   Google Calendar API and OAuth2 authentication

-   Jest testing

-   Lighthouse (PWA checklist providede by Google)

-   AWS Lamba functions

-   React Testing Library

-   Jest (test runner)

-   Recharts (react library for data visualisation)


## Serverless fucntionality ##

This application uses serverless functionality by accessing a google calendar hosted by CareerFoundry. When a user selects a specific city, this will trigger a serverless function which will fetch data from a cloud server and return it in JSON format. 

## Feature 1: Filter Events by City

** User story ** 

As a user I should be able to filter events by city So that I can see the list of events that take place in that city

Scenarios

Scenario 1: When user hasn't searched for a city, show upcoming events from all cities. Given user hasn’t searched for any city When the user opens the app Then the user should see a list of all upcoming events

Scenario 2: User should see a list of suggestions when they search for a city. Given the main page is open When user starts typing in the city textbox Then the user should see a list of cities (suggestions) that match what they’ve typed

Scenario 3: User can select a city from the suggested list. Given the user was typing “Berlin” in the city textbox And the list of suggested cities is showing When the user selects a city (e.g., “Berlin, Germany”) from the list Then their city should be changed to that city (i.e., “Berlin, Germany”) And the list of suggestions should disappear And the user should receive a list of upcoming events in that city#

## Feature 2: Show/hide an event's details

User story

As a user, I should be able to click on an event to show or hide an event's details so that I can see or hide the information about specific events.

Scenario 1: An event element is collapsed by default

Given: the user has clicked on the city for which to browse events
When: the user receives list of events in that city
Then: details of all events should be collapsed by default

Scenario 2: User can expand an event to see its details

Given: the user has received a list of collapsed events for a specific city
When: user clicks on a specific event
Then: details of the event should be displayed

Scenario 3: User can collapse an event to hide its details

Given: user has expanded an event to show its details
When: user clicks on expanded event again
Then: details of the event should be hiden

## Feature 3: Specify number of events

User story

As a user, I should be able to decide how many events are displayed so that I can have control about how many events are displayed on my screen

Scenario 1: When user hasn’t specified a number, 32 is the default number

Given: user has clicked a city to display the events there and has not specified the number of events to be displayed
When: list of events is displayed
Then: the default number of collapsed events displayed should be 32

Scenario 2: User can change the number of events they want to see

Given: the user is presented with a list of collapsed events for a city
When: user selects number of events to be displayed
Then: number of events displayed will match number selected by the user

## Feature 4: Use the app when offline

As a user, I should be able to see and search for details by city so that I can use some features of the app even when offline

Scenario 1: Show cached data when there’s no internet connection

Given: The user no longer has access to the internet
When: user opens the app
Then: the app will continue displaying the cached data and an error message will appear

Scenario 2: Show error when user changes the settings (city, time range)

Given: the user no longer has access to the internet
When: user tries to change the search settings by changing the city or the time settings
Then: the app will display an eeror message saying that internet connection is unavailable

Feature 5: Data visualization

As a user, I should be able to visualise the number of upcoming events in a chart so that I can quickly see the number of events by cities

Scenario 1: Show a chart with the number of upcoming events in each city

Given: the user has not selected any city
When: user wants to compare number of events by city
Then: a chart appears giving the number of events by city.
