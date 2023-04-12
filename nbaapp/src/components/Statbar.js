import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
const Statbar = () => {
     // Declare state variables for the search query
    const [query, setQuery] = useState("");
    //Declare state variables for the search Results
    const [results, setResults] = useState([]);

    useEffect(()=>{
        if (query!==''){
            //axios request to get team data using search query
          axios.get(`https://www.balldontlie.io/api/v1/teams?search=${query}&per_page=100`)
            .then(response =>setResults(response.data.data))
            .catch(error => console.error(error))
            
            //axios request to get player data using search query
          axios.get(`https://www.balldontlie.io/api/v1/players?search=${query}&per_page=100`)
            .then(response =>setResults(prevResults => [...prevResults, ...response.data.data]))
            .catch(error => console.error(error))
        }  else {
          setResults([])
        } 
    
      }, [query]) // Will only rerun when the query state changes

    // Function that handles inputs in the search bar and sets it to the query

    function handleInputChange(event) {
        setQuery(event.target.value);
      }
  return (
    <div>
        <input
        type = 'text'
        value = {query}
        onChange ={handleInputChange}
        placeholder = "Search stats.."
        >
        
        </input>
        <button type="submit">Submit</button>
        <ul>
  {results.map(result => (
    <li key={result.id}>{result.abbreviation || result.first_name + ' ' + result.last_name}</li>
  ))}
</ul>


    </div>

    
  )
}

export default Statbar