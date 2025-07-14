import Navbar from "../components /NavBar";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MealsList from "../components /MealsList";
import { useNavigate } from "react-router";
import Favorites from "./Favorites";
import RecipeDetails from "./RecipeDetails";


const HomePage= () =>{
  
const navigate = useNavigate(); // Initialize useNavigate

const [meals,setMeals]=useState([]);
const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState('');
const [searchInput, setSearchInput]=useState('');
const [favorites, setFavorites]=useState(() => {
  const storedfavs = localStorage.getItem("favorites");
  return storedfavs ? JSON.parse(storedfavs) : [];
}); // here we created localstorage variable in usestate to make sure on page reload what favs are already stored - lazy initialization

//favourites storage handler
const HandleFavorites = (meal) => {
  const alreadyExists = favorites.find(fav => fav.idMeal === meal.idMeal);

  let updatedFavorites ;
  if (!alreadyExists) {
    updatedFavorites = [...favorites, meal]; // add new meal
    
  }
  else {
    updatedFavorites = favorites.filter(fav => fav.idMeal !== meal.idMeal);

  }
  setFavorites(updatedFavorites); // update state
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // update localStorage
};

// search button handler
const handleSubmit = (input) => {
  console.log("HandleSubmit received:", input);
  setSearchInput(input);
};

//search input 
useEffect(()=>{
    
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response => setMeals(response.data.meals))
    .catch(err => console.error('Fetch error:', err));

},[searchInput]);
console.log({searchInput});
// default meal page link
useEffect(() => {
if ((searchInput || "").trim() !== "") return;

      axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
      .then(response => setMeals(response.data.meals))
      .catch(err => console.error('Fetch error:', err));

    }, [searchInput]);
    console.log({meals});
// categories list
  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then(response => setCategories(response.data.categories))
    .catch(err => console.error('Fetch error:', err))

  }, []);
  console.log('the categories are ', {categories});

  // filtering selected category fetch 
  useEffect(() => {
  if (selectedCategory !== "") {
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
      .then(response => setMeals(response.data.meals))
      .catch(err => console.error("Category Fetch Error: ", err));
    setSearchInput(""); // clear search to avoid clash
  }
}, [selectedCategory]);

//combined search + Category 

useEffect(()=>{
  //no search and filter
  if (!searchInput && !selectedCategory) {
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then(response => setMeals(response.data.meals))
    .catch(err => console.error('Fetch error:', err));
  }
  //only search no category filter
  else if (searchInput && !selectedCategory) {
  axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response => setMeals(response.data.meals))
    .catch(err => console.error('Search fetch error:', err));
  }

  //only category
  else if (!searchInput && selectedCategory) {
  axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
    .then(response => setMeals(response.data.meals))
    .catch(err => console.error('Category fetch error:', err));
  }
  // both search and filter
  else if (searchInput && selectedCategory) {
    console.log(`Fetching meals with search: ${searchInput} and category: ${selectedCategory}`);

  axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
  
    .then((response) => {
      console.log("Raw search results:", response.data.meals); 
      const results = response.data.meals || [];
      const filteredMeals = results.filter(
        (meal) => meal.strCategory === selectedCategory
      );
      console.log("Filtered meals:", filteredMeals);
      setMeals(filteredMeals);
    })
    .catch(err => console.error('Combined fetch error:', err));
}

},[searchInput , selectedCategory]);





    return (

        <div>
            <Navbar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setSearchInput={setSearchInput}
            handleSubmit={handleSubmit}/>
            
           <MealsList meals={meals} 
           navigate={navigate}
           />
        

        </div>

    );
};

export default HomePage;