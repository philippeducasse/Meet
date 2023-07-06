import { useState } from "react";

const Event = ({ event }) => {
    const [events, setEvents] = useState([]);
    const [collapsed, setCollapsed] = useState(true);

    const handleClick = () => {
        setCollapsed(!collapsed);
    };
    const startTime = event.start && event.start.dateTime;
    const timeZone = event.start && event.start.timeZone;
    return (
        <ul>
            <li >
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
                        <p className="eventLink">{event.htmlLink}</p>
                        <p id="eventDescription">{event.description}</p>
                        <button onClick ={handleClick} className="hideDetails">Hide Details</button>
                    </div>
                )}
            </li>
        </ul>
    );
};

export default Event;
