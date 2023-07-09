import React from 'react';
import { useState } from 'react';

export const NumberOfEvents = ({setCurrentNOE}) => {

  const [input, setInput] = useState(32)
    
    const handleChange = (event) => {
        const value = event.target.value
        setInput(value)
        setCurrentNOE(value)
    }
  return (
    <div id="numberOfEvents">
        <h5>Number of Events : </h5>
        <input
            className='input-field'
            type="text"
            placeholder="Number of events"
            value = {input}
            onChange = {handleChange}
        />
    </div>
  )
}
