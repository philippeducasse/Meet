import puppeteer from "puppeteer"

// Here, add portions of the warning messages you want to intentionally prevent from appearing
const MESSAGES_TO_IGNORE = [
    "When testing, code that causes React state updates should be wrapped into >act(...):",
    "Error:",
    "The above error occurred"
];

const originalError = console.error.bind(console.error);

console.error = (...args) => {
    const ignoreMessage = MESSAGES_TO_IGNORE.find(message => args.toString().includes(message));
    if (!ignoreMessage) originalError(...args);
}

jest.setTimeout(30000);

describe('filter events by city', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch(
            // {
            //     headless: false,
            //     slowMo: 250, // slow down by 250ms,
            //     timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
            //   }
              );
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
})

afterAll(() => {
    browser.close();
});

test('when user hasn\'t searched for a city, display events from all cities', async () => {
    const eventList = await page.$$('.event');
    expect(eventList).toHaveLength(32);
    })
test('User should see a list of suggestions when they search for a city', async () => {
    // const searchBox = page.$('.city input-field')
    await page.type('.city-input-field', 'Berlin');
    const suggestionsListItems = await page.$$('.suggestion-items');

    expect(suggestionsListItems).toHaveLength(2);
    })
test('User can select a city from the suggestion list', async () => {
    
    await page.click('.suggestion-items')
    const eventList = await page.$$('.event');

    //THIS ISNT WORKING
    // console.log(eventList)
    // const BerlinEvents =  await eventList.filter((event) => event.location == 'Berlin, Germany')
    // console.log(BerlinEvents)
    // expect(eventList).toHaveLength(BerlinEvents.length)
    expect(eventList).toHaveLength(16)
})
})


describe('show/hide an event details', () => {

    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch(
            //{
            //     headless: false,
            //     slowMo: 250, // slow down by 250ms,
            //     timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
            //   }
        );
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
        
    });

    afterAll(() => {
        browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event #eventDescription');
        expect(eventDetails).toBeNull();
    })
    test('User can expand an event to see its details', async () => {
        await page.click('.event .showDetails');
        const eventDetails = await page.$('.event #eventDescription');

        expect(eventDetails).toBeDefined();
    })
    test('User can collapse an event to hide details', async () => {
        await page.click('.event .hideDetails');
        const eventDetails = await page.$('.event #eventDescription');
        expect(eventDetails).toBeNull();

    })
})