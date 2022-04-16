import axios from "axios";
import { useState } from "react";

export default function SearchBar (props) {

  const {} = props;
  const [search, setSearch] = useState("")

  function onClickSearch() {
    // need to query the current recipes populated (either favourites or your recipes) and find the recipes that match the text and populate those recipes 
  }

  return (
    <div>
      <form onSubmit ={e => e.preventDefault()}>
        <input 
          type="text" 
          // value={}
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          placeholder="E.g. Vegetarian"
        />
        <button>Search</button>
      </form>
    </div>
  )
}

