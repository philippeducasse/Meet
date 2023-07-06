import React from 'react';
import { useState } from 'react';

export const NumberOfEvents = () => {
    const [displayedEvents, setDisplayedEvents] = useState(32)
    const handleChange = (event) => {
        setDisplayedEvents(event.target.value)
    }
  return (
    <div id="numberOfEvents">
        <input
            type="text"
            placeholder="32"
            value = {displayedEvents}
            onChange = {handleChange}
        />
    </div>
  )
}
