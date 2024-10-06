"use client";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { LuMenu } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";

import { useState } from "react";
import Searchbar from "./Searchbar";
import AddBtn from "./AddBtn";
import Avatar from "./Avatar";
import SignButtons from "./SignButtons";
import Spinner from "./Spinner";
import { AddObjectId, IUser } from "@/types/models";
import { signOut } from "next-auth/react";

interface Props {
  isAuth: boolean;
  isLoading: boolean;
  user: AddObjectId<IUser> | null;
}

const SmallNavbar = ({ isAuth, isLoading, user }: Props) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);


  const handleLinkClick = () => {
    setIsMenuVisible(false);
  };

  return (
    <>
      <nav className="flex items-center text-3xl justify-between text-neutral-800">
        <button onClick={() => setIsMenuVisible((prev) => !prev)}>
          <LuMenu />
        </button>
        <Link href="/" className="transition hover:text-neutral-600">
          <FaGithub />
        </Link>
        {isLoading && <Spinner />}
        {!isAuth && !isLoading && <SignButtons />}
        {isAuth && <AddBtn positionTip="right" />}
      </nav>

      <div
        className={`max-h-0 overflow-hidden flex opacity-0 flex-col gap-4 transition-all duration-300 ${
          isMenuVisible && "max-h-96 opacity-100"
        }`}
      >
        <div className="my-4">
          <Searchbar positionTip="right" />
        </div>

        <ul className="flex flex-col font-medium text-sm text-neutral-600">
          <li className="py-2 border border-neutral-300 border-l-0 border-r-0">
            <Link
              href="/discover"
              className="hover:text-primary-500"
              onClick={handleLinkClick}
            >
              All gists
            </Link>
          </li>
          <li className="py-2 border border-neutral-300 border-l-0 border-r-0 border-t-0">
            <Link href="https://github.com" className="hover:text-primary-500">
              Back to GitHub
            </Link>
          </li>
          {isAuth && user && (
            <>
              <li className="py-2 border border-neutral-300 border-l-0 border-r-0 border-t-0">
                <Link
                  href={`/${user.username}`}
                  className="hover:text-primary-500 flex items-center gap-1"
                  onClick={handleLinkClick}
                >
                  <span className="block h-6 w-6">
                    <Avatar
                      width={24}
                      height={24}
                      src={user.image}
                      alt="Profile Image"
                    />
                  </span>
                  <span>{user.username}</span>
                </Link>
              </li>
              <li className="py-2 border border-neutral-300 border-l-0 border-r-0 border-t-0">
                <button
                  className="hover:text-primary-500 flex gap-1 items-center"
                  onClick={() => signOut()}
                >
                  <LuLogOut />
                  <span>Sign out</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};
export default SmallNavbar;
