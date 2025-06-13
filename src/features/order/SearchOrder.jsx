import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <input
          className="w-28 rounded-full bg-lime-100 px-10 py-2 text-sm transition-all duration-500 placeholder:text-stone-400 focus:ring focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none sm:w-64 sm:focus:w-100"
          placeholder="Search order number"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FaSearch className="absolute top-2.5 left-3" />
      </div>
    </form>
  );
}

export default SearchOrder;
