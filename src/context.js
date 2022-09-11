import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}${searchTerm}`)
      .then((response) => {
        setLoading(false);
        const data = response.data;
        const { drinks } = data;
        if (drinks) {
          setCocktails(drinks);
          console.log(drinks);
        } else {
          setCocktails([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{ loading, searchTerm, cocktails, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
