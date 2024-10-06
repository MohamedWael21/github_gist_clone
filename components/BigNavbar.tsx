import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { signOut } from "next-auth/react";

import { MdKeyboardArrowDown } from "react-icons/md";

import Searchbar from "./Searchbar";
import AddBtn from "./AddBtn";
import Avatar from "./Avatar";
import SignButtons from "./SignButtons";
import Spinner from "./Spinner";
import { AddObjectId, IUser } from "@/types/models";

const GithubSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      height="24"
      viewBox="0 0 68 24"
      version="1.1"
      width="68"
      data-view-component="true"
      className="group-hover:fill-primary-500"
    >
      <path d="M27.8 17.908h-.03c.013 0 .022.014.035.017l.01-.002-.016-.015Zm.005.017c-.14.001-.49.073-.861.073-1.17 0-1.575-.536-1.575-1.234v-4.652h2.385c.135 0 .24-.12.24-.283V9.302c0-.133-.12-.252-.24-.252H25.37V5.913c0-.119-.075-.193-.21-.193h-3.24c-.136 0-.21.074-.21.193V9.14s-1.636.401-1.741.416a.255.255 0 0 0-.195.253v2.021c0 .164.12.282.255.282h1.665v4.876c0 3.627 2.55 3.998 4.29 3.998.796 0 1.756-.252 1.906-.327.09-.03.135-.134.135-.238v-2.23a.264.264 0 0 0-.219-.265Zm35.549-3.272c0-2.69-1.095-3.047-2.25-2.928-.9.06-1.62.505-1.62.505v5.232s.735.506 1.83.536c1.545.044 2.04-.506 2.04-3.345ZM67 14.415c0 5.099-1.665 6.555-4.576 6.555-2.46 0-3.78-1.233-3.78-1.233s-.06.683-.135.773c-.045.089-.12.118-.21.118h-2.22c-.15 0-.286-.119-.286-.252l.03-16.514a.26.26 0 0 1 .255-.252h3.196a.26.26 0 0 1 .255.252v5.604s1.23-.788 3.03-.788l-.015-.03c1.8 0 4.456.67 4.456 5.767ZM53.918 9.05h-3.15c-.165 0-.255.119-.255.282v8.086s-.826.58-1.95.58c-1.126 0-1.456-.506-1.456-1.62v-7.06a.262.262 0 0 0-.255-.254h-3.21a.262.262 0 0 0-.256.253v7.596c0 3.27 1.846 4.087 4.381 4.087 2.085 0 3.78-1.145 3.78-1.145s.076.58.12.67c.03.074.136.133.24.133h2.011a.243.243 0 0 0 .255-.253l.03-11.103c0-.133-.12-.252-.285-.252Zm-35.556-.015h-3.195c-.135 0-.255.134-.255.297v10.91c0 .297.195.401.45.401h2.88c.3 0 .375-.134.375-.401V9.287a.262.262 0 0 0-.255-.252ZM16.787 4.01c-1.155 0-2.07.907-2.07 2.051 0 1.145.915 2.051 2.07 2.051a2.04 2.04 0 0 0 2.04-2.05 2.04 2.04 0 0 0-2.04-2.052Zm24.74-.372H38.36a.262.262 0 0 0-.255.253v6.08H33.14v-6.08a.262.262 0 0 0-.255-.253h-3.196a.262.262 0 0 0-.255.253v16.514c0 .133.135.252.255.252h3.196a.262.262 0 0 0 .255-.253v-7.06h4.966l-.03 7.06c0 .134.12.253.255.253h3.195a.262.262 0 0 0 .255-.253V3.892a.262.262 0 0 0-.255-.253Zm-28.31 7.313v8.532c0 .06-.015.163-.09.193 0 0-1.875 1.323-4.966 1.323C4.426 21 0 19.84 0 12.2S3.87 2.986 7.651 3c3.27 0 4.59.728 4.8.862.06.075.09.134.09.208l-.63 2.646c0 .134-.134.297-.3.253-.54-.164-1.35-.49-3.255-.49-2.205 0-4.575.623-4.575 5.543s2.25 5.5 3.87 5.5c1.38 0 1.875-.164 1.875-.164V13.94H7.321c-.165 0-.285-.12-.285-.253v-2.735c0-.134.12-.252.285-.252h5.61c.166 0 .286.118.286.252Z"></path>
    </svg>
  );
};

