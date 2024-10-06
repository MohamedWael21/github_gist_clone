"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import SmallNavbar from "./SmallNavbar";
import BigNavbar from "./BigNavbar";
import useUser from "@/hooks/useUser";
const Navbar = () => {
  const { isAuth, isLoading, user } = useUser();
  const screenType = useMediaQuery();
  return (
    <header className="p-4 shadow-md">
      {screenType === "MOBILE" ? (
        <SmallNavbar isAuth={isAuth} isLoading={isLoading} user={user} />
      ) : (
        <BigNavbar isAuth={isAuth} isLoading={isLoading} user={user} />
      )}
    </header>
  );
};
export default Navbar;
