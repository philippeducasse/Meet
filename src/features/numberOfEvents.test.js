import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/numberOfEvents.feature');

defineFeature(feature, test => {
    
    let AppComponent;
    let AppDOM;
    let EventListDOM;
    let EventListItems;
    test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {

        given('user has not clicked a city to display the events there and has not specified the number of events to be displayed', () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild

        });

        when('list of events is displayed', async () => {



        });

        then('the default number of collapsed events displayed should be 32', async () => {
            await waitFor(() => {
                getEvents();
                EventListDOM = AppDOM.querySelector('#event-list')
                EventListItems = within(EventListDOM).queryAllByRole('listitem')
                expect(EventListItems).toHaveLength(32);
            })
        });
    });


    test('User can change the number of events they want to see', ({ given, when, then }) => {

        let numberOfEventsDOM;
        let numberInput;
        given('the user is presented with a list of collapsed events for a city', () => {

        });

        when('user selects number of events to be displayed', async () => {
            numberOfEventsDOM = AppDOM.querySelector('#numberOfEvents')
            numberInput = within(numberOfEventsDOM).queryByRole('textbox');

        });

        then('number of events displayed will match number selected by the user', async () => {
            const user = userEvent.setup();
            const AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild
            const NumberOfEventsDOM = AppDOM.querySelector('#numberOfEvents');
            const numberInput = within(NumberOfEventsDOM).queryByRole('textbox');
            await user.click(numberInput);
            await user.type(numberInput, '{backspace}{backspace}10');

            const renderedEventsComponent = AppDOM.querySelector('#event-list')
            const renderedEventsList = within(renderedEventsComponent).queryAllByRole('listitem')

            expect(renderedEventsList).toHaveLength(10)

        });
    });
})
