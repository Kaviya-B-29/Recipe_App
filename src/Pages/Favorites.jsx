import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FavoritesContext } from '../context/FavoriteContext';




const Favorites = () => {
  const { favorites, handleFavorites } = useContext(FavoritesContext);
  const navigate = useNavigate();
  const [favorit, setFavorites] = useState([]);
  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    if (favs) {
      setFavorites(JSON.parse(favs));
    }
  }, []);

  return (
    <div className="mx-auto p-4 bg-[url(/assets/bg11.png)]">
      <h1 className=" border-6 p-8 rounded-2xl font-family text-4xl font-bold text-center mb-8 mx-18 text-white"> Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1">


          {favorites.map((meal) => (
            <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal}>

            <div key={meal.idMeal}
              className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-pink-50 rounded-xl p-6 shadow-md max-w-7xl mx-auto my-6">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <img src={meal.strMealThumb} alt={meal.strMeal}
                  className="w-full max-w-[500px] h-[400px] object-cover rounded-xl" />
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
                <div className='flex gap-2'>
                    {/*<button onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleFavorites(meal); 
                            }}
                            className="border-2 border-red-500 text-red-600 px-5 py-2 rounded-lg font-semibold hover:bg-red-100 transition">
                            Remove from Favorites
                    </button>*/}
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
                <p className="text-gray-700">{meal.strInstructions?.slice(0, 400)}...</p>
              </div>
            </div>
            </Link>
          ))}

           
        </div>
      )}
     
      <div className="text-center mt-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default Favorites;
