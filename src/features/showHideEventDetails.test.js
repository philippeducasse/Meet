import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
    let AppComponent;
    let AppDOM;
    let EventListDOM;
    let EventListItems;
    let eventDetails;
    test('An event is collapsed by default', async () => {
        AppComponent = render(<App />);
        AppDOM = AppComponent.container.firstChild;
        EventListDOM = AppDOM.querySelector('#event-list');
        await waitFor(() => {
            getEvents();
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        eventDetails = EventListItems[0].querySelector('#eventDescription');
        expect(eventDetails).toBeNull();
        })

    });
        const user = userEvent.setup()
     test('User can expand an event to see its details', async() => {
        await waitFor( async () => {
            getEvents();
        const showDetailsButton = EventListItems[0].querySelector('.showDetails');
        await user.click(showDetailsButton);
        expect(eventDetails).toBeDefined();
        });
     });

    test('User can collapse an event to hide its details', async() => {
        await waitFor( async () => {
            getEvents();
        const showDetailsButton = EventListItems[0].querySelector('.hideDetails');
        await user.click(showDetailsButton);
        expect(eventDetails).toBeNull();
    });
     });
})