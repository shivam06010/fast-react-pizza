import { Link } from "react-router-dom";

function Button({ children, to, type, disabled, onClick }) {
  const base =
    " block px-4 text-xs sm:text-sm rounded-[8px] bg-[#d61313]  font-semibold tracking-wide text-white uppercase transition-all hover:scale-102 focus:bg-lime-300 focus:ring focus:ring-lime-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed";
  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4 text-center",
    small: base + " py-2 md:px-2 md:py-1.5 ",
    secondary:
      "inline-block text-sm rounded-full px-4 py-2.5 md:px-6 md:py-3.5 border-2 border-stone-300 font-semibold tracking-wide text-stone-400 uppercase transition-all hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:bg-stone-200 focus:ring focus:ring-stone-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed",
    round: base + "py-1 px-2.5 md:px-2.5 md:py-1 text-sm",
    update: "border-1 border-stone-200 px-2.5 py-1 rounded-[6px] font-semibold",
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button className={styles[type]} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
