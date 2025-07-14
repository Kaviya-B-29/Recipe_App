// src/context/FavoritesContext.jsx
import { createContext, useEffect, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  const handleFavorites = (meal) => {
    const exists = favorites.find(f => f.idMeal === meal.idMeal);
    let updated;

    if (exists) {
      updated = favorites.filter(f => f.idMeal !== meal.idMeal);
    } else {
      updated = [...favorites, meal];
    }

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, handleFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
