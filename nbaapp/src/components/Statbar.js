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
            // Check if query matches a known player name
            axios.get(`https://www.balldontlie.io/api/v1/players?search=${query}`)
                .then(response => {
                    const players = response.data.data;
                    if (players.length > 0) {
                        // If a player is found, assume user is searching for career stats
                        const playerId = players[0].id;
                        axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`)
                            .then(response => setResults(response.data.data))
                            .catch(error => console.error(error));
                    } else {
                        // If no player is found, assume user is searching for season stats
                        const yearMatch = query.match(/\b\d{4}\b/);
                        if (yearMatch) {
                            const year = yearMatch[0];
                            const playerName = query.replace(year, '').trim();
                            axios.get(`https://www.balldontlie.io/api/v1/players?search=${playerName}`)
                                .then(response => {
                                    const player = response.data.data[0];
                                    const playerId = player.id;
                                    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${year}&player_ids[]=${playerId}`)
                                        .then(response => setResults(response.data.data))
                                        .catch(error => console.error(error));
                                })
                                .catch(error => console.error(error));
                        }
                    }
                })
                .catch(error => console.error(error))
        } else {
            setResults([])
        } 
    }, [query]) 

    // Function that handles inputs in the search bar and sets it to the query
    function handleInputChange(event) {
        setQuery(event.target.value);
    }

    return (
        <div>
            <input
                type='text'
                value={query}
                onChange={handleInputChange}
                placeholder="Search stats.."
            />

            <ul>
            {results.map((result) => (
    <li key={result.id}>
        {result.player && result.player.first_name} {result.player && result.player.last_name} - PTS:{' '}
        {result.pts} REB: {result.reb} AST: {result.ast}
    </li>
))}

    
</ul>

        </div>
    )
}

export default Statbar
