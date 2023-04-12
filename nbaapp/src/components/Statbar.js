import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Statbar = () => {
    // Declare state variables for the search query
    const [query, setQuery] = useState("");
    //Declare state variables for the search Results
    const [results, setResults] = useState([]);
    //Declare state variable for the search type (players or teams)
    const [searchType, setSearchType] = useState("teams");

    useEffect(()=>{
        if (query!==''){
            //axios request to get team or player data using search query and search type
            axios.get(`https://www.balldontlie.io/api/v1/${searchType}?search=${query}&per_page=100`)
                .then(response =>setResults(response.data.data))
                .catch(error => console.error(error))
        }  else {
            setResults([])
        } 
    }, [query, searchType]) // Will only rerun when the query or searchType state changes

    // Function that handles inputs in the search bar and sets it to the query
    function handleInputChange(event) {
        setQuery(event.target.value);
    }

    // Function that handles the selection of search type
    function handleSearchTypeChange(event) {
        setSearchType(event.target.value);
    }

    return (
        <div>
            <input
                type='text'
                value={query}
                onChange={handleInputChange}
                placeholder="Search stats.."
            />

            <form>
                <label>
                    <input 
                        type="radio" 
                        value="teams" 
                        checked={searchType === "teams"} 
                        onChange={handleSearchTypeChange} 
                    />
                    Teams
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="players" 
                        checked={searchType === "players"} 
                        onChange={handleSearchTypeChange} 
                    />
                    Players
                </label>
            </form>

            <ul>
    {results.map(result => (
        searchType === "players" || result.full_name.toLowerCase().includes(query.toLowerCase()) ? (
            <li key={result.id}>{result.abbreviation || result.first_name + ' ' + result.last_name}</li>
        ) : null
    ))}
</ul>

        </div>
    )
}

export default Statbar
