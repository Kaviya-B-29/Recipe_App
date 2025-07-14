import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FavoritesContext } from "../context/FavoriteContext";



const RecipeDetails = () => {

  const { favorites, handleFavorites } = useContext(FavoritesContext);

  const { id } = useParams();
  const navigate = useNavigate();

  //fav info 
 const alreadyFav = favorites.some(fav => fav.idMeal === id);



  const [Recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => {
        const fetchedRecipe = response.data.meals[0];
        setRecipe(fetchedRecipe);

        let simpleList = [];
        for (let i = 1; i <= 20; i++) {
          let item = fetchedRecipe["strIngredient" + i];
          let qty = fetchedRecipe["strMeasure" + i];
          if (item && item !== "") {
            simpleList.push(item + " - " + qty);
          }
        }
        setIngredients(simpleList);
      })
      .catch((err) => console.log("Fetch Error: ", err));
  }, [id]);

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-8 bg-gradient-to-br from-cyan-100 via-white to-blue-100 rounded-2xl shadow-xl my-4 sm:my-6 animate-fade-in"> 
      
      {/* Loading State */}
      {!Recipe.strMeal && (
        <div className="text-center p-6 text-gray-600 font-semibold text-lg">
          Loading recipe...
        </div>
      )}

      {/* Main Content */}
      {Recipe.strMeal && (
        <div className="flex flex-col gap-2">
          {/* Image and Details Row */}
          <div className="flex flex-col items-center md:flex-row gap-2 md:gap-4">
            {/* Image Section */}
            <div className="flex-shrink-0 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={Recipe.strMealThumb}
                alt={Recipe.strMeal}
                className="w-[350px] h-[263px] sm:w-[450px] sm:h-[338px] object-cover rounded-xl shadow-md transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Details Section */}
            <div className="relative flex flex-col gap-2 flex-1 md:mx-5 lg:mx-10">

               {/* Heart Favorite Button */}
              <button
                onClick={() => handleFavorites(Recipe)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg border transition duration-300 ${
                  alreadyFav ? 'bg-red-100 border-red-300 text-red-600' : 'bg-white border-gray-300 text-gray-400'
                } hover:scale-105 shadow-sm`}
                aria-label={alreadyFav ? "Remove from favorites" : "Add to favorites"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={alreadyFav ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 3.75c-1.74 0-3.41.81-4.5 2.09a6.16 6.16 0 00-4.5-2.09A5.25 5.25 0 002.25 9c0 6.12 9.75 11.25 9.75 11.25S21.75 15.12 21.75 9A5.25 5.25 0 0016.5 3.75z"
                  />
                </svg>
              </button>

                {/* details*/}
              
              <h1 className="font-family font-bold text-3xl sm:text-4xl md:text-5xl text-gray-800">
                {Recipe.strMeal}
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="bg-yellow-300 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  {Recipe.strCategory || "N/A"}
                </span>
                <span className="bg-green-300 text-green-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  {Recipe.strArea || "N/A"}
                </span>
                {Recipe.strTags && (
                  <span className="bg-blue-300 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    {Recipe.strTags}
                  </span>
                )}
              </div>
              <div>
                <h2 className="font-family font-bold text-xl sm:text-2xl text-gray-800">Ingredients</h2>
                <ul className="list-disc ml-6 text-gray-700 text-sm sm:text-base font-sans">
                  {ingredients.length > 0 ? (
                    ingredients.map((item, index) => (
                      <li key={index} className="mb-1">
                        {item}
                      </li>
                    ))
                  ) : (
                    <li>No ingredients available</li>
                  )}
                </ul>
              </div>
              <div>{/*Youtube link  */}
                <a
                  href={Recipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm"
                  aria-label={`Watch ${Recipe.strMeal} recipe video on YouTube`}
                  
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Instructions Section (Full Width) */}
          <div className="w-full mt-2 border-t-2 border-cyan-200 pt-2">
            <h2 className="font-family font-bold text-xl sm:text-2xl text-gray-800">Instructions</h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-sans">
              {Recipe.strInstructions || "No instructions available"}
            </p>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-4 flex justify-center md:justify-start">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 shadow-sm"
          aria-label="Go back to previous page" >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;