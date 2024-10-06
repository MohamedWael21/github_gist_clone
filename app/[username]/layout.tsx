import Link from "next/link";
import { LuSquareCode } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { Tab, Tabs } from "@/components/Tabs";

import ProfileHeader from "@/components/ProfileHeader";

export default async function ProfileLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { username: string };
}>) {
  return (
    <section className="container-xl px-4 md:px-6 lg:px-8 mt-6">
      <div className="lg:grid lg:grid-cols-12 flex flex-col gap-10 lg:gap-4">
        <div className="lg:col-span-3">
          <ProfileHeader />
        </div>
        <div className="lg:col-span-9">
          <div>
            <Tabs defaultTab="gists">
              <Tab value="gists">
                <Link
                  href={`/${params.username}`}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <LuSquareCode />
                  <span>All gists</span>
                  <span className="px-1.5 py-0.5 rounded-3xl text-xs  bg-primary-200 text-neutral-800 text-center">
                    11
                  </span>
                </Link>
              </Tab>

              <Tab value="starred">
                <Link
                  href={`/${params.username}/starred`}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <FaRegStar />
                  <span className="">Starred</span>
                  <span className="px-1.5 py-0.5 flex items-center justify-center rounded-3xl text-xs   bg-primary-200 text-neutral-800 ">
                    5
                  </span>
                </Link>
              </Tab>
            </Tabs>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
