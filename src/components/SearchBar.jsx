import { useState } from "react";
import "../styles/searchBar.css";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div className="search">
      <br />
      <input className="search__input" type="text" placeholder="Buscar producto..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <button className="search__button" onClick={() => onSearch(query)}>Buscar</button>
    </div>
  );
}
