import { Link } from "react-router-dom";
import SearchOrder from "../order/SearchOrder";
import Username from "../user/Username";

function Header() {
  return (
    // <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
    <header className="flex items-center justify-between border-b border-stone-200 bg-lime-700 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest text-stone-200">
        SliceCart - A Pizza Company 🍕
      </Link>

      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
