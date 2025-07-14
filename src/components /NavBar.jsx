import { useNavigate } from "react-router";


const Navbar = ({categories, selectedCategory, setSelectedCategory,searchInput,setSearchInput,handleSubmit}) => {

const navigate = useNavigate();


  return (
    <nav className="bg-[#419aa5] text-white p-4 md:sticky top-0 z-10">
      <div className=" text-2xl w-full flex flex-col gap-2  justify-between  items-center md:flex-row">
        {/* Logo + Title */}
        <div className="flex items-center text-4xl md:text-4xl">
          <img src="/assets/receipe4.png" alt="logo" className="h-24 w-24 object-contain" />
          <h1 className="text-4xl font-family font-bold">Recipe<span className="text-yellow-300 ml-1">App</span></h1>
        </div>

        {/* Search Form */}
        
        <form  onSubmit={(e) => {
                e.preventDefault();
                const inputValue = e.target.elements.search.value;  
                handleSubmit(inputValue);                           
              }}

          className="flex flex-col sm:flex-row items-center gap-4">
            <input 
                onChange={(e) => setSearchInput(e.target.value)}
                name="search" 
                type="text"
                value={searchInput}
                placeholder="Search any recipes..."
                className="px-4 py-2 rounded-lg text-amber-50 border border-gray-300 "/>
            
            <button className="bg-white text-cyan-700 px-6 py-2 rounded-lg font-semibold hover:bg-purple-100"> Search</button>
        </form>

        {/*Filter by category*/}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
         className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-black">
          <option value=""> Filter by Category </option>
        {categories.map((cat) => (
          <option key={cat.strCategory} value={cat.strCategory}>
            {cat.strCategory}
          </option>
        ))}
      </select>

      <button onClick={() => navigate("/favorites")}
      className="px-4 py-2 rounded-lg border border-gray-300">Favorites</button>
      </div>
    </nav>
  );
};

export default Navbar;
