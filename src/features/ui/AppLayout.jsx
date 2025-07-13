import Header from "./Header";
import CartOverview from "../cart/CartOverview";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isCart = location.pathname === "/cart";
  const isCreateNewOrderPage = location.pathname === "/order/new";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />
      <div
        // className={`${isHomePage ? "bg-linear-to-t from-white to-[#fceded]" : ""} overflow-scroll`}
        className="mt-0 overflow-scroll"
      >
        <main className={`${isHomePage ? "" : "mx-auto max-w-[1300px]"} `}>
          <Outlet />
        </main>
      </div>
      {!isCart && !isHomePage && !isCreateNewOrderPage && <CartOverview />}
    </div>
  );
}

export default AppLayout;
