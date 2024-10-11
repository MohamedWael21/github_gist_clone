"use client";
import Link from "next/link";
import { LuSquareCode } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { Tab, Tabs } from "@/components/Tabs";
import { usePathname } from "next/navigation";

interface Props {
  username: string;
  starredCount: number;
  gistsCount: number;
}

const ProfileTabs = ({ username, starredCount, gistsCount }: Props) => {
  const pathname = usePathname();

  return (
    <Tabs
      defaultTab={pathname.split("/").pop() != "starred" ? "gists" : "starred"}
    >
      <Link href={`/${username}`}>
        <Tab value="gists">
          <div className="flex gap-2 items-center cursor-pointer">
            <LuSquareCode />
            <span>All gists</span>
            <span className="px-1.5 py-0.5 rounded-3xl text-xs  bg-primary-200 text-neutral-800 text-center">
              {gistsCount}
            </span>
          </div>
        </Tab>
      </Link>

      <Link href={`/${username}/starred`}>
        <Tab value="starred">
          <div className="flex gap-2 items-center cursor-pointer">
            <FaRegStar />
            <span className="">Starred</span>
            <span className="px-1.5 py-0.5 flex items-center justify-center rounded-3xl text-xs   bg-primary-200 text-neutral-800 ">
              {starredCount}
            </span>
          </div>
        </Tab>
      </Link>
    </Tabs>
  );
};
export default ProfileTabs;
