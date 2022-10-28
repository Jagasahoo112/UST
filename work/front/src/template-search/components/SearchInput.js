import React, { useState } from 'react'
import { Spinner } from "@fluentui/react/lib/Spinner";


const SearchInput = ({ onSubmit }) => {
  const [checkblank, setcheckblank] = useState(false);
    const [query, setQuery] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      if(query.length==0)
      {
        setcheckblank(true);
        console.log("query" + query.length);
      }
      else
      {
        setcheckblank(false);
        onSubmit(query)
      }
    }    
    return (
      <><form className="search-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Template Name"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
        <button type="submit">Search</button>
      </form>
      <div>
          {checkblank && (
            <label id="lblvalidate" className="textvalidation">
              *Value should not be blank
            </label>
          )}
        </div></>
    );
  }

  export default SearchInput;