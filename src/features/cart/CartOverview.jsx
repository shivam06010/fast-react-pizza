import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartItems, getTotalCartPrice } from "./cartSlice";
import { formatCurrency } from "../utilities/helpers";

function CartOverview() {
  const x = useSelector(getTotalCartItems);
  const price = useSelector(getTotalCartPrice);

  if (!x) return;
  return (
    <div className="flex items-center justify-between border-1 border-t-stone-200 bg-white px-4 py-4 text-sm text-stone-800 uppercase sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-800 sm:space-x-6">
        <span> {x} pizzas</span>
        <span>{formatCurrency(price)}</span>
      </p>
      <Link
        to="/cart"
        className="rounded-[8px] bg-[#d61313] px-2 py-2 text-[12px] font-semibold text-white"
      >
        Go to cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
