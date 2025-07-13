import { Link } from "react-router-dom";
import SearchOrder from "../order/SearchOrder";
import Username from "../user/Username";

function Header() {
  return (
    // <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
    <header className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3 uppercase sm:px-[160px]">
      <Link
        to="/"
        className="text-[24px] font-semibold tracking-widest text-red-700"
      >
        SliceCart 🍕
      </Link>
      <SearchOrder />
    </header>
  );
}

export default Header;
