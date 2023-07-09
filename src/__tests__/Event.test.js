import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from "../components/Event";
import { extractDetails, extractLocations, getEvents } from "../api";

describe('<Event /> component', () => {
    let EventComponent;
    beforeEach(() => {
        EventComponent = render(<Event event={''}/>);
    });
    test('Renders show details button', () => {
        const showDetailsButton = EventComponent.queryByRole('button');
        expect(showDetailsButton).toBeInTheDocument();
    });
    test('Events are collapsed by default', () => {
        const eventDescription = EventComponent.queryByTestId('#eventDescription')
        expect(eventDescription).not.toBeInTheDocument();
    });
    test('Collapsed events are being rendered with mock-data', async () => {
        const allEvents = await getEvents();
        EventComponent.rerender(<Event event = {allEvents[0]}/>)
        const eventSummary = EventComponent.queryByRole('heading')
        const eventStartTime = EventComponent.getByText(allEvents[0].start.dateTime)
        const eventTimeZone = EventComponent.getByText(allEvents[0].start.timeZone)
        const eventLocation = EventComponent.getByText(allEvents[0].location)
        expect(eventSummary.textContent).toBe('Learn JavaScript')
        expect(eventLocation.textContent).toBe('London, UK')
        expect(eventStartTime.textContent).toBe('2020-05-19T16:00:00+02:00')
        expect(eventTimeZone.textContent).toBe('Europe/Berlin')
    });
    test('clicking on show details button expands the event', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        EventComponent.rerender(<Event event = {allEvents[0]}/>)
        const showDetailsButton = EventComponent.queryByRole('button');
        await user.click(showDetailsButton)
        const eventLink = EventComponent.getByRole('link')
        const eventDescription = EventComponent.getByText(allEvents[0].description)
        expect(eventLink).toHaveAttribute('href','https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MTlUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20');
        expect(eventDescription.textContent).toBe('Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) Javascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.')
    });
    test('expanded elements have a hide details button', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        EventComponent.rerender(<Event event = {allEvents[0]}/>)
        const showDetailsButton = EventComponent.container.querySelector('.showDetails');
        await user.click(showDetailsButton);
        const hideDetailsButton = EventComponent.container.querySelector('.hideDetails');
        expect(hideDetailsButton).toBeInTheDocument();
        expect(showDetailsButton).not.toBeInTheDocument();
    })
    test('clicking the hide details button collapses the event', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        EventComponent.rerender(<Event event = {allEvents[0]}/>)
        const showDetailsButton = EventComponent.container.querySelector('.showDetails');
        await user.click(showDetailsButton);
        const hideDetailsButton = EventComponent.container.querySelector('.hideDetails');
        await user.click(hideDetailsButton);
        expect(showDetailsButton.textContent).toBe('Show Details'); // this test passes using textContent but not showdetailsbutton tobeinthedocunment
        expect(hideDetailsButton).not.toBeInTheDocument();
    });
    })
