/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const SearchContext = createContext();

function SearchContextProvider(props) {
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <SearchContext.Provider value={{ filter, setFilter, loading, setLoading }}>
      {props.children}
    </SearchContext.Provider>
  );
}

export { SearchContextProvider };
export default SearchContext;
