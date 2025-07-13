import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <div className="">
      <h2 className="mt-10 text-center text-[32px] font-semibold text-stone-900">
        Hi, Shivam! 🍕{" "}
      </h2>
      <p className="mt-2 text-center text-lg">
        Choose your favorite pizzas from our delicious menu
      </p>
      <ul className="mt-10 grid grid-cols-4 gap-5">
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
