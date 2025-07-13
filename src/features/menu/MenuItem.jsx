import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import Button from "../ui/Button";
import DeleteItem from "../cart/DeleteItem";
import { formatCurrency } from "../utilities/helpers";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  function handleAddToCart() {
    const newPizza = {
      pizzaId: id,
      name,
      imageUrl,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newPizza));
  }
  return (
    // <li className="flex gap-4 py-2">
    //   <img
    //     src={imageUrl}
    //     alt={name}
    //     className={`h-24 ${soldOut ? "bg opacity-70 grayscale" : ""}`}
    //   />
    //   <div className="flex flex-grow flex-col pt-0.5">
    //     <p className="font-medium">{name}</p>
    //     <p className="text-sm text-stone-500 capitalize italic">
    //       {ingredients.join(", ")}
    //     </p>
    //     <div className="mt-auto flex items-center justify-between">
    //       {!soldOut ? (
    //         <p className="text-sm">{formatCurrency(unitPrice)}</p>
    //       ) : (
    //         <p className="text-sm font-medium text-stone-500 uppercase">
    //           Sold out
    //         </p>
    //       )}

    //       {currentQuantity > 0 && (
    //         <div className="item-center flex gap-3 sm:gap-8">
    //           <UpdateItemQuantity pizzaId={id} quantity={currentQuantity} />
    //           <DeleteItem pizzaId={id} />
    //         </div>
    //       )}

    //       {!soldOut && currentQuantity === 0 && (
    //         <Button type="small" onClick={handleAddToCart}>
    //           Add to Cart
    //         </Button>
    //       )}
    //     </div>
    //   </div>
    // </li>

    <li
      className={`${currentQuantity > 0 && "animate-[scaleUp_0.2s_ease-in-out]"} grid max-w-[300px] grid-rows-[auto_0.5fr_0.5fr_1fr] items-center rounded-[10px] bg-white pb-4 transition-all hover:scale-105`}
    >
      <img
        src={imageUrl}
        alt={name}
        className={`h-[180px] w-full rounded-[10px] ${soldOut ? "bg opacity-70 grayscale" : ""}`}
      />

      <p className="mt-3 mb-1 px-4 text-[18px] font-medium">{name}</p>
      <p className="mb-1 px-4 text-sm text-stone-500 capitalize">
        {ingredients.join(", ")}
      </p>
      <div className="mt-auto flex items-center justify-between px-4">
        {!soldOut ? (
          <p className="text-lg font-medium">{formatCurrency(unitPrice)}</p>
        ) : (
          <p className="mb-1.5 text-[16px] font-medium text-stone-500 uppercase">
            Sold out
          </p>
        )}

        {currentQuantity > 0 && (
          <div className="item-center flex gap-1 sm:gap-1">
            <UpdateItemQuantity pizzaId={id} quantity={currentQuantity} />
            {/* <DeleteItem pizzaId={id} /> */}
          </div>
        )}

        {!soldOut && currentQuantity === 0 && (
          <Button type="small" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        )}
      </div>
    </li>
  );
}

export default MenuItem;
