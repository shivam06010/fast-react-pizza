import { useFetcher } from "react-router-dom";
import Button from "../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateItem({ order }) {
  const fetcher = useFetcher();
  console.log(order);

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateItem;

export async function action({ request, params }) {
  const data = { priority: true };
  // console.log("Shivam");
  await updateOrder(params.orderId, data);
  return null;
}
