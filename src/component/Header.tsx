import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import NotificationsButton from "./NotificationsButton";

export default function Header() {
  return (
    <div className="m-auto w-9/12 bg-white rounded-md h-16 flex items-center">
      <h1 className="m-auto ml-10 font-bold text-2xl relative">
        <Link to={"/"}>UPayments Store</Link>
      </h1>
      <NotificationsButton></NotificationsButton>
      <LoginButton></LoginButton>
    </div>
  );
}
