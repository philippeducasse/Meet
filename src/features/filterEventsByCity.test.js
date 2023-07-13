import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
    test('When user hasn\'t searched fora city, show upcoming events for all cities.', ({ given, when, then }) => {
        given('user hasn\'t searched for a city', () => {

        });

        let AppComponent;
        when('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        then('the user should see the list of all upcoming events.', async () => {

            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });


        test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
            given('the main page is open', () => {
                AppComponent = render(<App />);
            });
            let CitySearchDOM;
            when('the user types into the city textbox', async () => {
                const user = userEvent.setup();
                const AppDOM = AppComponent.container.firstChild;
                CitySearchDOM = AppDOM.querySelector('#city-search');
                let CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
                await user.type(CitySearchInput, 'Berlin');
            });

            then('the user should see a list of suggested cities that match what they typed', () => {
                let suggestionsListItems = within(CitySearchDOM).queryAllByRole('listitem');
                expect(suggestionsListItems).toHaveLength(2);
            });
        });

        test('User can select a city from the suggestion list.', ({ given, when, then, and }) => {
            let AppComponent;
            let AppDOM;
            let CitySearchDOM;
            let citySearchInput;
            given('the user has typed "Berlin" into the textbox', async () => {
                AppComponent = render(<App />);
                const user = userEvent.setup();
                AppDOM = AppComponent.container.firstChild;
                CitySearchDOM = AppDOM.querySelector('#city-search');
                citySearchInput = within(CitySearchDOM).queryByRole('textbox');

                await user.type(citySearchInput, 'Berlin')
            });
            let suggestionsListItems
            and('the list of suggested cities appears', () => {
                suggestionsListItems = within(CitySearchDOM).queryAllByRole('listitem');
                expect(suggestionsListItems).toHaveLength(2);
            });

            when('the user clicks on the suggestion "Berlin, Germany" from the list', async() => {
                const user = userEvent.setup();
                await user.click(suggestionsListItems[0]);
            });

            then('their city search should be changed to the name of the selected city', () => {
                expect(citySearchInput.value).toBe('Berlin, Germany');
            });

            and('the user should receive a list of events corresponding to that city', async () => {
                const renderedEventsComponent = AppDOM.querySelector('#event-list');
                const renderedEventsList = within(renderedEventsComponent).queryAllByRole('listitem');
                const allEvents = await getEvents();
                const BerlinEvents = allEvents.filter((event) => event.location == citySearchInput.value)
                expect(renderedEventsList).toHaveLength(BerlinEvents.length);
            });
        });
    });

});