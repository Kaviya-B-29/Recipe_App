
import { createBrowserRouter, RouterProvider } from 'react-router';
import HomePage from './Pages/HomePage';
import RecipeDetails from './Pages/RecipeDetails';
import Favorites from './Pages/Favorites';

//router object creation 
const routes = [
    {
      path:'/',
      element:<HomePage />,
      hydrateFallbackElement: <div>....Loading </div>,

    },
    {
      path:'/meal/:id',
      element : <RecipeDetails />,
      hydrateFallbackElement: <div>....Loading </div>,

    },
    {
      path: "/favorites",
      element: <Favorites />,
}

]

const router = createBrowserRouter(routes, 
    {
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,

      },
    }
);
const App = () => {


  return (
    <div>
       <RouterProvider 
       router={router} 
       future={{v7_startTransition: true,}}/>
    </div>
  )
}

export default App