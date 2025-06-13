import LinkButton from "../ui/LinkButton";
import Button from "../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";

function Cart() {
  const username = useSelector((store) => store.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  function handleClearCart() {
    dispatch(clearCart());
  }

  const hello = 12;

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-3 py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">
        Your Cart, {username.toUpperCase()}
      </h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b border-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order Pizzas
        </Button>
        {/* <Link to="/order/new">Order pizzas</Link> */}
        <Button type="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
