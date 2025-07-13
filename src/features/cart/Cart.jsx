import LinkButton from "../ui/LinkButton";
import Button from "../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "./cartSlice";
import { formatCurrency } from "../utilities/helpers";

function Cart() {
  const username = useSelector((store) => store.user.username);
  const price = useSelector(getTotalCartPrice);
  const cart = useSelector(getCart);
  console.log(cart);
  // const dispatch = useDispatch();

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-3 py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-center text-xl text-[28px] font-semibold text-stone-800">
        Your Cart
      </h2>

      <ul className="mt-3 space-y-2 divide-y divide-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="py- mx-auto mt-6 max-w-[700px] space-x-2 rounded-[10px] border-1 border-stone-200 bg-white px-6 py-6">
        <div className="mb-6 flex justify-between text-[20px] font-semibold">
          <p className="">Total:</p>
          <span>{formatCurrency(price)}</span>
        </div>
        <Button to="/order/new" type="primary">
          Proceed To Order
        </Button>
        {/* <Link to="/order/new">Order pizzas</Link> */}
        {/* <Button type="secondary" onClick={handleClearCart}>
          Clear cart
        </Button> */}
      </div>
    </div>
  );
}

export default Cart;
