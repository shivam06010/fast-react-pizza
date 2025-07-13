import { useSelector } from "react-redux";
import CreateUser from "../user/CreateUser";
import Button from "./Button";
import Header from "./Header";

function HomeBox({ data }) {
  return (
    <div className="mb-0 w-[300px] rounded-[16px] bg-[#222222] px-6 py-6 text-center">
      <span className="mb-3 block text-[26px]">{data.emoji}</span>
      <h2 className="mb-1 font-semibold text-white">{data.heading}</h2>
      <p className="font-light text-white">{data.secondaryText}</p>
    </div>
  );
}

function Home() {
  const username = useSelector((store) => store.user.username);
  return (
    // <div className="my-10 px-4 text-center sm:my-16">
    //   <h1 className="mb-8 text-center text-xl font-semibold md:text-3xl">
    //     The best pizza.
    //     <br />
    //     <span className="text-lime-500">
    //       Straight out of the oven, straight to you.
    //     </span>
    //   </h1>

    //   {!username ? (
    //     <CreateUser />
    //   ) : (
    //     <Button type="primary" to="/menu">
    //       Continue Ordering, {username}
    //     </Button>
    //   )}
    // </div>
    <div>
      <div className="h-screen bg-[url('/public/bg.png')]">
        <header className="mx-auto max-w-[1150px]">
          <div className="mb-0 flex items-center justify-between gap-12 pt-10">
            <div className="w-[55%]">
              <section className="mb-6">
                <span className="text-[60px] leading-18 font-semibold text-white">
                  Your Favorite Pizza,
                </span>
                <br />
                <span className="text-[60px] leading-18 font-semibold text-[#d61313]">
                  {" "}
                  Just a Click Away!
                </span>
              </section>

              <p className="text-xl leading-10 text-white">
                Freshly baked pizzas delivered to your door in record time.
                Experience the perfect blend of taste and convenience.
              </p>
            </div>

            <div
              className={`my-[50px] ${!username ? "h-[420px]" : "h-[300px]"} grow rounded-2xl bg-white shadow-2xl`}
            >
              <header className="mb-[36px]">
                <p className="mt-[40px] mb-[30px] text-center text-5xl">🍕</p>
                <p className="mb-4 text-center text-2xl font-semibold">
                  Start Your Order
                </p>
                <p className="text-center text-sm">
                  Enter your name to begin your delicious journey
                </p>
              </header>

              <div className="px-[32px]">
                {!username ? (
                  <CreateUser />
                ) : (
                  <Button type="primary" to="/menu">
                    Continue Ordering, {username}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="mx-[90px] flex justify-between gap-0">
            <HomeBox
              data={{
                emoji: "⚡️",
                heading: "30 Min Delivery",
                secondaryText: "Hot pizzas delivered fast",
              }}
            />

            <HomeBox
              data={{
                emoji: "🧑🏻‍🍳",
                heading: "Fresh Ingredients",
                secondaryText: "Made with finest ingredients",
              }}
            />
            <HomeBox
              data={{
                emoji: "💯",
                heading: "100% Satisfaction",
                secondaryText: "Love it or we'll make it right",
              }}
            />
          </div>
        </header>
      </div>
    </div>
  );
}

export default Home;
