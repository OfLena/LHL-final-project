import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    user: [],
    recipes: [],
    filtered_recipes: [],
    favs: [],
    comments: [],
  });

  const [search, setSearch] = useState("");
  const [comment, setComment] = useState("");

  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    const currentPage = JSON.parse(localStorage.getItem("currentPage"));
    console.log("HERE", currentPage);
    if (currentPage) {
      console.log("getItem", currentPage);
      setCurrentPage(currentPage);
    }
  }, []);

  useEffect(() => {
    if (currentPage) {
      localStorage.setItem("currentPage", JSON.stringify(currentPage));
      console.log("setItem", currentPage);
    }
  }, [currentPage]);

  const filterRecipes = function () {
    let searchTerm = search;

    let searchArray = searchTerm.trim().split(" ");

    let re = new RegExp(searchArray.join("|"), "i");

    let resultsObj = [
      ...state.recipes.filter((recipe) => re.test(recipe.title)),
    ];

    return resultsObj;
  };

  useEffect(() => {
    setState((prev) => ({ ...prev, filtered_recipes: filterRecipes() }));
  }, [search]);

  useEffect(() => {
    Promise.all([
      axios.get("/users/1"),
      axios.get("/recipes"),
      axios.get("/favs"),
      axios.get("/comments"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        user: all[0].data,
        recipes: all[1].data,
        filtered_recipes: all[1].data,
        favs: all[2].data,
        comments: all[3].data,
      }));
    });
  }, []);



  return { state, setState, currentPage, setCurrentPage, search, setSearch };
}
