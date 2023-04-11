import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
const Statbar = () => {
     // Declare state variables for the search query
    const [query, setQuery] = useState("");
    //Declare state variables for the search Results
    const [results, setResults] = useState([]);

    useEffect(()=>{
        //Check if query is not empty
     if (query!==''){
        //Make API request to match query with search term
        axios.get('https://www.balldontlie.io/api/v1/teams?search=${query}')
        .then(response =>setResults(response.data.data))
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
        <ul>
        {results.map(result => (
          <li key={result.id}>{result.full_name}</li>
        ))}
      </ul>


    </div>

    
  )
}

export default Statbar