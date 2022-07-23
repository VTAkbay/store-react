import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="m-auto w-9/12 bg-white rounded-md h-16 flex items-center">
      <h1 className="m-auto ml-10 font-bold text-2xl relative">
        <Link to={"/"}>UPayments Store</Link>
      </h1>
      <button
        className="hover:bg-gray-200 rounded m-auto mr-4 p-1"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      </button>
      <button className="hover:bg-gray-200 p-1 mr-10 rounded" type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
      </button>
    </div>
  );
}
