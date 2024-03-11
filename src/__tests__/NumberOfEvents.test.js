import { NumberOfEvents } from "../components/NumberOfEvents";
import App from "../App";
import { render, within } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE = {() => {}} setErrorAlert = {() => {}}/>);
    });
    test('renders text input', () => {
        const numberInput = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberInput).toBeInTheDocument();
    })
    test('default value of text input is 32', () => {
        const numberInput = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberInput).toHaveValue('32');
    })
    test('value of textbox changes accordingly to user input', async () => {
        const user = userEvent.setup();
        const numberInput = NumberOfEventsComponent.queryByRole('textbox');
        
        await user.type(numberInput, '{backspace}{backspace}5');
        
        expect(numberInput).toHaveValue('5')
    })
})
describe('<NumberOfEvents /> integration' , () => {
    test('renders correct number of events based on user input', async () => {
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
        
    })
})