const GistSvg = () => {
  return (
    <svg
      aria-hidden="true"
      height="24"
      viewBox="0 0 38 24"
      version="1.1"
      width="38"
      data-view-component="true"
      className="group-hover:fill-primary-500"
    >
      <path d="M7.05 13.095v-1.5h5.28v8.535c-1.17.555-2.925.96-5.385.96C1.665 21.09 0 17.055 0 12.045S1.695 3 6.945 3c2.43 0 3.96.495 4.92.99v1.575c-1.83-.75-3-1.095-4.92-1.095-3.855 0-5.22 3.315-5.22 7.59s1.365 7.575 5.205 7.575c1.335 0 2.97-.105 3.795-.51v-6.03H7.05Zm16.47 1.035h.045c3.33.3 4.125 1.425 4.125 3.345 0 1.815-1.14 3.615-4.71 3.615-1.125 0-2.745-.285-3.495-.585v-1.41c.705.255 1.83.54 3.495.54 2.43 0 3.09-1.035 3.09-2.13 0-1.065-.33-1.815-2.655-2.01-3.39-.3-4.095-1.5-4.095-3.12 0-1.665 1.08-3.465 4.38-3.465 1.095 0 2.34.135 3.375.585v1.41c-.915-.3-1.83-.54-3.405-.54-2.325 0-2.82.855-2.82 2.01 0 1.035.42 1.56 2.67 1.755Zm12.87-4.995v1.275h-3.63v7.305c0 1.425.795 2.01 2.25 2.01.3 0 .63 0 .915-.045v1.335c-.255.045-.75.075-1.035.075-1.965 0-3.75-.9-3.75-3.195v-7.5H28.8v-.72l2.34-.66V5.85l1.62-.465v3.75h3.63ZM16.635 9.09v9.615c0 .81.285 1.05 1.005 1.05v1.335c-1.71 0-2.58-.705-2.58-2.58V9.09h1.575Zm.375-3.495c0 .66-.51 1.17-1.17 1.17a1.14 1.14 0 0 1-1.155-1.17c0-.66.48-1.17 1.155-1.17s1.17.51 1.17 1.17Z"></path>
    </svg>
  );
};

interface Props {
  isAuth: boolean;
  isLoading: boolean;
  user: AddObjectId<IUser> | null;
}

const BigNavbar = ({ isAuth, isLoading, user }: Props) => {
  return (
    <nav className="flex justify-between gap-4 items-center">
      <div className="flex gap-4 items-center">
        <Link className="flex items-center gap-1 group" href="/">
          <GithubSvg />
          <GistSvg />
        </Link>
        <Searchbar />
        <ul className="flex gap-4  font-medium text-xs lg:text-sm text-neutral-600">
          <li>
            <Link
              href="/discover"
              className="hover:text-primary-500 tracking-tighter"
            >
              All gists
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com"
              className="hover:text-primary-500 tracking-tighter"
            >
              Back to Github
            </Link>
          </li>
        </ul>
      </div>
      {isLoading && <Spinner />}
      {!isAuth && !isLoading && <SignButtons />}

      {isAuth && user && (
        <div className="flex text-2xl gap-2 items-center">
          <AddBtn />
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger className="flex gap-2  items-center hover:bg-neutral-100 cursor-pointer">
                <span className="block h-8 w-8">
                  <Avatar
                    width={32}
                    height={32}
                    src={user.image}
                    alt="Profile Image"
                  />
                </span>
                <MdKeyboardArrowDown className="" />
              </MenubarTrigger>
              <MenubarContent className="-translate-x-8 hover:border-none hover:ring-0">
                <MenubarItem className="hover:ring-0 hover:border-none">
                  <Link
                    href={`/${user.username}`}
                    className="text-neutral-950 font-normal"
                  >
                    Singed in as{" "}
                    <span className="font-bold">{user.username}</span>
                  </Link>
                </MenubarItem>
                <MenubarSeparator className="bg-neutral-200" />
                <MenubarItem className="hover:ring-0 hover:border-none">
                  <Link
                    href={`/${user.username}`}
                    className="text-neutral-950 font-normal"
                  >
                    Your gists
                  </Link>
                </MenubarItem>
                <MenubarItem className="hover:ring-0 hover:border-none">
                  <Link
                    href={`/${user.username}/starred`}
                    className="text-neutral-950 font-normal"
                  >
                    Starred gists
                  </Link>
                </MenubarItem>
                <MenubarItem className="hover:ring-0 hover:border-none">
                  <Link
                    href="https://docs.github.com"
                    className="text-neutral-950 font-normal"
                  >
                    Help
                  </Link>
                </MenubarItem>
                <MenubarSeparator className="bg-neutral-200" />

                <MenubarItem className="hover:ring-0 hover:border-none">
                  <Link
                    href={`https://github.com/${user.username}`}
                    className="text-neutral-950 font-normal"
                  >
                    Your Github profile
                  </Link>
                </MenubarItem>
                <MenubarSeparator className="bg-neutral-200" />

                <MenubarItem className="hover:ring-0 hover:border-none">
                  <button
                    className="text-neutral-950 font-normal"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      )}
    </nav>
  );
};
export default BigNavbar;
