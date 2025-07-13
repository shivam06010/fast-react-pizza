import { useDispatch } from "react-redux";
import Button from "../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-3 md:gap-3">
      <Button
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        type="update"
      >
        -
      </Button>
      <span>{quantity}</span>
      <Button
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        type="update"
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
