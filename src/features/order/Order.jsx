// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant.js";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../utilities/helpers.js";

// import UpdateOrder from "./UpdateOrder";
// import UpdateOrder from "./updateOrder.jsx";
import Orderitem from "./OrderItem";
import { useEffect } from "react";

import UpdateItem from "./UpdateItem.jsx";

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  // const fetcher = useFetcher();

  // useEffect(
  //   function () {
  //     if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  //   },
  //   [fetcher],
  // );

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );
  // console.log(fetcher.data);
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 tracking-wide text-red-50 uppercase">
              Priority
            </span>
          )}
          <span className="rounded-full bg-lime-500 px-3 py-1 tracking-wide text-green-50 uppercase">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-t border-b border-stone-200">
        {cart.map((item) => (
          <Orderitem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((pizza) => (pizza.id = item.pizzaId))
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-x-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateItem order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
