import { formatCurrency } from "../utilities/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { useSelector } from "react-redux";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice, imageUrl } = item;
  console.log(imageUrl);
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="mx-auto max-w-[700px] rounded-[10px] border-1 border-b border-stone-200 bg-white px-4 py-3 sm:flex sm:items-center sm:justify-between">
      <div className="flex items-center gap-5">
        <img
          src={imageUrl}
          alt={name}
          className="h-[60px] w-[60px] rounded-[6px]"
        />
        <p className="mb-1 font-semibold text-stone-800 sm:mb-0">
          {quantity}&times; {name}
        </p>
      </div>

      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex gap-5">
          <DeleteItem pizzaId={pizzaId} />
          <UpdateItemQuantity pizzaId={pizzaId} quantity={currentQuantity} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
