import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../ui/Button";

import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../utilities/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const formErrors = useActionData();
  const user = useSelector((store) => store.user);
  const { status, address, error: errorAddress, position } = user;
  const isLoadingAddress = status === "loading";
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = totalCartPrice + priorityPrice;
  console.log(cart);

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-center text-[28px] font-semibold text-stone-800">
        Checkout
      </h2>

      <div className="mx-auto grid max-w-[900px] grid-cols-2 items-start gap-10">
        <Form
          method="POST"
          className="rounded-[12px] border-1 border-stone-200 bg-white px-7 py-5"
        >
          <h2 className="mb-7 text-[22px] font-semibold text-stone-800">
            Delivery Details
          </h2>
          <div className="space-y-3">
            <div className="flex flex-col">
              <label className="text-[14px] font-medium">Full Name</label>
              <input
                className="input grow"
                type="text"
                defaultValue={user.username}
                name="customer"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className={`text-[14px] font-medium`}>Phone number</label>
              <input className="input grow" type="tel" name="phone" required />
              {formErrors?.phone && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {formErrors.phone}
                </p>
              )}
            </div>

            <div className="relative flex flex-col">
              <label className="text-[14px] font-medium">Address</label>
              <div className="grow">
                <input
                  className="input w-full"
                  type="text"
                  disabled={isLoadingAddress}
                  defaultValue={address}
                  name="address"
                  required
                />

                {status === "error" && (
                  <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                    {errorAddress}
                  </p>
                )}
              </div>
              {!position.longitude && !position.latitude && (
                <span className="absolute right-[3px] bottom-[3px] z-50 sm:top-[24px] sm:right-[3px]">
                  <Button
                    disabled={isLoadingAddress}
                    type="small"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(fetchAddress());
                    }}
                  >
                    Get Position
                  </Button>
                </span>
              )}
            </div>

            <div className="mt-5 mb-7 flex items-center gap-2">
              <input
                className="h-5 w-5 text-white accent-stone-900 focus:ring-offset-2 focus:outline-none"
                type="checkbox"
                name="priority"
                id="priority"
                value={withPriority}
                onChange={(e) => setWithPriority(e.target.checked)}
              />
              <label htmlFor="priority " className="text-[14px] font-medium">
                Want to give your order priority?
              </label>
            </div>
          </div>

          <div>
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <input
              type="hidden"
              name="position"
              value={
                position.longitude && position.latitude
                  ? `${position.latitude} , ${position.longitude}`
                  : ""
              }
            />
            {/* <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
              {isSubmitting ? "Placing Order..." : `Place My Order`}
            </Button> */}
            <button
              disabled={isSubmitting || isLoadingAddress}
              className="w-full rounded-[12px] bg-[#d61313] py-2 text-[14px] font-medium text-white transition-all hover:scale-102"
            >
              {isSubmitting ? "Placing Order..." : `Place My Order`}
            </button>
          </div>
        </Form>
        <section className="rounded-[12px] border-1 border-stone-200 bg-white px-7 py-5">
          <h2 className="text-[22px] font-semibold text-stone-800">
            Order Summary
          </h2>

          <ul>
            {cart.map((item) => {
              return (
                <li
                  key={item.name}
                  className="mt-6 flex items-center justify-between border-b-1 border-stone-200 pb-3"
                >
                  <div>
                    <h3 className="text-[16px] font-medium text-stone-800">
                      {item.name}
                    </h3>
                    <span className="text-[14px] text-stone-600">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <span>{formatCurrency(item.totalPrice)}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex justify-between">
            <p className="text-[18px] font-semibold">Total:</p>
            <span className="text-[18px] font-semibold">
              {formatCurrency(totalPrice)}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  console.log(order);

  const errors = { phone: "" };
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct Phone Number, We might need it to contact you.";

  if (errors.phone !== "") return errors;

  const newOrder = await createOrder(order);
  console.log(newOrder);
  store.dispatch(clearCart());

  // return redirect(`/menu`);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
