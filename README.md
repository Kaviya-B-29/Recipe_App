Recipe App
-----------
  A dynamic recipe application built with React, TailwindCSS, and Axios, allowing users to browse, search, filter, and save favorite recipes using data from TheMealDB API. This recipe application provides a responsive and intuitive user interface for exploring recipes, viewing detailed recipe information, and managing favorites stored in localStorage.

Features
----------
  1.Recipe Listings: Displays a list of recipes with key details like name, thumbnail image, category, and area. Each recipe card is clickable, directing to a detailed view.

  2.Search and Filter: Includes a search bar for finding recipes by name or keyword and a category filter to narrow down results. Search and filter functionalities work together for refined results.

  3.Recipe Details: Shows comprehensive recipe information, including ingredients, instructions, category, area, tags, and a YouTube video link (if available). A "Back" button allows easy navigation to the main list.

  4.Favorites: Users can mark recipes as favorites, which are stored in localStorage to persist across sessions. A dedicated Favorites page displays all saved recipes.

  5.Responsive Design: Built with TailwindCSS for a mobile-friendly, visually appealing interface.

  6.Smooth Navigation: Utilizes React Router for seamless page transitions and navigation.

Tech Stack
----------
React JS: Frontend framework for building the user interface and managing state.

TailwindCSS: Utility-first CSS framework for responsive and modern styling.

Axios: For making HTTP requests to TheMealDB API.

React Router: For client-side routing and navigation.

LocalStorage: For persisting favorite recipes across sessions.

TheMealDB API: Public API for fetching recipe data.

How to Use ?
------------
Browse Recipes: On the homepage, view a list of recipes fetched from TheMealDB API.

Search Recipes: Use the search bar in the navigation bar to find recipes by name or keyword.

Filter by Category: Select a category from the dropdown to filter recipes.

View Recipe Details: Click on a recipe card to see full details, including ingredients, instructions, and a YouTube link.

Manage Favorites: Click the heart icon on a recipe card or detail page to add/remove it from favorites. View all favorites on the /favorites page.

Navigate: Use the navigation bar to access the Favorites page or return to the homepage. The "Back" button on detail and favorites pages navigates to the previous page.

Project Structure
------------------
public/:Contains static assets.
|
|----assets/: Static assets like background images and logo.
  
src/:  -- Source code for the React application.
|
|--components/:
|  |
|  |-- MealsList.jsx: Component for displaying recipe cards.
|  |    
|  |-- NavBar.jsx: Navigation bar with search and filter functionality.
|--context/:
|  |
|  |-- FavoriteContext.jsx: Context for managing favorite recipes.
|
|--Pages/:
|  |
|  |-- Favorites.jsx: Page for viewing favorite recipes.
|  |   
|  |-- HomePage.jsx: Main page with recipe list and navbar.
|  |   
|  |-- RecipeDetails.jsx: Page for detailed recipe view.
      
App.jsx: Main app component with routing configuration.

index.css: TailwindCSS and custom styles.

main.jsx: Entry point for the React application.

index.html: Main HTML file for the app.

README.md: Project documentation.


API Usage
---------
The app fetches data from TheMealDB API using the following endpoints:

https://www.themealdb.com/api/json/v1/1/search.php?s=  : For default list in Homepage 

https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}  : For filtering selected category fetch 

https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}   : Search recipes by name/keyword.

https://www.themealdb.com/api/json/v1/1/filter.php?c={category}: Filter recipes by category.

https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}: Fetch detailed recipe by ID.

https://www.themealdb.com/api/json/v1/1/categories.php: Fetch available categories.

Notes
------

Favorites Persistence: Favorites are stored in the browser's localStorage, ensuring they persist across sessions.

Error Handling: The app includes basic error handling for API requests, displaying a loading state or message if data is unavailable.

Responsive Design: TailwindCSS ensures the app is fully responsive across devices, with optimized layouts for mobile, tablet, and desktop.
