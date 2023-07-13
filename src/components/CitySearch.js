import { useState, useEffect } from "react"

const CitySearch = ({ allLocations, setCurrentCity }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => {
            // checks if the index of value exists within location
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1; 
        }) : [];
        setQuery(value);
        setSuggestions(filteredLocations);
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent; // when user clicks a city, value will become clicked city
        setQuery(value);
        setCurrentCity(value);
        setShowSuggestions(false); //to hide the list once it is clicked
    }
    // must use this hhook because the allLocation array is fetched asynchronously, can't just initialise the state to allLocations
    useEffect(() => {
        setSuggestions(allLocations)
    }, [`${allLocations}`]); // This way, if there’s a change in it (e.g., an empty array that gets filled), the useEffect code will be re-executed again, ensuring that the local suggestions state is updated.
    // dependency array is the second optional argument is useEffect
    // which means that useEffect is only fired when dependency array is different from current update
    
    return (
        <div id="city-search">
            <input
                type="text"
                className="city-input-field"
                placeholder="Search for a city"
                onFocus={() => setShowSuggestions(true)}
                value={query}
                onChange={handleInputChanged}
            />
            {showSuggestions ?
                <ul className="suggestions">
                    {suggestions.map((suggestion) => {
                        return <li className= "suggestion-items" onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
                    })}
                    <li className= "suggestion-items" key='See all cities' onClick={handleItemClicked}>
                        <b>See all cities</b>
                    </li>
                </ul>
                : null
            }
        </div>

    )
}

export default CitySearch;