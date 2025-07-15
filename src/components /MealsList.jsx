import React from "react";
import { Link } from "react-router";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoriteContext";



const MealsList = ({ meals, navigate}) => 
{
  const { favorites, handleFavorites } = useContext(FavoritesContext);

  console.log("The meals are:", meals);
  if (!meals || meals.length === 0) 
      {return <div className="text-center p-6 text-gray-600 font-semibold text-lg">
            Loading recipe...</div>
      }

  return (
    <div className="mx-auto p-4 bg-[url(/assets/bg17.png)]">
    <div className="grid grid-cols-1">
        
    {meals.map((meal) => {
    const alreadyFav = favorites.some(fav => fav.idMeal === meal.idMeal);
    return (
      <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-[#B0E0E6] rounded-xl p-6 shadow-md max-w-7xl max-h-6xl mx-auto my-6">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full max-w-[500px] h-[400px] object-cover rounded-xl"/>
          </div>
          <div className="space-y-4 text-center md:text-left">
              <h3 className="font-bold text-3xl md:text-4xl">{meal.strMeal}</h3>
              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {meal.strCategory}
                </span>
                <span className="bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {meal.strArea}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center md:justify-start items-center">

                {alreadyFav ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                     // e.stopPropagation();
                      handleFavorites(meal);
                    }}
                    className="px-4 py-2 rounded-lg bg-red-100 text-red-600 border border-red-300 font-semibold shadow hover:bg-red-200 transition-all duration-200"
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
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                     // e.stopPropagation();
                      handleFavorites(meal);
                     // navigate("/favorites");
                      console.log('The Clicked meal is:', meal.strMeal);
                    }}
                    className="px-4 py-2 rounded-lg bg-indigo-100 text-blue-400 border border-blue-400 font-semibold shadow hover:bg-indigo-200 transition-all duration-200"
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
                )}

                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm"
                  aria-label={`Watch ${meal.strMeal} recipe video on YouTube`}
                  onClick={(e) => {
                                    e.stopPropagation(); // Prevents the click from triggering the parent <Link>
                                    console.log("Clicked nested <a> tag");
                                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch on YouTube
                </a>
              </div>

              <h4 className="text-gray-700">
                {meal.strInstructions ? meal.strInstructions.slice(0, 300) + "..." : "Instructions not available"}
              </h4>
           </div>
        </div>
      </Link>
      
        );
})}
    </div>
    </div>
    );
};

  export default MealsList;
