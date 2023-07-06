import { NumberOfEvents } from "../components/NumberOfEvents";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
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