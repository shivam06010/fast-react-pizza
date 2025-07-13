import { useDispatch } from "react-redux";

import { deleteItem } from "./cartSlice";
import { MdDelete, MdDeleteOutline } from "react-icons/md";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  function handleDeleteItem() {
    dispatch(deleteItem(pizzaId));
  }
  return (
    <button onClick={handleDeleteItem}>
      <MdDeleteOutline size={24} className="cursor-pointer text-red-600" />
    </button>
  );
}

export default DeleteItem;
