import React from 'react'
import {useState} from "react";
const Statbar = () => {
    const [query, setQuery] = useState("");
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


    </div>

    
  )
}

export default Statbar