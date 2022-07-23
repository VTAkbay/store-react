import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="m-auto w-9/12 bg-white rounded-md h-16 text-center">
      <h1 className="float-left mt-4 ml-6 font-bold text-2xl">
        <Link to={"/"}>UPayments Store</Link>
      </h1>
      <button className="float-right mt-4 mr-6" type="button">
        Register
      </button>
    </div>
  );
}
