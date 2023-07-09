import { useState } from "react";

const Event = ({ event }) => {
    const [collapsed, setCollapsed] = useState(true);
    const handleClick = () => {
        setCollapsed(!collapsed);
    };
    const startTime = event.start && event.start.dateTime;
    const timeZone = event.start && event.start.timeZone;
    return (
        <ul>
            <li className="event">
                {collapsed ? (
                    <div>
                        <h3 id="eventSummary">{event.summary}</h3>
                        <p className="eventStartTime">
                            {startTime}
                        </p>
                        <p>{event.location}</p>
                        <p className="eventTimeZone">
                            {timeZone}
                        </p>
                        <button onClick={handleClick} className="showDetails">Show Details</button>
                    </div>) : (

                    <div>
                        <h3 id="eventSummary">{event.summary}</h3>
                        <p className="eventStartTime">
                            {startTime}
                        </p>
                        <p>{event.location}</p>
                        <p className="eventTimeZone">
                            {timeZone}
                        </p>
                        <h4>About this Event:</h4>
                        <a className="eventLink" href = {event.htmlLink} target="_blank">See details on Google Calendar</a>
                        <p id="eventDescription">{event.description}</p>
                        <button onClick ={handleClick} className="hideDetails">Hide Details</button>
                    </div>
                )}
            </li>
        </ul>
    );
};

export default Event;
