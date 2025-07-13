import Button from "../ui/Button";
import { useDispatch } from "react-redux";
// import store from "../../store";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CreateUser() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateName(username));

    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-stone-70 mb-2.5 text-sm font-normal">Your Name</p>

      <input
        type="text"
        placeholder="Enter your name..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-10 w-[100%]"
      />

      <div className="">
        <Button type="primary" disabled={!username}>
          Start ordering
        </Button>
      </div>
    </form>
  );
}

export default CreateUser;
