import { useState } from "react"

const CitySearch = ({ allLocations }) => {
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
        setShowSuggestions(false); //to hide the list once it is clicked
    }

    return (
        <div id="city-search">
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                onFocus={() => setShowSuggestions(true)}
                value={query}
                onChange={handleInputChanged}
            />
            {showSuggestions ?
                <ul className="suggestions">
                    {suggestions.map((suggestion) => {
                        return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
                    })}
                    <li key='See all cities' onClick={handleItemClicked}>
                        <b>See all cities</b>
                    </li>
                </ul>
                : null
            }
        </div>

    )
}

export default CitySearch;